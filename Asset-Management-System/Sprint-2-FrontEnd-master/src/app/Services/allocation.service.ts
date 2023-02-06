import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AssetAllocation } from '../Model/AssetAllocation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //Submit request
  requestAllocation(allocation: AssetAllocation): Observable<AssetAllocation> {
    return this.http.post<AssetAllocation>("https://zuul-api-gateway.herokuapp.com/raiseReq", allocation, this.httpOptions)
  }

  //View requests
  viewRequests() {
    return this.http.get("https://zuul-api-gateway.herokuapp.com/viewAllocations", this.httpOptions)
  }

  //Get pending
  viewPending() {
    return this.http.get("https://zuul-api-gateway.herokuapp.com//pendingrequests", this.httpOptions)
  }

  //Count requests
  countRequests() {
    return this.http.get("https://zuul-api-gateway.herokuapp.com/countRequests")
  }

  //Count pending
  countPending() {
    return this.http.get("https://zuul-api-gateway.herokuapp.com/countPending")
  }

  // approve / deny request
  changeStatus(allocationId: number, status: string) {
    return this.http.get(`https://zuul-api-gateway.herokuapp.com/changeStatus/${allocationId}/${status}`)
  }

  //Find by allocation id
  findByAllocationId(allocationId: number): Observable<AssetAllocation> {
    return this.http.get<AssetAllocation>(`https://zuul-api-gateway.herokuapp.com/findById/${allocationId}`)
  }

  //Find by asset id
  findByAssetId(assetId: number): Observable<AssetAllocation> {
    return this.http.get<AssetAllocation>(`https://zuul-api-gateway.herokuapp.com/findByAsset/${assetId}`, this.httpOptions)
  }

  //Find by asset id
  findByEmployeeId(employeeId: number): Observable<AssetAllocation> {
    return this.http.get<AssetAllocation>(`https://zuul-api-gateway.herokuapp.com/findByEmployee/${employeeId}`, this.httpOptions)
  }
}
