import { Component } from '@angular/core';
import { StripeService } from '../services/stripe-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent {
  paymentHandler: any = null;
  constructor(private stripeService: StripeService) { }
  ngOnInit() {
    this.invokeStripe();
  }

  chargeUser(stripeToken: any) {
    this.stripeService.chargeUser(4.99, stripeToken).subscribe((res: any) => {
      console.log(res)
    })
  }
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: environment.stripePK,
      locale: 'auto',
      

      token: (stripeToken: any) => {
        console.log(stripeToken)
        this.chargeUser(stripeToken);
      }
    });
    paymentHandler.open({
      name: 'Assisted Listing',
      description: 'One time listing description purchase',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: environment.stripePK,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}