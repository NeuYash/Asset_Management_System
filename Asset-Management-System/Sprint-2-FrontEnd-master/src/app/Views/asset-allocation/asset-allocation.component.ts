import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetAllocation } from 'src/app/Model/AssetAllocation';
import { AllocationService } from 'src/app/Services/allocation.service';
import { AssetService } from 'src/app/Services/asset.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { AssetIdsAndNames } from 'src/app/Model/AssetIdsAndNames';
import { EmployeeIdsAndNames } from 'src/app/Model/EmployeeIdsAndNames';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Asset } from 'src/app/Model/Asset';
import { Employee } from 'src/app/Model/Employee';

@Component({
  selector: 'app-asset-allocation',
  templateUrl: './asset-allocation.component.html',
  styleUrls: ['./asset-allocation.component.css']
})
export class AssetAllocationComponent implements OnInit {

  allocation: AssetAllocation = new AssetAllocation()

  allocations: any = []
  tempAllocations: any = []
  pendingAllocations: any = []
  employeeIdsAndNames: EmployeeIdsAndNames

  assetIdsAndNames: AssetIdsAndNames
  asset: Asset = new Asset()
  employee: Employee = new Employee()

  assetName: string = null
  employeeName: string = null

  bucketSize: number = 5
  page: number = 1

  //Flags needed to render components in UI
  isSubmitted: boolean = false
  isLoaded: boolean = false
  assetNotAvailableError: boolean = false
  isEmpError: boolean = false
  isAssetError: boolean = false
  isStatusChanging: boolean = false
  isAssetDetailsFetched: boolean = false
  isEmployeeDetailsFetched: boolean = false
  isAssetDetailsLoading: boolean = false
  isEmployeeDetailsLoading: boolean = false
  sortedByAllocationId: boolean = false
  isAllocationsFetched: boolean = false
  noAllocations: boolean = false

  constructor(public router: Router, private allocationService: AllocationService,
    private assetService: AssetService, private employeeService: EmployeeService, private activatedRoute: ActivatedRoute) { }

  searchAsset = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.assetIdsAndNames.assetNames.filter(v => v.toString().toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchEmployee = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.employeeIdsAndNames.employeeNames.filter(v => v.toString().toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  ngOnInit(): void {

    this.allocationService.viewRequests().subscribe(
      res => {
        this.isLoaded = true
        this.allocations = res
        this.tempAllocations = res
        this.sortByAllocationId()
      }
    )

    //Call service that returns asset ids and names
    this.assetService.getAssetIdAndNames().subscribe(
      res => {
        this.assetIdsAndNames = res
      }
    )

    //Call service that returns employee ids and names
    this.employeeService.getEmployeeIdsAndNames().subscribe(
      res => {
        this.employeeIdsAndNames = res
      }
    )

    this.allocationService.viewPending().subscribe(
      res => {
        this.pendingAllocations = res
      }
    )

    let assetId = null

    this.activatedRoute.queryParamMap.subscribe(
      args => {
        if (args != null)
          assetId = args.get('assetId')
        this.allocation.assetId = assetId
      }
    )
  }

  requestAllocation() {

    this.allocationService.requestAllocation(this.allocation).subscribe(
      res => {
        if (res != null && res.message == null)
          this.isSubmitted = true
        if (res != null && res.message == 'asset_already_allocated')
          this.assetNotAvailableError = true
        if (res != null && res.message == 'asset_doesnt_exist')
          this.isAssetError = true
        if (res != null && res.message == 'employee_doesnt_exist')
          this.isEmpError = true
      }
    )
  }

  searchAssetDetails() {
    this.isAssetDetailsLoading = true
    this.assetService.findByName(this.assetName).subscribe(
      res => {
        this.asset = res
        this.isAssetDetailsFetched = true
        this.isAssetDetailsLoading = false
      }
    )
  }

  searchEmployeeDetails() {
    this.isEmployeeDetailsLoading = true
    this.employeeService.findByName(this.employeeName).subscribe(
      res => {
        this.employee = res
        this.isEmployeeDetailsFetched = true
        this.isEmployeeDetailsLoading = false
      }
    )
  }

  changeStatus(allocationId: number, status: string) {
    this.isStatusChanging = true
    this.allocationService.changeStatus(allocationId, status).subscribe(
      res => {
        if (res == null)
          alert('Error occured');
        else
          this.ngOnInit()
      }
    )
  }

  //Sort by allocation id
  sortByAllocationId() {
    this.allocations.sort(this.sortByProperty('allocationId'))
    this.sortedByAllocationId = true
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

  onKeyUp(event: any) {

    this.pendingAllocations = this.pendingAllocations.filter(allocation => allocation.asset.assetName.includes(event.target.value))
    if (event.target.value == '' || event.target.value == undefined) {
      this.pendingAllocations = this.allocations.filter(allocation => allocation.status == 'pending')
    }
  }

  onKeyUpAll(event: any) {
    this.allocations = this.allocations.filter(allocation => allocation.asset.assetName.includes(event.target.value))
    if (event.target.value == '' || event.target.value == undefined) {
      this.allocations = this.tempAllocations
    }
  }

  viewApproved() {
    this.allocations = this.tempAllocations.filter(allocation => allocation.status == 'approved')
  }

  viewRejected() {
    this.allocations = this.tempAllocations.filter(allocation => allocation.status == 'rejected')
  }

  findByAllocationId(allocationId: number) {
    this.allocationService.findByAllocationId(allocationId).subscribe(
      res => {
        this.allocations = []
        this.allocations.push(res)
        console.log(this.allocations);
        
        this.isAllocationsFetched = true
      }
    )
  }

  findByAssetId(assetId: number) {
    this.allocationService.findByAssetId(assetId).subscribe(
      res => {
        this.allocations = res
        this.isAllocationsFetched = true
      }
    )
  }

  findByEmployee(employeeId: number) {
    this.allocationService.findByEmployeeId(employeeId).subscribe(
      res => {
        this.allocations = res
        this.isAllocationsFetched = true
      }
    )

  }
}
