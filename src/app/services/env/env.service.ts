import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://aakosim-chatbot-webapi.herokuapp.com/public/api/';

  constructor() { }
}
