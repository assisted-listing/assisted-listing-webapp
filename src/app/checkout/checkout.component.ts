import { Component } from '@angular/core';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import { AlBackendService } from '../services/al-backend.service';
import { Checkout } from '../models/checkout';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User, UserDtl } from '../models/user';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})



export class CheckoutComponent {

  stripePromise = loadStripe(environment.stripePK);
  checkoutID: string
  check: Checkout
  partialMessage: string
  loggedin: Boolean
  user: UserDtl
  email: string
  subscribed: boolean = this.isSubscribed()


  constructor(private backendService: AlBackendService, private authService: AuthService, private route: ActivatedRoute, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(){
    this.checkoutID = this.route.snapshot.queryParamMap.get('checkoutID')!;

    console.log('ID')
    console.log(this.checkoutID)
    if (this?.checkoutID == null ){this.checkoutID = '12345678'}

    this.backendService.getCheckout(this.checkoutID).subscribe((res: any) => {
      console.log(res)
      this.check = res
      if (!this.check.paid){this.localStorageService.addCheckoutItem(this.check)}

      this.partialMessage = this.check.listing.split('. ', 2)[0] + '.' + this.check.listing.split('. ', 3)[1] + '.'
    })

    this.loggedin = this.authService.isLoggedIn()
    if (this.loggedin){
    this.email = this.authService.getUserAttributes().email
     this.backendService.getUserDynamo(this.email).subscribe((res: any) => {
      this.user = res
    })
    
  }
  }

  isSubscribed(){
    if (this.user === undefined){
      return false
    }
    if (!this.user.subscribedFlag){
      return false
    }
    return true
  }

  navigateToSubscription(){
    if (this.loggedin){
    const navigationExtras: NavigationExtras = {
      state: {
        redirect: ['checkout?checkoutID=' + this.checkoutID]
      }
    }
    this.router.navigate(['\pricing'], navigationExtras)
    
  }
  else {
    const navigationExtras: NavigationExtras = {
      state: {
        redirect: ['checkout?checkoutID=' + this.checkoutID]
      }
    }
    this.router.navigate(['\login'], navigationExtras)
  }

  }

  claimListing(){
    this.backendService.claimListing(this.checkoutID).subscribe((res: Checkout) => {
      this.check = res
      if (!this.check.paid){this.localStorageService.addCheckoutItem(this.check)}
      this.partialMessage = res.listing
    })
  }
  

  
}
