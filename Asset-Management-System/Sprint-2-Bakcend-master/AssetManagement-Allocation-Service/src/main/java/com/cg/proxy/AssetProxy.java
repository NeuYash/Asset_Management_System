package com.cg.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.cg.bean.Asset;

@FeignClient(name = "asset-service", url = "https://asset-mgmt-asset-service.herokuapp.com/")
@Component
public interface AssetProxy {

	@GetMapping("findAssetById")
	public Asset findAssetById(@RequestParam int assetId);

	@GetMapping("isAssetUnallocated/{assetId}")
	public boolean isAssetUnallocated(@PathVariable int assetId);
	
	@PutMapping("updateAsset")
	public Asset updateAsset(@RequestBody Asset asset);

}
