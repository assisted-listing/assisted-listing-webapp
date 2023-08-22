// loader.component.ts

import { Component } from '@angular/core';
import { LoaderService } from './loading.service';
import { Subject } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: [ './loader.component.scss' ],
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {
  }
}
