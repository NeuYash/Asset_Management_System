package com.cg.dao;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.cg.bean.Employee;

@FeignClient(name="employee-service", url = "https://asset-mgmt-employee-service.herokuapp.com")
@RibbonClient(name="employee-service")
public interface EmployeeUpdateServiceProxy {

	@PostMapping("/addEmployee")
	public Employee addEmployee(@RequestBody Employee employee);
	
	@PutMapping("/updateEmployee")
	public Employee updateEmployee(@RequestBody Employee employee);
	
	@DeleteMapping("/deleteEmployee")
	public void deleteEmployee(@RequestParam int employeeId);
	
}
