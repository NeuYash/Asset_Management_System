package com.cg.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.cg.bean.Employee;

@FeignClient(name = "employee-service", url = "https://asset-mgmt-employee-service.herokuapp.com/")
public interface EmployeeProxy {

	@GetMapping("findById")
	public Employee findById(@RequestParam int employeeId);
}
