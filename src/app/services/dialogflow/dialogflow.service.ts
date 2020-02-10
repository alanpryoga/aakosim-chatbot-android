import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  private BASE_URL: string = "https://api.dialogflow.com/v1/";

  private CLIENT_ACCESS_TOKEN: string = "b420228cc17741c29eff655b8d4cad4c";

  constructor(
    private httpClient: HttpClient
  ) { }

  query(query: string, sessionId: string) {
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.CLIENT_ACCESS_TOKEN
    });

    var body = {
      "lang": "en",
      "query": query,
      "sessionId": sessionId,
      "timezone": "Asia/Jakarta"
    };

    return this.httpClient.post(this.BASE_URL + 'query?v=20150910', body, {headers: headers});
  }
}
