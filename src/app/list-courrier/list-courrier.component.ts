import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Virement } from '../interfaces/virement';
import { ClientService } from '../_services/Client.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-list-courrier',
  templateUrl: './list-courrier.component.html',
  styleUrls: ['./list-courrier.component.css']
})
export class ListCourrierComponent implements OnInit {

  listVirement:Virement[];
  num:String;
  
  constructor(private router: Router,private clientService :ClientService,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {

    if(this.tokenStorage.getToken()==null){
      this.router.navigate(['/login']); 
    }else{
      const numTelAccess = window.sessionStorage.getItem("username");
      this.num = numTelAccess;
      this.clientService.GetListVirement(this.num).subscribe({
        next: data => {
         
          console.log(data);
          this.listVirement=data;
        },
        error: err => {
          console.log("erreur while fetching list facture");
        }
      }); 
    }
  
  }
  

}
