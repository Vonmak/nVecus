import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomerGuard } from './guards/customer.guard';
import { VendorGuard } from './guards/vendor.guard';

const routes: Routes = [

  {path: 'signup', component:SignupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'customer', component:CustomerComponent, canActivate: [AuthGuard,CustomerGuard]},
  {path: 'vendor', component:VendorComponent, canActivate: [AuthGuard,VendorGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
