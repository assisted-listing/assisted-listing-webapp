import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Checkout } from '../models/checkout';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private checkoutArraySubject: BehaviorSubject<Checkout[]>;

  constructor() {
    this.checkoutArraySubject = new BehaviorSubject<Checkout[]>(this.retrieveCheckoutArray());
  }

  getCheckoutArrayObservable() {
    return this.checkoutArraySubject.asObservable();
  }

  private retrieveCheckoutArray(): Checkout[] {
    const storedCheckoutArray = localStorage.getItem('checkout_array');
    return storedCheckoutArray ? JSON.parse(storedCheckoutArray) : [];
  }

  private updateCheckoutArray(checkoutArray: Checkout[]): void {
    if (checkoutArray){
    localStorage.setItem('checkout_array', JSON.stringify(checkoutArray));
    this.checkoutArraySubject.next(checkoutArray);
    }
  }

  addCheckoutItem(newCheckout: Checkout): void {
    const checkoutArray = this.retrieveCheckoutArray();
    if (checkoutArray.every(checkout => checkout.checkoutID !== newCheckout.checkoutID)){
      checkoutArray.push(newCheckout);
    }
    else {
      const indexOfCheckoutToReplace = checkoutArray.findIndex(checkout => checkout.checkoutID === newCheckout.checkoutID);
      checkoutArray[indexOfCheckoutToReplace] = newCheckout
      checkoutArray.push(newCheckout);


    }
    this.updateCheckoutArray(checkoutArray);
  }

  removeCheckoutItem(checkoutIDToRemove: string): void {
    const checkoutArray = this.retrieveCheckoutArray();
    const indexOfCheckoutToRemove = checkoutArray.findIndex(
      checkout => checkout.checkoutID === checkoutIDToRemove
    );

    if (indexOfCheckoutToRemove !== -1) {
      checkoutArray.splice(indexOfCheckoutToRemove, 1);
      this.updateCheckoutArray(checkoutArray);
    }
  }

  // Other methods to update, delete, or manipulate the checkout array
}