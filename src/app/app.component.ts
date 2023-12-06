import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderComponent } from './services/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'assisted-listing';
}
