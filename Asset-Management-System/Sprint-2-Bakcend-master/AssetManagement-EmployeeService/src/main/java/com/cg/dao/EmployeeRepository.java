package com.cg.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cg.bean.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	public Employee findByEmployeeId(int employeeId);

	public List<Employee> findByEmployeeName(String employeeName);

	@Query("SELECT employeeId FROM #{#entityName}")
	List<Integer> getEmployeeIds();

	@Query("SELECT employeeName FROM #{#entityName}")
	List<String> getEmployeeNames();
}
