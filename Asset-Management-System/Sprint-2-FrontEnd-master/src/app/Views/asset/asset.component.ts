import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '../../Services/asset.service';
import { NgForm } from '@angular/forms';
import { Asset } from '../../Model/Asset';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AssetIdsAndNames } from 'src/app/Model/AssetIdsAndNames';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  asset: Asset = null
  assets: any = []
  assetName: string = null
  assetDes: string = null
  arr: any = []
  assetIdsAndNames: AssetIdsAndNames = null
  status: string = "unallocated"
  assetId: string = null
  quantity: number = null
  bucketSize: number = 5
  p: number = 1
  thissStatus: any = null
  assets1: any = []

  //Flags required for interactive UI
  isAdded: boolean = null
  isUpdated: boolean = false
  isLoading: boolean = true
  isErrorUpdating: boolean = false

  sortedById: boolean = null
  sortedByName: boolean = null
  sortedByDes: boolean = null
  isDeleteError: boolean = false

  constructor(public router: Router, private assetService: AssetService, public route: ActivatedRoute) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.assetIdsAndNames[0].filter(v => v.toString().toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  ngOnInit(): void {
    this.assets = []
    this.assets1 = []
    this.assetService.loadAssets().subscribe(
      (data => {
        this.isLoading = false
        for (let a of (data as any)) {
          this.assets.push({
            assetId: a.assetId,
            assetName: a.assetName,
            assetDes: a.remark,
            status: a.status
          })
          this.assets1.push({
            assetId: a.assetId,
            assetName: a.assetName,
            assetDes: a.remark,
            status: a.status
          })
        }
        this.sortById()
      })
    )

    this.assetService.getAssetIdAndNames().subscribe(
      res => {
        this.assetIdsAndNames = res
      }
    )

    this.route.queryParamMap.subscribe(args => {
      if (args.get('assetId') != null) {
        this.assetId = args.get('assetId')
        this.assetName = args.get('assetName')
        this.assetDes = args.get('assetDes')
        this.status = args.get('status')
      }

    })
  }

  updatePath(assetId, assetName, assetDes, status) {
    this.assetName = assetName
    this.assetDes = assetDes
    this.status = status
    this.router.navigate(['/admin/dashboard/asset/update/'],
      { queryParams: { assetId: assetId, assetName: assetName, assetDes: assetDes, status: status } })
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let asset = new Asset()
      asset.assetName = form.value.assetName
      asset.assetId = form.value.assetId
      asset.status = form.value.status
      asset.remark = form.value.assetDes

      this.assetService.postAsset(asset, this.quantity).subscribe(
        res => {
          if (res != null) {
            this.isAdded = true
          }
        }
      )
    }
  }

  onUpdate(form: NgForm) {

    if (!this.assetIdsAndNames.assetIds.includes(Number(this.assetId)))
      this.isErrorUpdating = true

    if (form.valid && !this.isErrorUpdating) {
      let asset = new Asset()
      asset.assetName = form.value.assetName
      asset.assetId = form.value.assetId
      asset.status = form.value.status
      asset.remark = form.value.assetDes

      this.assetService.updateAsset(asset).subscribe(res => {
        this.isUpdated = true
        this.ngOnInit()
      })
    }
  }

  deleteAsset(assetId: number) {
    if (this.assets.filter(asset => asset.assetId == assetId)[0].status == 'allocated')
      this.isDeleteError = true
    else {
      this.assetService.deleteAsset(assetId).subscribe((res) => {
        this.assets = []
        this.ngOnInit()
      })
    }


  }


  //Sort by id
  sortById() {
    this.assets1.sort(this.sortByProperty('assetId'))
    this.sortedById = true
    this.sortedByName = this.sortedByDes = false
  }

  //Sort by name
  sortByName() {
    this.assets1.sort(this.sortByProperty('assetName'))
    this.sortedByName = true
    this.sortedById = this.sortedByDes = false
  }

  //Sort by description
  sortByDes() {
    this.assets1.sort(this.sortByProperty('assetDes'))
    this.sortedByDes = true
    this.sortedByName = this.sortedById = false
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
    this.assets1 = this.assets.filter(asset => asset.assetName.includes(event.target.value))
    if (event.target.value == '' || event.target.value == undefined)
      this.assets1 = this.assets
  }

  //view allocated
  viewAllocated() {
    this.assets1 = this.assets.filter((asset: { status: string; }) => asset.status == "allocated")
    console.table(this.assets)
  }

  viewUnallocated() {
    this.assets1 = this.assets.filter((asset: { status: string; }) => asset.status == "unallocated")
    console.table(this.assets)
  }

  routeRequest(assetId: number) {
    this.router.navigate(['manager/dashboard/allocation/request/'],
      { queryParams: { assetId: assetId } })
  }
}
