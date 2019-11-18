import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../utility/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  selectedEmployee: Employee = null;
  editMode = false;
  searchString = '';
  searchType = 'firstName';

  employees: Employee[] = null;
  pageOfItems: Array<Employee>;  

  ngOnInit() { 

    this.employeeService.employeeList.subscribe(employees => {
      this.employees = employees;
    });
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
  }

  editEmployee(employee: Employee) {
    this.editMode = true;
    this.selectedEmployee = employee;
  }
  switchEditMode() {
    this.editMode = !this.editMode;
  }

  filterEmployees() {
    const lowerCaseSearchString =  this.searchString.toLowerCase();
    if(this.searchString === '')
    {
      this.pageOfItems = this.employees;
    } else {
      switch (this.searchType) {
        case 'firstName': this.pageOfItems = this.employees.filter(employee => employee.firstName.toLowerCase()
        .match(lowerCaseSearchString)); break;
        case 'lastName': this.pageOfItems = this.employees.filter(employee => employee.lastName.toLowerCase()
        .match(lowerCaseSearchString)); break;
        case 'email': this.pageOfItems = this.employees.filter(employee => employee.email.toLowerCase()
        .match(lowerCaseSearchString)); break;
        case 'id': this.pageOfItems = this.employees.filter(employee => employee.id.toString()
        .match(lowerCaseSearchString)); break;
      }
    }
    
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

}
