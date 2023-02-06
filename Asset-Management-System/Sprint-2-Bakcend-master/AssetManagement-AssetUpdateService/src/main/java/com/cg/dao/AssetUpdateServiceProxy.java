package com.cg.dao;

import java.util.List;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.cg.bean.Asset;
import com.cg.bean.AssetIdAndNames;

@FeignClient(name = "asset-service", url = "https://asset-mgmt-asset-service.herokuapp.com")
@RibbonClient(name = "asset-service")
public interface AssetUpdateServiceProxy {

	@PostMapping("/addAsset/{quantity}")
	public List<Asset> addAsset(@RequestBody Asset asset, @PathVariable int quantity);

	@PutMapping("/updateAsset")
	public Asset updateAsset(@RequestBody Asset asset);

	@DeleteMapping("/deleteAsset")
	public void deleteAsset(@RequestParam int assetId);

	@GetMapping("/changestatus")
	public Asset changeStatus(@RequestParam String status, @RequestParam int assetId);

	@GetMapping("/getAssetIdsAndNames")
	public AssetIdAndNames getAssetIdAndNames();

	@GetMapping("/getAssetsByName/{assetName}")
	public Object getAssetsByName(@PathVariable String assetName);
}
