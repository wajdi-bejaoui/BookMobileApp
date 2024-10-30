import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerData = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async register() {
    try {
      const user = await this.authService.signUp(this.registerData.email, this.registerData.password);
      console.log('User registered:', user);

      // Show success message
      const toast = await this.toastController.create({
        message: 'Registration successful!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      // Redirect to login page after toast is shown
      toast.onDidDismiss().then(() => {
        this.router.navigate(['/login']);
      });
    } catch (error) {
      console.error('Registration failed:', error);

      // Show error message
      const toast = await this.toastController.create({
        message: 'Registration failed. Please try again.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  ngOnInit() {
    // Optional redirection condition, if needed
  }
}
