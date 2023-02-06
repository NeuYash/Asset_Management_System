package com.cg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.bean.Employee;
import com.cg.bean.EmployeeIdsAndNames;
import com.cg.dao.EmployeeViewServiceProxy;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@CrossOrigin
@Api(value = "EmployeeViewService demo using logger and swagger")
public class EmployeeViewController {

	@Autowired
	EmployeeViewServiceProxy proxy;

	@GetMapping("")
	public String welcome() {
		return "Employee view service";
	}

	@GetMapping("/getEmployees")
	@ApiOperation(value = "View Employees")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Employee.class),
			@ApiResponse(code = 500, message = "Failure", response = Employee.class) })
	public List<Employee> getEmployees() {
		return proxy.getEmployees();
	}

	@GetMapping("/findById")
	@ApiOperation(value = "findById", nickname = "Search Employee by Id")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Employee.class),
			@ApiResponse(code = 500, message = "Failure", response = Employee.class) })
	public Employee findById(@RequestParam int employeeId) {
		return proxy.findById(employeeId);
	}

	@GetMapping("/findByName")
	@ApiOperation(value = "Find by name")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Employee.class),
			@ApiResponse(code = 500, message = "Failure", response = Employee.class) })
	public List<Employee> findByName(@RequestParam String employeeName) {
		return proxy.findByName(employeeName);
	}

	@GetMapping("countEmployees")
	@ApiOperation(value = "Count employees")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Long.class),
			@ApiResponse(code = 500, message = "Failure", response = Long.class) })
	public Long countEmployess() {
		return proxy.countEmployess();
	}

	@GetMapping("getEmployeeIds")
	@ApiOperation(value = "Get employee ids and names")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Long.class),
			@ApiResponse(code = 500, message = "Failure", response = Long.class) })
	public EmployeeIdsAndNames getEmployeeIds() {
		return proxy.getEmployeeIds();
	}
}
