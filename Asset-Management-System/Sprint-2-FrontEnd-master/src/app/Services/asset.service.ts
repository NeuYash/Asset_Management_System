import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from '../Model/Asset';
import { ApiResponse } from '../Model/ApiResponse';
import { AssetIdsAndNames } from '../Model/AssetIdsAndNames';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  loadAssets(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>("https://zuul-api-gateway.herokuapp.com/getAssets", this.httpOptions)
  }

  postAsset(asset: Asset, quantity: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`https://zuul-api-gateway.herokuapp.com/addAsset/${quantity}`, asset, this.httpOptions)
  }

  updateAsset(asset: Asset): Observable<ApiResponse> {
    return this.http.put<ApiResponse>("https://zuul-api-gateway.herokuapp.com/updateAsset", asset, this.httpOptions)
  }

  deleteAsset(assetId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`https://zuul-api-gateway.herokuapp.com/deleteAsset?assetId=${assetId}`, this.httpOptions)
  }

  countAssets() {
    return this.http.get("https://zuul-api-gateway.herokuapp.com/countAssets", this.httpOptions)
  }

  findById(assetId: number): Observable<Asset> {
    return this.http.get<Asset>("https://zuul-api-gateway.herokuapp.com/findAssetById?assetId=" + assetId, this.httpOptions)
  }

  getAssetIdAndNames(): Observable<AssetIdsAndNames> {
    return this.http.get<AssetIdsAndNames>("https://zuul-api-gateway.herokuapp.com/getAssetIdsAndNames", this.httpOptions)
  }

  findByName(assetName: string): Observable<Asset> {
    return this.http.get<Asset>(`https://zuul-api-gateway.herokuapp.com/getAssetsByName/${assetName}`, this.httpOptions)
  }
}
