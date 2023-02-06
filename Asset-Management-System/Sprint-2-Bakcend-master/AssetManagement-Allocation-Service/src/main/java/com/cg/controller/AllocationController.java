package com.cg.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cg.bean.Allocation;
import com.cg.bean.AllocationViewReponse;
import com.cg.bean.Asset;
import com.cg.bean.ErrorResponse;
import com.cg.proxy.AssetProxy;
import com.cg.proxy.EmployeeProxy;
import com.cg.service.AllocationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin
@RestController
@EnableFeignClients(basePackages = "com.cg.proxy")
@Api(value = "Allocation service demo using logger and swagger")
public class AllocationController {

	@Autowired
	private AllocationService allocationService;

	@Autowired
	private AssetProxy assetProxy;

	@Autowired
	private EmployeeProxy employeeProxy;

	@Autowired
	private ErrorResponse errorResponse;

	@GetMapping("")
	@ApiOperation(value = "Welcome")
	public String welcome() {
		return "In allocation service.";
	}

	@GetMapping("viewAllocations")
	@ApiOperation(value = "Get list of allocations")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = List.class),
			@ApiResponse(code = 500, message = "Failure", response = List.class) })
	public List<AllocationViewReponse> getAllocations() {

		List<AllocationViewReponse> allocationViewReponses = new ArrayList<AllocationViewReponse>();

		for (Allocation allocation : allocationService.findAll()) {
			AllocationViewReponse viewReponse = new AllocationViewReponse();
			viewReponse.setAllocationId(allocation.getAllocationId());
			viewReponse.setAsset(assetProxy.findAssetById(allocation.getAssetId()));
			viewReponse.setEmployee(employeeProxy.findById(allocation.getEmpId()));
			viewReponse.setStatus(allocation.getStatus());
			viewReponse.setRemark(allocation.getRemark());
			allocationViewReponses.add(viewReponse);
		}

		return allocationViewReponses;
	}

	@PostMapping("raiseReq")
	@ApiOperation(value = "Raise request")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Object.class),
			@ApiResponse(code = 500, message = "Failure", response = Object.class) })
	public Object raiseRequest(@RequestBody Allocation allocation) {

		Asset asset = assetProxy.findAssetById(allocation.getAssetId());

		// Check employee exists or not
		if (employeeProxy.findById(allocation.getEmpId()) == null) {
			errorResponse.setMessage("employee_doesnt_exist");
			return errorResponse;
		}

		// check if asset exist
		if (asset != null) {

			// If asset is unallocated
			if (assetProxy.isAssetUnallocated(asset.getAssetId())) {
				allocation.setStatus("pending");

				return allocationService.save(allocation);
			}

			// If asset is allocated
			else {
				errorResponse.setMessage("asset_already_allocated");
				return errorResponse;
			}
		}
		errorResponse.setMessage("asset_doesnt_exist");
		return errorResponse;
	}

	@GetMapping("changeStatus/{allocationId}/{status}")
	@ApiOperation(value = "Approve or deny")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Allocation.class),
			@ApiResponse(code = 500, message = "Failure", response = Allocation.class) })
	public Object changeStatus(@PathVariable int allocationId, @PathVariable String status) {

		// here change assetStatus of asset in this allocation to status in
		// @PathVariable status

		Allocation allocation = allocationService.findByAllocationId(allocationId);

		if (allocation == null)
			return null;

		// Change status of asset to allocated
		if (status.equals("approved")) {
			Asset asset = assetProxy.findAssetById(allocation.getAssetId());
			
			if (assetProxy.findAssetById(allocation.getAssetId()).getStatus().equals("allocated")) {
				errorResponse.setMessage("asset_already_allocated");
				return errorResponse;
			}
			
			asset.setStatus("allocated");
			assetProxy.updateAsset(asset);
		}
		if (status.equals("rejected")) {
			Asset asset = assetProxy.findAssetById(allocation.getAssetId());
			asset.setStatus("unallocated");
			assetProxy.updateAsset(asset);
		}
		allocation.setStatus(status);
		return allocationService.save(allocation);
	}

	@GetMapping("pendingrequests")
	@ApiOperation(value = "Get list of pending allocations")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = List.class),
			@ApiResponse(code = 500, message = "Failure", response = List.class) })
	public List<AllocationViewReponse> pendingAllocations() {

		List<AllocationViewReponse> viewReponses = new ArrayList<AllocationViewReponse>();
		for (Allocation allocation : allocationService.findByStatus("pending")) {
			AllocationViewReponse viewReponse = new AllocationViewReponse();
			viewReponse.setAllocationId(allocation.getAllocationId());
			viewReponse.setAsset(assetProxy.findAssetById(allocation.getAssetId()));
			viewReponse.setEmployee(employeeProxy.findById(allocation.getEmpId()));
			viewReponse.setStatus(allocation.getStatus());
			viewReponse.setRemark(allocation.getRemark());
			viewReponses.add(viewReponse);
		}
		return viewReponses;
	}

	@GetMapping("countRequests")
	@ApiOperation(value = "Count requests")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Long.class),
			@ApiResponse(code = 500, message = "Failure", response = Long.class) })
	public Long countRequests() {
		return allocationService.count();
	}

	@ApiOperation(value = "Count pending allocations")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Integer.class),
			@ApiResponse(code = 500, message = "Failure", response = Integer.class) })
	@GetMapping("countPending")
	public int countPending() {
		return pendingAllocations().size();
	}

	@GetMapping("findById/{allocationId}")
	@ApiOperation(value = "Find by allocation id")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Allocation.class),
			@ApiResponse(code = 500, message = "Failure", response = Allocation.class) })
	public AllocationViewReponse findById(@PathVariable int allocationId) {
		AllocationViewReponse allocationViewReponse = new AllocationViewReponse();
		allocationViewReponse.setAllocationId(allocationService.findByAllocationId(allocationId).getAllocationId());
		allocationViewReponse
				.setAsset(assetProxy.findAssetById(allocationService.findByAllocationId(allocationId).getAssetId()));
		allocationViewReponse
				.setEmployee(employeeProxy.findById(allocationService.findByAllocationId(allocationId).getEmpId()));
		allocationViewReponse.setRemark(allocationService.findByAllocationId(allocationId).getRemark());
		allocationViewReponse.setStatus(allocationService.findByAllocationId(allocationId).getStatus());
		return allocationViewReponse;
	}

	@GetMapping("/findByAsset/{assetId}")
	public List<AllocationViewReponse> findByAsset(@PathVariable int assetId) {

		List<AllocationViewReponse> allocationViewReponses = new ArrayList<AllocationViewReponse>();
		List<Allocation> allocations = allocationService.findByAssetId(assetId);

		if (allocations == null) {
			return null;
		}

		for (Allocation allocation : allocations) {
			AllocationViewReponse viewReponse = new AllocationViewReponse();
			viewReponse.setAllocationId(allocation.getAllocationId());
			viewReponse.setAsset(assetProxy.findAssetById(allocation.getAssetId()));
			viewReponse.setEmployee(employeeProxy.findById(allocation.getEmpId()));
			viewReponse.setStatus(allocation.getStatus());
			viewReponse.setRemark(allocation.getRemark());
			allocationViewReponses.add(viewReponse);
		}
		return allocationViewReponses;
	}

	@GetMapping("/findByEmployee/{employeeId}")
	public List<AllocationViewReponse> findByEmployee(@PathVariable int employeeId) {
		List<AllocationViewReponse> allocationViewReponses = new ArrayList<AllocationViewReponse>();
		List<Allocation> allocations = allocationService.findByEmpId(employeeId);

		if (allocations != null) {
			return null;
		}

		for (Allocation allocation : allocations) {
			AllocationViewReponse viewReponse = new AllocationViewReponse();
			viewReponse.setAllocationId(allocation.getAllocationId());
			viewReponse.setAsset(assetProxy.findAssetById(allocation.getAssetId()));
			viewReponse.setEmployee(employeeProxy.findById(allocation.getEmpId()));
			viewReponse.setStatus(allocation.getStatus());
			viewReponse.setRemark(allocation.getRemark());
			allocationViewReponses.add(viewReponse);
		}
		return allocationViewReponses;
	}

}
