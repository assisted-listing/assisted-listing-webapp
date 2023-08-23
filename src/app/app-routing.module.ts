import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntakeFormComponent } from './intake-form/intake-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ResultPageComponent } from './result-page/result-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent },
{path: 'generate', component: IntakeFormComponent},
{path: 'resTest', component: ResultPageComponent },
{path: 'result', component: ResultPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
