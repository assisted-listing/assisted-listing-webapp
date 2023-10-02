import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() public sidenavToggle= new EventEmitter()

  onToggleSideNav = () => {
    this.sidenavToggle.emit()
  }

}