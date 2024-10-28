import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData = { email: '', password: '' };
  constructor(private router: Router) { }

  ngOnInit() {
  }
  login() {
    // Logique d'authentification ici (ex. appel à un service)
    // Si l'authentification réussit :
    this.router.navigate(['/home']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
