import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Model/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { EmployeeIdsAndNames } from 'src/app/Model/EmployeeIdsAndNames';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: Employee

  employees: any = []
  employees1: any = []
  resEmployees: any = []
  employeeIdsAndNames: EmployeeIdsAndNames = new EmployeeIdsAndNames()
  employeeId: number = null
  employeeName: string = null
  employeeRole: string = null
  employeeSalary: number = null

  bucketSize: number = 5
  p: number = 1

  exists: boolean = null
  isAdded: boolean = false
  notFoundById: boolean = false

  isUpdated: boolean = false
  isDeleted: boolean = false
  isLoading: boolean = true

  sortedById: boolean = false
  sortedByName: boolean = false
  sortedBySalary: boolean = false
  sortedByRole: boolean = false


  constructor(public router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.employees = []
    this.employees1 = []
    this.employeeService.getEmployees().subscribe(
      (res => {
        this.isLoading = false
        for (let i of (res as any)) {

          if (i.manager == window.atob(localStorage.getItem("userName"))) {
            this.employees.push({
              employeeId: i.employeeId,
              employeeName: i.employeeName,
              employeeRole: i.employeeRole,
              employeeSalary: i.employeeSalary
            })
          }
          if (i.manager == window.atob(localStorage.getItem("userName"))) {
            this.employees1.push({
              employeeId: i.employeeId,
              employeeName: i.employeeName,
              employeeRole: i.employeeRole,
              employeeSalary: i.employeeSalary
            })
          }
        }
      }
      ))

    this.employeeService.getEmployeeIdsAndNames().subscribe(
      res => {
        this.employeeIdsAndNames.employeeIds = res.employeeIds
        this.employeeIdsAndNames.employeeNames = res.employeeNames
      }
    )
  }

  searchEmployee = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.employeeIdsAndNames.employeeNames.filter(v => v.toString().toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  addEmployee(form: NgForm) {
    if (form.valid) {
      let emp = new Employee()
      emp.employeeName = form.value.employeeName
      emp.employeeRole = form.value.employeeRole
      emp.employeeSalary = form.value.employeeSalary
      emp.manager = window.atob(localStorage.getItem('userName'))
      this.employeeService.addEmployee(emp).subscribe(
        res => {
          this.isAdded = true
        }
      )
    }
  }

  checkByName(form: NgForm) {
    this.exists = false
    this.employeeService.findByName(form.value.employeeName).subscribe(
      res => {
        this.resEmployees = res
        this.exists = true
      }
    )
  }

  checkById(form: NgForm) {
    this.notFoundById = false
    this.employeeService.findById(form.value.employeeId).subscribe(
      res => {
        this.employee = res
        if (res == null) {
          this.notFoundById = true
          console.log('not found');

        }
        else {
          this.notFoundById = false
        }
      }
    )
  }

  updateEmployee(form: NgForm) {
    if (form.valid) {
      let emp = new Employee()
      emp.employeeName = this.employeeName
      emp.employeeId = this.employeeId
      emp.employeeRole = this.employeeRole
      emp.employeeSalary = this.employeeSalary

      this.employeeService.updateEmployee(emp).subscribe(
        res => {
          this.isUpdated = true
          this.ngOnInit()
        }
      )
    }
  }

  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      res => {
        this.ngOnInit()
      }
    )
  }

  sortByName() {
    this.employees.sort(this.sortByProperty('employeeName'))
    this.sortedByName = true
    this.sortedByRole = this.sortedBySalary = this.sortedById = false
  }
  sortById() {
    this.employees.sort(this.sortByProperty('employeeId'))
    this.sortedById = true
    this.sortedByRole = this.sortedBySalary = this.sortedByName = false
  }
  sortBySalary() {
    this.employees.sort(this.sortByProperty('employeeSalary'))
    this.sortedBySalary = true
    this.sortedByRole = this.sortedByName = this.sortedById = false
  }
  sortByRole() {
    this.employees.sort(this.sortByProperty('employeeRole'))
    this.sortedByRole = true
    this.sortedByName = this.sortedBySalary = this.sortedById = false
  }

  //Function to sort property of an array
  sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property])
        return 1;
      else if (a[property] < b[property])
        return -1;

      return 0;
    }
  }

  onKey(event: any) {
    this.employees = this.employees.filter(employee => employee.employeeName.includes(event.target.value))
    if (event.target.value == '')
      this.employees = this.employees1
  }
}
