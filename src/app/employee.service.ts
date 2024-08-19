import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from './model/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  baseUrl: string = 'https://localhost:7145/api/Employee';

  GetEmployees(): Observable<employee[]> {
    return this.httpClient.get<employee[]>(this.baseUrl);
  }

  createEmployee(emp: employee): Observable<employee> {
    emp.id = '00000000-0000-0000-0000-000000000000';
    return this.httpClient.post<employee>(this.baseUrl, emp);
  }

  updateEmployee(emp: employee): Observable<employee> {
    return this.httpClient.put<employee>(this.baseUrl + '/' + emp.id, emp);
  }

  deleteEmployee(id: string): Observable<employee> {
    return this.httpClient.delete<employee>(this.baseUrl + '/' + id);
  }
}
