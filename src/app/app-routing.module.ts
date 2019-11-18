import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeResolverService } from './utility/employee-resolver.service';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'employee-list', pathMatch: 'full'},
  { path: 'employee-list', component: EmployeeListComponent, resolve: [EmployeeResolverService] , canActivate: [AuthGuardService],},
  { path: 'employee-add', component: EmployeeAddComponent , canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
