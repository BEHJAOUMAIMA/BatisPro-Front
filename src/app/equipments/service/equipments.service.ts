import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Equipment} from "../interface/equipment";

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  private endPointApi = "http://localhost:8081/api";
  constructor( private Http : HttpClient) {}

  public getEquipment(): Observable<Equipment[]>{
    return this.Http.get<Equipment[]>(`${this.endPointApi}/equipment`);
  }

  getEquipmentFamilyNames(equipmentIds: string[]): Observable<{ [key: number]: string }> {
    const url = `${this.endPointApi}/equipment-family`;
    const params = { equipmentIds: equipmentIds.join(',') };
    return this.Http.get<{ [key: number]: string }>(url, { params });
  }


}
