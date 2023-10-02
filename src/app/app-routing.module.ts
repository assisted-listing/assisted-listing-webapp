import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntakeFormComponent } from './intake-form/intake-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuard } from './auth/auth-guard.guard';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent },
{path: 'generate', component: IntakeFormComponent},
{path: 'payTest', component: PaymentFormComponent },
{path: 'pricing', component: PricingComponent },
{path: 'contact', component: ContactComponent },
{path: 'login', component: SignInComponent, canActivate: [AuthGuard] },
{path: 'register', component: SignUpComponent, canActivate: [AuthGuard], },
{path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
{path: 'checkout/success', component: ContactComponent, canActivate: [AuthGuard]},
{path: 'checkout/failure', component: PricingComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
