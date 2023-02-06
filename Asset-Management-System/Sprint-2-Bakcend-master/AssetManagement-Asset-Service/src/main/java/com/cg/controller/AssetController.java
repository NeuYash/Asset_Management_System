package com.cg.controller;

import java.util.ArrayList;
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
import com.cg.service.AssetService;

@RestController
@CrossOrigin
public class AssetController {

	@Autowired
	AssetService assetService;

	@Autowired
	AssetIdAndNames idAndNames;

	// Welcome message.
	@GetMapping("")
	public String getName() {
		return " In asset service";
	}

	// Get all assets.
	@GetMapping("getAssets")
	public List<Asset> getAssets() {
		return assetService.findAll();
	}

	// Add new Asset.
	@PostMapping("addAsset/{quantity}")
	public List<Asset> addAsset(@RequestBody Asset asset, @PathVariable int quantity) {

		List<Asset> assets = new ArrayList<Asset>();

		for (int i = 0; i < quantity; i++) {
			Asset asset2 = new Asset();
			if (quantity > 1)
				asset2.setAssetName(asset.getAssetName() + " " + Integer.toString(i + 1));
			if (quantity == 1)
				asset2.setAssetName(asset.getAssetName());
			asset2.setRemark(asset.getRemark());
			asset2.setStatus(asset.getStatus());
			assets.add(asset2);
		}
		return assetService.saveAll(assets);
	}

	// Update asset.
	@PutMapping("updateAsset")
	public Asset updateAsset(@RequestBody Asset asset) {
		return assetService.save(asset);
	}

	// Delete asset.
	@DeleteMapping("deleteAsset")
	public void deleteAsset(@RequestParam int assetId) {
		assetService.deleteById(assetId);
	}

	// Count no. of assets.
	@GetMapping("countAssets")
	public Long countAssets() {
		return assetService.count();
	}

	// Get Asset by id.
	@GetMapping("findAssetById")
	public Asset findAssetById(@RequestParam int assetId) {
		return assetService.findByAssetId(assetId);
	}

	// Return list of all assetId & names
	@GetMapping("getAssetIdsAndNames")
	public AssetIdAndNames getAssetIdAndNames() {
		idAndNames.setAssetIds(assetService.getAssetIds());
		idAndNames.setAssetNames(assetService.getAssetNames());
		return idAndNames;
	}

	// Find assets by name.
	@GetMapping("getAssetsByName/{assetName}")
	public Object getAssetsByName(@PathVariable String assetName) {
		return assetService.findByAssetName(assetName);
	}

	// Check if asset is unallocated
	@GetMapping("isAssetUnallocated/{assetId}")
	public boolean isAssetUnallocated(@PathVariable int assetId) {
		Asset asset = assetService.findByAssetId(assetId);
		if (asset.getStatus().equals("unallocated")) {
			return true;
		}
		return false;
	}

}
