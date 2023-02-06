package com.cg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.bean.Asset;
import com.cg.bean.AssetIdAndNames;
import com.cg.dao.AssetUpdateServiceProxy;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@CrossOrigin
@Api(value = "AssetUpdateService demo using logger and swagger")
public class AssetUpdateController {

	@Autowired
	AssetUpdateServiceProxy proxy;

	@GetMapping("")
	public String getName() {
		return " In asset service";
	}

	@PostMapping("addAsset/{quantity}")
	@ApiOperation(value = "Add Asset")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Asset.class),
			@ApiResponse(code = 500, message = "Failure", response = Asset.class) })
	public List<Asset> addAsset(@RequestBody Asset asset, @PathVariable int quantity) {
		return proxy.addAsset(asset, quantity);
	}

	@PutMapping("/updateAsset")
	@ApiOperation(value = "Update Asset")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Asset.class),
			@ApiResponse(code = 500, message = "Failure", response = Asset.class) })
	public Asset updateAsset(@RequestBody Asset asset) {
		return proxy.updateAsset(asset);
	}

	@DeleteMapping("/deleteAsset")
	@ApiOperation(value = "Delete Asset")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Asset.class),
			@ApiResponse(code = 500, message = "Failure", response = Asset.class) })
	public void deleteAsset(@RequestParam int assetId) {
		proxy.deleteAsset(assetId);
	}

	@GetMapping("/getAssetIdsAndNames")
	@ApiOperation(value = "Get asset Ids and Names")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = AssetIdAndNames.class),
			@ApiResponse(code = 500, message = "Failure", response = AssetIdAndNames.class) })
	public AssetIdAndNames getAssetIdAndNames() {
		return proxy.getAssetIdAndNames();
	}

	@GetMapping("getAssetsByName/{assetName}")
	@ApiOperation(value = "Get get asset by name")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Asset.class),
			@ApiResponse(code = 500, message = "Failure", response = Asset.class) })
	public Object getAssetsByName(@PathVariable String assetName) {
		return proxy.getAssetsByName(assetName);
	}
}
