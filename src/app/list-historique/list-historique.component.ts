import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Facture } from '../interfaces/Facture';
import { ListFactureRequest } from '../RequestEntities/ListFactureRequest';
import { PayerFactureRequest } from '../RequestEntities/PayerFactureRequest';
import { ClientService } from '../_services/Client.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-list-historique',
  templateUrl: './list-historique.component.html',
  styleUrls: ['./list-historique.component.css']
})
export class ListHistoriqueComponent implements OnInit {

  
  listFacture:Facture[];
  num:String;
  
  constructor(private router: Router,private clientService :ClientService,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {

    if(this.tokenStorage.getToken()==null){
      this.router.navigate(['/login']); 
    }else{
      const numTelAccess = window.sessionStorage.getItem("username");
      this.num = numTelAccess;
      this.clientService.GetListfacturePaid(this.num).subscribe({
        next: data => {
          console.log(data);
          this.listFacture=data;
        },
        error: err => {
          console.log("erreur while fetching list facture");
        }
      }); 
    }
   
  }
  
 
}


