import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData = { email: '', password: '' };
  ngOnInit() {
  }


  goToRegister() {
    // this.registerUser()
    this.router.navigate(['/register']);
  }

  constructor(private authService: AuthService, private router: Router) {}

  
  async login() {
    try {
      const user = await this.authService.login(this.loginData.email, this.loginData.password);
      console.log('User logged in:', user);
      this.router.navigate(['/home']);

    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async logoutUser() {
    await this.authService.logout();
    console.log('User logged out');
  }

}
