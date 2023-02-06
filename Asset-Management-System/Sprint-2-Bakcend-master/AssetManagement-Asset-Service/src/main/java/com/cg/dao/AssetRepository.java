package com.cg.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cg.bean.Asset;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer>{
	
	//Find by assetid
	public Asset findByAssetId(int assetId);
	
	//Find By name
	public Object findByAssetName(String assetName);
	
	//Find assetIds
	@Query("SELECT assetId FROM #{#entityName}")
	public List<Integer> getAssetIds();
	
	//Find assetnames
	@Query("SELECT assetName FROM #{#entityName}")
	public List<String> getAssetNames();
}
