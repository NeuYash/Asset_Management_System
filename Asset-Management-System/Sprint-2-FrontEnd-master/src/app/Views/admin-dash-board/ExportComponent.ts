import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CSVService } from '../../Services/csv.service';
import { AssetService } from '../../Services/asset.service';

@Component({
    selector: 'export',
    template: `
    <div class="container text-center" style="padding-top: 3rem;">
        <div class="form-group">
            <h1 class="h1"><i class="fas fa-file-csv"></i> Export to CSV</h1>
            <div class="form-group">
                <p class="lead">Export list of assets to a csv file</p>
            </div>
        </div>        
        <div class="row">
            <div class="col-md-3" ></div>
            <div class="col-md-6">
                <div class="card bg-transparent">
                    <form #exportForm="ngForm" (ngSubmit)='onSubmit(exportForm)'>
                        <div class="card-header">
                            <h3 class="h3"> Enter filename </h3>
                        </div>
                        <div class="card-body">
                            <p class="text-center">
                                <i class="fas fa-save"></i>&nbsp; Enter name of file to save as CSV.
                            </p>
                            <div class="form-group">
                                <input [(ngModel)]="fileName" #fName="ngModel" name="fileName" class="form-control" required placeholder="File name" />                    
                                <span *ngIf='!fName.valid && fName.touched' style="color: red"> Enter filename </span>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary" [disabled] = '!exportForm.valid'>
                                    <i class="fa fa-download"></i> Export
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-md-3" ></div>
        </div>
    </div>
  `
})
export class ExportComponent implements OnInit {

    fileName: string = null
    assets: any = []

    constructor(private ConvertToCSV: CSVService, private assetService: AssetService) { }

    exportToCSV() {

        this.ConvertToCSV.downloadFile(this.assets, this.fileName)
    }

    onSubmit(form: NgForm) {
        if (form.valid)
            this.exportToCSV()
    }

    ngOnInit() {
        this.assetService.loadAssets().subscribe((res => {
            for (let a of (res as any)) {
                this.assets.push({
                    assetId: a.assetId,
                    assetName: a.assetName,
                    assetDes: a.remark,
                    status: a.status
                })
            }
        })
        )
    }
}