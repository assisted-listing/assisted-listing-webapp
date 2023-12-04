import { Component } from '@angular/core';
import { Checkout } from '../models/checkout';
import { AlBackendService } from '../services/al-backend.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  transactions: Checkout[] = []
  email: string
  constructor(private albackendService: AlBackendService, private authService: AuthService){}

  ngOnInit(){
    this.email = this.authService.getUserAttributes().email

    this.albackendService.getCheckoutsForUser(this.email).subscribe((res: any) => {
      console.log(res)
      this.transactions = res

    })
  }

}
 