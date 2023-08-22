import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntakeFormComponent } from './intake-form/intake-form.component';

const routes: Routes = [{path: '', component: IntakeFormComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
