import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Checkout } from '../models/checkout';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User, UserDtl } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class AlBackendService {
  private apiUrl = 'https://zy0ottwud8.execute-api.us-east-1.amazonaws.com/';
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Headers': 'Content-Type',
  })

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCheckout(ID: string) {

    return this.http.get(this.apiUrl + 'checkout?checkoutID=' + ID, { headers: this.headers })
    .pipe<Checkout>(map((data: any) => data));
  }

  getSubscriptionStatus(email: string) {


    return this.http.get(this.apiUrl + 'checkout?checkoutID=' + email, { headers: this.headers })
    .pipe<Checkout>(map((data: any) => data));
  }

  createListing(prompt: String){
    const userAttr: User = this.authService.getUserAttributes()
    const body = {'user': userAttr.email,'prompt':prompt}
    return this.http.post(this.apiUrl + 'checkout', { headers: this.headers, body: body }, )
    .pipe<Checkout>(map((data: any) => data));
  }

  claimListing(checkoutID: String){
    const userAttr: User = this.authService.getUserAttributes()
    const body = {'email': userAttr.email,'checkoutID':checkoutID}
    return this.http.put(this.apiUrl + 'checkout', { headers: this.headers, body: body}, )
    .pipe<Checkout>(map((data: any) => data));

  }

  createUserDynamo(email: string, sub: string){
    const body = {'email': email,'subID':sub}
    return this.http.post(this.apiUrl + 'user', { headers: this.headers, body: body }, )
    .pipe<Checkout>(map((data: any) => data));
  }

  getUserDynamo(email: string) {
    const body = {'email': email}
    return this.http.get(this.apiUrl + 'user?userID='+ email, { headers: this.headers }, )
    .pipe<UserDtl>(map((data: any) => data));
  }
}
