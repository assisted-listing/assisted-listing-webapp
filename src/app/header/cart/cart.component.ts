import { Component, OnInit, HostListener  } from '@angular/core';
import { Checkout } from 'src/app/models/checkout';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartIconComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private localStorageService: LocalStorageService){}

  cartItems: Checkout[] = []; // Your cart items array
  cartItemsCount: number = 0; // Initialize with the count from session or cart items length
isAuth = this.authService.isLoggedIn()

  ngOnInit(): void {

    this.localStorageService.getCheckoutArrayObservable().subscribe(Items => {
      console.log(Items)
      if (Items){

      this.cartItems = Items.filter(item => !item.paid);
  
      this.cartItemsCount = this.cartItems.length
      }
      else {
        this.cartItems = [];
        this.cartItemsCount = this.cartItems.length
      }
    });

    // Initialize cartItems and cartItemsCount from session or service
    // For example:
    // this.cartItems = this.cartService.getCartItems();
    // this.cartItemsCount = this.cartItems.length;


  }

  onMenuClosed() {

  }

  goCheckout(item: Checkout){
    const navigationExtras: NavigationExtras = {
      queryParams: { checkoutID : item.checkoutID },
    }
    this.router.navigate(['/checkout'], navigationExtras)
  }

  removeCheckout(item: Checkout){
    this.localStorageService.removeCheckoutItem(item.checkoutID)
  }
}
