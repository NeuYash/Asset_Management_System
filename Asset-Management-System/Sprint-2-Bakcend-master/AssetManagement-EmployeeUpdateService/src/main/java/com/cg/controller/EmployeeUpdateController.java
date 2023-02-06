package com.cg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.bean.Employee;
import com.cg.dao.EmployeeUpdateServiceProxy;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@CrossOrigin
@Api(value = "EmployeeViewService demo using logger and swagger")
public class EmployeeUpdateController {

	@Autowired
	EmployeeUpdateServiceProxy proxy;

	@GetMapping("")
	@ApiOperation(value = "Welcome")
	public String welcome() {
		return "Employee update service";
	}

	@PostMapping("/addEmployee")
	@ApiOperation(value = "Add Employee")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Employee.class),
			@ApiResponse(code = 500, message = "Failure", response = Employee.class) })
	public Employee addEmployee(@RequestBody Employee employee) {
		return proxy.addEmployee(employee);
	}

	@PutMapping("/updateEmployee")
	@ApiOperation(value = "Update Employee")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Employee.class),
			@ApiResponse(code = 500, message = "Failure", response = Employee.class) })
	public Employee updateEmployee(@RequestBody Employee employee) {
		return proxy.updateEmployee(employee);
	}

	@DeleteMapping("/deleteEmployee")
	@ApiOperation(value = "Delete Employee")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success", response = Employee.class),
			@ApiResponse(code = 500, message = "Failure", response = Employee.class) })
	public void deleteEmployee(@RequestParam int employeeId) {
		proxy.deleteEmployee(employeeId);
	}

}
