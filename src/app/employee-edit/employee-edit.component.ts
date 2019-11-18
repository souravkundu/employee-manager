import { Component, OnInit, Input, Output } from '@angular/core';
import { Employee } from '../model/employee.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { EmployeeService } from '../utility/employee.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  @Input() employee: Employee;
  employeeForm: FormGroup;
  @Output() submitted = new Subject();
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {

  }

  submit(form: NgForm) {
    this.employee.firstName = form.value.firstName;
    this.employee.lastName = form.value.lastName;
    this.employee.email = form.value.email;
    this.employeeService.editEmployee(this.employee);
    this.submitted.next();
   }

}
