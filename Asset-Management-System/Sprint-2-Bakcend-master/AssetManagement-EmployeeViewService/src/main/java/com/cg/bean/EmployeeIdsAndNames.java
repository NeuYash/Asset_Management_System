package com.cg.bean;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class EmployeeIdsAndNames {

	private List<Integer> employeeIds;
	private List<String> employeeNames;

	public List<Integer> getEmployeeIds() {
		return employeeIds;
	}

	public void setEmployeeIds(List<Integer> employeeIds) {
		this.employeeIds = employeeIds;
	}

	public List<String> getEmployeeNames() {
		return employeeNames;
	}

	public void setEmployeeNames(List<String> employeeNames) {
		this.employeeNames = employeeNames;
	}

}
