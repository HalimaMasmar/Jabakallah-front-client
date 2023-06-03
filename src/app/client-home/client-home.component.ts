import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  constructor(private tokenStorage:TokenStorageService,private router: Router) { }

  ngOnInit() {
    if(this.tokenStorage.getToken()==null){
      this.router.navigate(['/login']); 
    }
  }

}
