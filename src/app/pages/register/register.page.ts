import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerData = { email: '', password: '' };  // Correction ici

  constructor(private router: Router) {}

  ngOnInit() {
    // Retirer la redirection ou ajouter une condition si nécessaire
    // this.router.navigate(['/login']); 
  }

  register() {
    // Implémentez la logique d'inscription ici
    console.log(this.registerData);
    // Redirection après inscription réussie
    // this.router.navigate(['/some-other-page']);
  }
}
