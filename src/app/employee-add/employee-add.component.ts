import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../utility/employee.service';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup;
  message: string = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
    });
  }

  submit() {
    const controls = this.employeeForm.controls;
    this.employeeService.addEmployee(
      new Employee(
        0,
        controls.firstName.value,
        controls.lastName.value,
        controls.email.value
      )
    );
    this.employeeForm.reset();
    this.message = 'employee is added';
  }

}
