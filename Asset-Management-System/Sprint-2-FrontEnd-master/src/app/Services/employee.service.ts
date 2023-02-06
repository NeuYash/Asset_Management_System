import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Model/Employee';
import { ApiResponse } from '../Model/ApiResponse';
import { EmployeeIdsAndNames } from '../Model/EmployeeIdsAndNames';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  findById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`https://zuul-api-gateway.herokuapp.com/findById?employeeId=${employeeId}`)
  }

  findByName(employeeName: string): Observable<Employee> {
    return this.http.get<Employee>(`https://zuul-api-gateway.herokuapp.com/findByName?employeeName=${employeeName}`)
  }

  getEmployees(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>("https://zuul-api-gateway.herokuapp.com/getEmployees", this.httpOptions)
  }

  addEmployee(employee: Employee): Observable<ApiResponse> {
    return this.http.post<ApiResponse>("https://zuul-api-gateway.herokuapp.com/addEmployee", employee, this.httpOptions)
  }

  updateEmployee(employee: Employee): Observable<ApiResponse> {
    return this.http.put<ApiResponse>("https://zuul-api-gateway.herokuapp.com/updateEmployee", employee, this.httpOptions)
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete<ApiResponse>("https://zuul-api-gateway.herokuapp.com/deleteEmployee?employeeId=" + employeeId, this.httpOptions)
  }

  countEmployees() {
    return this.http.get("https://zuul-api-gateway.herokuapp.com/countEmployees", this.httpOptions)
  }

  getEmployeeIdsAndNames(): Observable<EmployeeIdsAndNames> {
    return this.http.get<EmployeeIdsAndNames>("https://zuul-api-gateway.herokuapp.com/getEmployeeIdsAndNames", this.httpOptions)
  }
}
