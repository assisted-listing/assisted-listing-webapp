import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent {
  fullMessage: string;
  partialMessage: string;
  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state){
    const state = navigation?.extras.state as {
      source: string,
      message: string,
    }
    this.fullMessage = state.message;
    this.partialMessage = state.message.split('.', 2)[0] + '.' + state.message.split('.', 3)[1] + '.'
  }
  else
  {
    this.fullMessage = "Better Luck Next Time";
    this.partialMessage = "Results will be displayed here normally"
  }

}


  ngOnInit() {
      const navigation = this.router.getCurrentNavigation();
  }

}
