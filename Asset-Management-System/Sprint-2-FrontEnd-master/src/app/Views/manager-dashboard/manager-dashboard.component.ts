import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { AllocationService } from 'src/app/Services/allocation.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  sidebarClass: string = ""
  menuToggleClass: string = "container1"

  employeeCount: Object = null
  requestsCount: Object = null
  pendingCount: Object = null

  constructor(public router: Router, public employeeService: EmployeeService, private allocationService: AllocationService) { }

  ngOnInit(): void {
    if (window.atob(localStorage.getItem('userType')) !== 'manager')
      this.router.navigate([''], {
        queryParams: {
          'redirect':true
        }
      })

    this.employeeService.countEmployees().subscribe(
      res => {
        this.employeeCount = res
      }
    )
    this.allocationService.countPending().subscribe(
      res => {
        this.pendingCount = res
      }
    )
    this.allocationService.countRequests().subscribe(
      res => {
        this.requestsCount = res
      }
    )
  }

  logOut() {
    localStorage.removeItem('userName')
    localStorage.removeItem('userType')
    this.router.navigate([''])
  }

  toggleClass() {
    if (this.sidebarClass == "") {
      this.sidebarClass = "toggled"
      this.menuToggleClass = "container1  clickable"
    }
    else {
      this.sidebarClass = ""
      this.menuToggleClass = "container1 clickable"
    }
  }

}
