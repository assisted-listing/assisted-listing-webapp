import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Checkout } from 'src/app/models/checkout';

@Component({
  selector: 'app-transact-item',
  templateUrl: './transact-item.component.html',
  styleUrls: ['./transact-item.component.scss']
})
export class TransactionItemComponent {
  constructor(private router: Router){}
  @Input() transaction: Checkout; // Define the input property to receive transaction data
  shortListing: string;

  ngOnInit(){
    console.log(this.transaction)
    const splitListing = this.transaction.listing.split('.')
    this.shortListing = splitListing[0] + '.' + splitListing[1]+'...'
  }

  onNavigateToTransaction(transactionId: string) {
    console.log(transactionId)
    const navigationExtras: NavigationExtras = {
      queryParams: { checkoutID : transactionId },

    }
    this.router.navigate(['checkout'], navigationExtras)  }
}
