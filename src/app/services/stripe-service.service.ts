import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private apiUrl = 'https://api.stripe.com/v1/';

  constructor(private http: HttpClient) {}

  chargeUser(amount: number, token: any, email: string = 'mikea0009@gmail.com', currency: string = 'USD') {
    
    const headersDict = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer sk_test_51NiOkfAtI9Pqdjf0C4VqgTcGM0nj95FSQbFpNvxZZwEIvxnZFTLhoLhtg0SugrEg4xpz9IaBT6rrPpeaHCadboby000xesxrGS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    const headers = new HttpHeaders(headersDict)
    const body = {
      "amount": amount,
      "currency": currency,
      "receipt_email": email,
      "confirm": true,
      "source": token['id']

  }
    return this.http.post(this.apiUrl + 'payment_intents', body, { headers: headers });
  }
}