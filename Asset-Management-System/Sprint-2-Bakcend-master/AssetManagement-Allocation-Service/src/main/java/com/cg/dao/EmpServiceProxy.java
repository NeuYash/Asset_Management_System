package com.cg.dao;

import java.util.List;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.cg.bean.Employee;

@FeignClient(name = "employee-service")
@RibbonClient(name = "employee-service")
public interface EmpServiceProxy {

	@GetMapping("findById")
	public Employee findById(@RequestParam int employeeId);

	@GetMapping("findByName")
	public List<Employee> findByName(@RequestParam String employeeName);
}
