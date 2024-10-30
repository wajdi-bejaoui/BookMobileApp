import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth'; // Correct import for Firebase Auth
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  async signUp(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async logout() {
    await this.afAuth.signOut();
  }

  async getProfile(){
    return new Promise<any | null >((resolve,reject)=>{
  this.afAuth.onAuthStateChanged((user)=>{
    if(user){
      resolve(user)
    }else{
      reject(null)
    }
  },reject)
    })
  }

  // New method to check if the user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }
}
