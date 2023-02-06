package com.cg.dao;

import java.util.List;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.cg.bean.Asset;

@FeignClient(name = "asset-service", url = "https://asset-mgmt-asset-service.herokuapp.com/")
@RibbonClient(name = "asset-service")
public interface AssetServiceProxy {

	@GetMapping("getAssets")
	public List<Asset> getAssets();
	
	@PostMapping("addAsset")
	public Asset addAsset(@RequestBody Asset asset);
	
	@PutMapping("updateAsset")
	public Asset updateAsset(@RequestBody Asset asset);
	
	@GetMapping("getAssetById")
	public Asset assetById(@RequestParam int assetId);

}
