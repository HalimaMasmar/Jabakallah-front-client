import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PayerRechargeRequest } from '../RequestEntities/PayerRechargeRequest';
import { ClientService } from '../_services/Client.service';

const numTelAccess = window.sessionStorage.getItem("username");
@Component({
  selector: 'app-recharge-form-valider',
  templateUrl: './recharge-form-valider.component.html',
  styleUrls: ['./recharge-form-valider.component.css'],
})
export class RechargeFormValiderComponent implements OnInit {
  numTel=numTelAccess;
  title = 'Paiment de facture';
  title1 = 'Paiement par reference';
  title2 = 'Selectioner pour payer';
  imageTitle = 'PAIMENT DE FACTURES  RECHARGES';
  Creancier = 'Creancier';
  Creance = 'Creance';
  Donnateur = 'Donnateur';
  soutitle1 = 'ALCS';
  soutitle2 = 'SIDACTION';
  soutitle3 = 'ANAS';
  img: string;

  payerRechargeRequest:PayerRechargeRequest={
    value: 0.0,
    ownerphone:numTelAccess,  
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private clientService :ClientService) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.img = this.router.getCurrentNavigation().extras.state.img;
      }
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const data = JSON.parse(params['data']);
      this.payerRechargeRequest.value = data.pass;
      this.img = data.img;
      console.log('Valeur de "pass" :', this.payerRechargeRequest.value);
      // Utilisez la valeur de "pass" comme nécessaire dans votre composant
    });
  }

  payerRechargeClicked(){

    this.clientService.payerRecharge(this.payerRechargeRequest).subscribe({
      next: data => {
        this.router.navigate(['clientHome/recharge']);
      },
      error: err => {
        console.log(err);
      }
    }); 
  }

  goToRecharge() {
    this.router.navigate(['courrier']);
  }
}
