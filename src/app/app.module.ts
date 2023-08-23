import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntakeFormComponent } from './intake-form/intake-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { CollapsibleFormComponent } from './intake-form/collapsible-form/collapsible-form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderInterceptor } from './services/loader/loader.interceptor';
import { LoaderComponent } from './services/loader/loader.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    AppComponent,
    IntakeFormComponent,
    CollapsibleFormComponent, 
    LoaderComponent, LandingPageComponent, ResultPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      MatButtonModule,
      MatExpansionModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      BrowserAnimationsModule,
      MatListModule,
      MatSelectModule,
      MatCheckboxModule,
      FormsModule,
      HttpClientModule,
      NgxSpinnerModule,
      MatProgressBarModule
  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: LoaderInterceptor,
       multi: true,
    },
 ],
 schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
