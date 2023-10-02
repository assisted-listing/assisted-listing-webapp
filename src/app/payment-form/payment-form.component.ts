import { Component } from '@angular/core';
import { StripeService } from '../services/stripe-service.service';

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
      key: 'pk_test_51NiOkfAtI9Pqdjf04d6aecxeZPJw8JYlLhucHL4dVmepdHVPvsC0Y8LrtvQ3JMWxOrahvh4y0NKYu5iV80g330As00xnYNOdDM',
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
          key: 'pk_test_51NiOkfAtI9Pqdjf04d6aecxeZPJw8JYlLhucHL4dVmepdHVPvsC0Y8LrtvQ3JMWxOrahvh4y0NKYu5iV80g330As00xnYNOdDM',
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