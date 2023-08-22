import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";


@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  isLoading = new Subject<boolean>();

  constructor(private spinner: NgxSpinnerService) {}

  show() {
     this.isLoading.next(true);
     this.spinner.show();

  }

  hide() {
     this.isLoading.next(false);
     this.spinner.hide();

  }
}