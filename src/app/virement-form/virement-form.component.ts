import { VirementRequest } from './../RequestEntities/VirementRequest';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { ClientService } from '../_services/Client.service';
import { HttpClient } from '@angular/common/http';

const numTel = window.sessionStorage.getItem("username");
@Component({
  selector: 'app-virement-form',
  templateUrl: './virement-form.component.html',
  styleUrls: ['./virement-form.component.css'],
})
export class VirementFormComponent {
  
  agent ={
    agentId:0,
    agentPassword:"",
    firstName:"",
    lastName:"",
    emailAddress:"",
    dateOfBirth:"",
    homeAddress:"",
    phoneNumber:"",
    identityCardNumber:"",
    identityJustification:"",
    isFirstLogIn:true,
    patentNumber:"",
    commerceregistrySerialNumber:"",
  };
  virement ={
    ownerphone:numTel, 
    montant:"",
    ribSrc: "",
    ribDest: "",
    state: "",
    date: "",
    cin:"",
  }
  goToRecharge() {
    this.router.navigate(['clientHome/courrier']);
  }
  

  file:File;
  owneruid:string;
  description:string;


  IdentTypes:string[] = ["C.I.N","Passport","Driver License"];
  errorMessage:String;

  constructor(
    private http:HttpClient,
    private clientService :ClientService,
    private router: Router,
    private tokenStorage:TokenStorageService
    ) {
     
   }

  ngOnInit(): void {
 
    
  }

  submitAgentAddForm(form:any){
   
   console.log("wwwwaaaaaaaaaaaaaaadedefrgrgrf");
   console.log(form);

   if(true){
    console.log("wwwwaaaaaaaaaaaaaaade",this.virement.montant);

    this.clientService.saveVirement(
    this.virement.montant,
    this.virement.ribSrc,
    this.virement.ribDest,
    this.virement.state ="En Attente",
    this.virement.date,
    this.virement.ownerphone,
    this.virement.cin
    ).subscribe({
      next: data => {
        console.log("agent saved successfully");
        
        this.owneruid=data.montant;
        console.log(data.ribdest);
        

      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log( "waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",   this.virement.montant );

       
      }
    
    });
    
  }
  setTimeout(() => {
    this.router.navigate(['clientHome/courrier']);
  }, 2000); 
}
}
