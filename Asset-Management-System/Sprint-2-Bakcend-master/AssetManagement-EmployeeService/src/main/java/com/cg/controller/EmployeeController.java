package com.cg.controller;

import java.util.List;

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
import com.cg.bean.EmployeeIdsAndNames;
import com.cg.service.EmployeeService;

@RestController
@CrossOrigin
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	EmployeeIdsAndNames idsAndNames;

	@GetMapping("")
	public String sayName() {
		return " In employee microservice.";
	}

	@GetMapping("/getEmployees")
	public List<Employee> getEmployees() {
		return employeeService.findAll();
	}

	@PostMapping("/addEmployee")
	public Employee addEmployee(@RequestBody Employee employee) {
		return employeeService.save(employee);
	}

	@PutMapping("/updateEmployee")
	public Employee updateEmployee(@RequestBody Employee employee) {
		return employeeService.save(employee);
	}

	@DeleteMapping("/deleteEmployee")
	public void deleteEmployee(@RequestParam int employeeId) {
		employeeService.deleteById(employeeId);
	}

	@GetMapping("findById")
	public Employee findById(@RequestParam int employeeId) {
		return employeeService.findByEmployeeId(employeeId);
	}

	@GetMapping("findByName")
	public List<Employee> findByName(@RequestParam String employeeName) {
		return employeeService.findByEmployeeName(employeeName);
	}

	@GetMapping("countEmployees")
	public Long countEmployess() {
		return employeeService.count();
	}

	@GetMapping("getEmployeeIdsAndNames")
	public EmployeeIdsAndNames getEmployeeIds() {
		idsAndNames.setEmployeeIds(employeeService.getEmployeeIds());
		idsAndNames.setEmployeeNames(employeeService.getEmployeeNames());
		return idsAndNames;
	}
}
