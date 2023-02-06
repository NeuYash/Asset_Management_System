package com.cg.bean;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class AssetIdAndNames {

	private List<Integer> assetIds;
	private List<String> assetNames;

	public List<Integer> getAssetIds() {
		return assetIds;
	}

	public void setAssetIds(List<Integer> assetIds) {
		this.assetIds = assetIds;
	}

	public List<String> getAssetNames() {
		return assetNames;
	}

	public void setAssetNames(List<String> assetNames) {
		this.assetNames = assetNames;
	}

}
