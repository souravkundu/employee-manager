import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../model/employee.model';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmployeeResolverService implements Resolve<Employee[]> {
    constructor(private employeeService: EmployeeService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.employeeService.getEmployees();
    }
}
