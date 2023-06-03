import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recharge-form',
  templateUrl: './recharge-form.component.html',
  styleUrls: ['./recharge-form.component.css'],
})
export class RechargeFormComponent implements OnInit {
  title = 'Effectuer un paiement';
  imageTitle = 'PAIMENT DE FACTURE RECHARGES';
  tel: string;
  img: string;
  pass: number;

  onSelectPass(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = parseInt(target.value, 10);
    this.pass = selectedValue;
    console.log("valueeee",selectedValue);
    console.log("paaas",this.pass);
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.img = this.router.getCurrentNavigation().extras.state.img;
      }
    });
  }

  ngOnInit() {
    console.log('creeeeeeeeeeeeeeeeesi: ', this.img);
    // Use the img value in your component as needed
  }
  formValider() {
    const data = {
      img: this.img,
      pass: this.pass
    };
    
    // Encodez les données dans une chaîne de requête pour les transmettre via l'URL
    const queryParams = {
      data: JSON.stringify(data)
    };
  
    // Utilisez la méthode navigate() du service Router pour passer les données à un autre composant
    this.router.navigate(['clientHome/recharge/form/valider'], { queryParams: queryParams });
  }
  goToRecharge() {
    this.router.navigate(['clientHome/recharge']);
  }
}
