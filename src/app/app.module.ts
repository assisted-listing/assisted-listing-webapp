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
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CheckoutComponent } from './checkout/checkout.component';
import { environment } from 'src/environments/environment';
import {MatMenuModule} from '@angular/material/menu';
import { CartIconComponent } from './header/cart/cart.component';
import {MatBadgeModule} from '@angular/material/badge';
import { HistoryComponent } from './history/history.component';
import { TransactionItemComponent } from './history/transact-item/transact-item.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    IntakeFormComponent,
    CollapsibleFormComponent, 
    LoaderComponent, LandingPageComponent, PaymentFormComponent, HeaderComponent, SidenavComponent, SignUpComponent, SignInComponent, ContactComponent, PricingComponent, CheckoutComponent, CartIconComponent, HistoryComponent, TransactionItemComponent
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
      MatProgressBarModule,
      MatSidenavModule,
      MatToolbarModule,
      MatSlideToggleModule,
      NgxStripeModule.forRoot(environment.stripePK),
      MatMenuModule,
      MatBadgeModule,
      MatCardModule
    

      
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
