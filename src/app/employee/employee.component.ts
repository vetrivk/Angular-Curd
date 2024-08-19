import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { employee } from '../model/Employee';
import { FormBuilder, FormGroup } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  constructor(
    private employeeServer: EmployeeService,
    private fb: FormBuilder
  ) {
    this.EmployeeFormGroup = fb.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
    });
  }

  EmployeeView: employee[] = [];
  EmployeeFormGroup: FormGroup;
  isUpdateMode: Boolean = false;

  ngOnInit(): void {
    this.getViewEmploye();
  }

  getViewEmploye() {
    this.employeeServer.GetEmployees().subscribe((response) => {
      this.EmployeeView = response;
    });
  }

  onSubmit() {
    if (
      this.EmployeeFormGroup.value.id != null &&
      this.EmployeeFormGroup.value.id != ''
    ) {
      // update Exist Employee
      this.employeeServer
        .updateEmployee(this.EmployeeFormGroup.value)
        .subscribe((response) => {
          this.getViewEmploye();
          this.clear();
        });
    } else {
      // Create New Employee
      this.employeeServer
        .createEmployee(this.EmployeeFormGroup.value)
        .subscribe((response) => {
          this.getViewEmploye();
          this.clear();
        });
    }
  }
  onUpdate() {
    // update Exist Employee
    this.employeeServer
      .updateEmployee(this.EmployeeFormGroup.value)
      .subscribe((response) => {
        this.getViewEmploye();
        this.clear();
      });
  }
  clear() {
    this.EmployeeFormGroup.reset();
    this.isUpdateMode = false;
  }

  fillFrom(emp: employee) {
    this.isUpdateMode = true;
    this.EmployeeFormGroup.setValue({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
    });
  }

  deleteView(id: string) {
    this.employeeServer.deleteEmployee(id).subscribe((response) => {
      this.getViewEmploye();
    });
  }
}
