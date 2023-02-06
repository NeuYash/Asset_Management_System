import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { AdminDashBoardComponent } from './Views//admin-dash-board/admin-dash-board.component';
import { ErrorComponent } from './ErrorComponent';
import { ManagerDashboardComponent } from './Views/manager-dashboard/manager-dashboard.component';
import { AssetComponent } from './Views//asset/asset.component';
import { AssetAllocationComponent } from './Views/asset-allocation/asset-allocation.component';
import { ExportComponent } from './Views/admin-dash-board/ExportComponent';
import { EmployeeComponent } from './Views/employee/employee.component';
import { ManagerComponent } from './Views/manager/manager.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin/dashboard', component: AdminDashBoardComponent, children: [
      { path: 'asset/add', component: AssetComponent },
      { path: 'asset/update', component: AssetComponent },
      { path: 'asset/update/:assetId', component: AssetComponent },
      { path: 'asset/view', component: AssetComponent },
      { path: 'asset/export', component: ExportComponent },
      { path: 'allocation/view', component: AssetAllocationComponent },
      { path: 'allocation/view/pending', component: AssetAllocationComponent },
      { path: 'allocation/change_status', component: AssetAllocationComponent },
      { path: 'manager/add', component: ManagerComponent },
      { path: 'manager/view', component: ManagerComponent }
    ]
  },
  {
    path: 'manager/dashboard', component: ManagerDashboardComponent, children: [
      { path: 'asset/view', component: AssetComponent },
      { path: 'allocation/request', component: AssetAllocationComponent },
      { path: 'allocation/request/:assetId', component: AssetAllocationComponent },
      { path: 'allocation/view-status', component: AssetAllocationComponent },
      { path: 'allocation/view-requests', component: AssetAllocationComponent },
      { path: 'employee/check', component: EmployeeComponent },
      { path: 'employee/view', component: EmployeeComponent },
      { path: 'employee/add', component: EmployeeComponent }
    ]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
