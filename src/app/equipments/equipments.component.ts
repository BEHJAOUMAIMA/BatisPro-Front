import {Component, OnInit} from '@angular/core';
import {EquipmentsService} from "./service/equipments.service";
import {Equipment} from "./interface/equipment";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit{

  constructor(private service : EquipmentsService) {}

  protected equipments : Equipment[] | undefined;

  equipmentFamilies: { [key: number]: string } = {};
  ngOnInit(){
    this.getEquipment();
  }
  public getEquipment(){
    this.service.getEquipment().subscribe(
      (response : any) =>{
        this.equipments = response.result;
        this.fetchEquipmentFamilyNames();
        console.log(response)
      },
      (error : HttpErrorResponse)=>{
        console.log(error)
      }
    );
  }

  private fetchEquipmentFamilyNames() {
    if (this.equipments) {
      const equipmentIds = this.equipments.map(equipment => equipment.id.toString());
      this.service.getEquipmentFamilyNames(equipmentIds).subscribe(
        (response: { [key: number]: string }) => {
          this.equipmentFamilies = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }


}
