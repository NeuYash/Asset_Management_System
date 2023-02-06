import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from 'src/app/Services/asset.service';
import { AllocationService } from 'src/app/Services/allocation.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent implements OnInit {

  sidebarClass: string = ""
  menuToggleClass: string = "container1"
  assetCount: object = null
  requestCount: object = null
  pendingCount: object = null

  isLoadingCount: boolean = true
  isLoadingPending: boolean = true
  isLoadingRequests: boolean = true

  constructor(public router: Router, private assetService: AssetService,
    private allocationService: AllocationService) { }

  ngOnInit(): void {

    if (window.atob(localStorage.getItem('userType')) !== 'admin')
      this.router.navigate([''], {
        queryParams: {
          redirect: true
        }
      })

    this.assetService.countAssets().subscribe(
      res => {
        this.assetCount = res
        this.isLoadingCount = false
      }
    )
    this.allocationService.countRequests().subscribe(
      res => {
        this.requestCount = res
        this.isLoadingPending = false
      }
    )
    this.allocationService.countPending().subscribe(
      res => {
        this.pendingCount = res
        this.isLoadingRequests = false
      }
    )
  }

  //Logout
  logOut() {
    localStorage.removeItem('userType')
    this.router.navigate([''])
  }

  //For toggle
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
