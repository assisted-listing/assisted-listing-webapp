import { Component } from '@angular/core';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import { AuthService } from '../auth/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserDtl } from '../models/user';
import { AlBackendService } from '../services/al-backend.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  constructor(private authService: AuthService, private router: Router, private backendService: AlBackendService) {const currentNav = this.router.getCurrentNavigation()
    const state = currentNav?.extras.state as {
      redirect: string[]
    }
    console.log(state)

    if (state && 'redirect' in state){
      this.redirect = state.redirect
      console.log('redirect Received')
    } }


  checked: boolean = false;
  stripePromise = loadStripe(environment.stripePK);
  redirect: string[] = []
  loggedIn: boolean
  user: UserDtl
  email: string

  ngOnInit(){
    this.loggedIn = this.authService.isLoggedIn()

    if (this.loggedIn){
      this.email = this.authService.getUserAttributes().email
       this.backendService.getUserDynamo(this.email).subscribe((res: any) => {
        this.user = res
      })
    
    }
  }

  purchasePlan (price: string) {
    if (this.loggedIn){
      if (this.user.subscribedFlag){
        window.open(environment.stripeModificationURL, '_blank')
      }
      else{
        this.checkout(price)
        return
      }
    }
    else {
      this.redirect.push('pricing')
      const navigationExtras: NavigationExtras = {
        state: {
          redirect: this.redirect
        }
      }
      this.router.navigate(['\login'], navigationExtras)
    }
  }

  async checkout(plantype: string='basic') {
    const stripe = await this.stripePromise;
    var price = ''
    if (plantype === 'basic'){
      price = environment.stripeAgentBasic
    }
    else {
      price = environment.stripeAgentPlus
    }

    const { error } = await stripe?.redirectToCheckout({
      mode: "subscription",
      lineItems: [{
        price: price, // Replace with the ID of your price
        quantity: 1,
      }],
      successUrl: `${window.location.origin}/${this.redirect.pop()}`,
      cancelUrl: `${window.location.origin}/${this.redirect.pop()}`,
      customerEmail: this.authService.getUserAttributes().email
    })!
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log(error);
    }
  }

}
