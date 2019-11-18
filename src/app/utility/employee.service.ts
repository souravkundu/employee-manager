import { Employee } from '../model/employee.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    employees: Employee[] = null;
    employeeList = new BehaviorSubject<Employee[]>(null);

    constructor(private http: HttpClient) { }

    getEmployees() {
        if (this.employees === null) {
            return this.fetchEmployees();
        }
        return this.employees.slice();
    }

    dataServiceURL = 'http://ec2-35-154-132-227.ap-south-1.compute.amazonaws.com/em/employees' ;

    fetchEmployees() {
        return this.http.get<Employee[]>(this.dataServiceURL, {
            // headers: new HttpHeaders().append('Authorization', 'Basic ' + btoa('sourav:sourav'))
        }).pipe(tap(response => {
            this.employees = response;
            this.employeeList.next(this.employees.slice());
        }));
    }

    editEmployee(employee: Employee) {
        console.log(employee);
        this.http.put<Employee>(this.dataServiceURL+'/update', employee)
        .subscribe( updatedEmployee => {
            this.fetchEmployees().subscribe();
        });
    }

    addEmployee(employee: Employee) {
        this.http.post<Employee>(this.dataServiceURL+'/new',
        employee)
        .subscribe( newEmployee => {
            this.employees.push(newEmployee);
            this.employeeList.next(this.employees.slice());
        });
    }

    deleteEmployee(id: number) {
        this.http.delete<Employee>(this.dataServiceURL+'/' + id)
        .subscribe(() => {
            this.employees = this.employees.filter((employee) => employee.id !== id);
            this.employeeList.next(this.employees.slice());
        });
    }
}
