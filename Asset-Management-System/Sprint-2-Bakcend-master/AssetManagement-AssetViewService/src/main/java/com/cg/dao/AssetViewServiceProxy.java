package com.cg.dao;

import java.util.List;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.cg.bean.Asset;

@FeignClient(name = "asset-service", url = "https://asset-mgmt-asset-service.herokuapp.com")
@RibbonClient(name = "asset-service")
public interface AssetViewServiceProxy {

	@GetMapping("/getAssets")
	public List<Asset> getAssets();

	@GetMapping("/countAssets")
	public Long countAssets();

	@GetMapping("/findAssetById")
	public Asset assetById(@RequestParam int assetId);

	@GetMapping("/isAssetUnallocated/{assetId}")
	public boolean isAssetUnallocated(@PathVariable int assetId);
}
