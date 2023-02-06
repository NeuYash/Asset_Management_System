package com.cg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.bean.Asset;
import com.cg.dao.AssetViewServiceProxy;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@CrossOrigin
@Api(value = "AssetViewService demo using logger and swagger.")
public class AssetViewController {

	@Autowired
	AssetViewServiceProxy proxy;

	// Welcome
	@GetMapping("")
	@ApiOperation(value = "welcome")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = String.class),
			@ApiResponse(code = 500, message = "Failure", response = String.class) })
	public String welcome() {
		return "Welcome to asset view service";
	}

	// Get all assets
	@GetMapping("/getAssets")
	@ApiOperation(value = "View Assets")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Asset.class),
			@ApiResponse(code = 500, message = "Failure", response = Asset.class) })
	public List<Asset> getAssets() {
		return proxy.getAssets();
	}

	// Check if asset is unallocated
	@GetMapping("/isAssetUnallocated/{assetId}")
	@ApiOperation(value = "Is asset unallocated")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Boolean.class),
			@ApiResponse(code = 500, message = "Failure", response = Boolean.class) })
	public boolean isAssetUnallocated(@PathVariable int assetId) {
		return proxy.isAssetUnallocated(assetId);
	}

	// Count assets
	@GetMapping("/countAssets")
	@ApiOperation(value = "Count assets")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Long.class),
			@ApiResponse(code = 500, message = "Failure", response = Long.class) })
	public Long countAssets() {
		return proxy.countAssets();
	}

	// Find Asset by ID
	@GetMapping("/findAssetById")
	@ApiOperation(value = "Find asset by id")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Asset.class),
			@ApiResponse(code = 500, message = "Failure", response = Asset.class) })
	public Asset assetById(@RequestParam int assetId) {
		return proxy.assetById(assetId);
	}
}
