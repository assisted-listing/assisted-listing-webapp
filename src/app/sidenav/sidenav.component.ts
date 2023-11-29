import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private authService: AuthService) {}
  @Output() sidenavClose = new EventEmitter();

  public onSideNavClose(){
    this.sidenavClose.emit()
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  logout(){
    this.authService.onLogout()
    this.onSideNavClose()
  }

  openCustomerPortal(){
  window.open('https://billing.stripe.com/p/login/test_4gwcQd4TF8qPdVueUU', '_blank')
}

}
