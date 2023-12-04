import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

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
  window.open(environment.stripeModificationURL, '_blank')
}

}
