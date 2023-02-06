import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Views/login/login.component';
import { AdminDashBoardComponent } from './Views/admin-dash-board/admin-dash-board.component'
import { AuthService } from "./Services/auth.service"
import { HttpClientModule } from "@angular/common/http";
import { ManagerDashboardComponent } from './Views/manager-dashboard/manager-dashboard.component';
import { AssetComponent } from './Views/asset/asset.component';
import { AssetAllocationComponent } from './Views/asset-allocation/asset-allocation.component';
import { ExportComponent } from './Views/admin-dash-board/ExportComponent';
import { EmployeeComponent } from './Views/employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { ManagerComponent } from './Views/manager/manager.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashBoardComponent,
    ManagerDashboardComponent,
    AssetComponent,
    AssetAllocationComponent,
    ExportComponent,
    EmployeeComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
