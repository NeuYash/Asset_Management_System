package com.cg.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.cg.bean.Allocation;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation, Integer> {

	public Allocation findByAllocationId(int id);
	public List<Allocation> findByAssetId(int assetId);
	public List<Allocation> findByEmpId(int empId);
	public List<Allocation> findByStatus(String status);
}
