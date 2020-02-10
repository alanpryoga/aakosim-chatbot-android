import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { EnvService } from '../env/env.service';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  apiToken: any;

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage
  ) { }

  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + 'login',
      { email: email, password: password }
    ).pipe(
      tap(result => {
        if (result['success']) {
            this.storage.set('api_token', result['token'])
            .then(
              () => {
                console.log('Token Stored');
              },
              error => console.error('Error storing item', error)
            );

          this.apiToken = result['token'];
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }

      }),
    );
  }

  register(name: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'register',
      { name: name, email: email, password: password }
    )
  }

  logout() {
    this.storage.remove('api_token');
    this.isLoggedIn = false;

    delete this.apiToken;
  }

  getUser() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.apiToken
    });

    return this.http.get<User>(this.env.API_URL + 'user', {headers: headers}).pipe(
      tap(user => {
        return user;
      })
    );
  }

  getToken() {
    return this.storage.get('api_token').then((data) => {
        this.apiToken = data;
      
        if (this.apiToken != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }, error => {
        this.apiToken = null;
        this.isLoggedIn = false;
      }
    );
  }
}
