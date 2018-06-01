import { LoanReqComponent } from './loan-req/loan-req.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FdAmtReqComponent } from './fd-amt-req/fd-amt-req.component';
import { FdAmtSettleComponent } from './fd-amt-settle/fd-amt-settle.component';
import { BankingComponent } from './banking/banking.component';
import { FixDepComponent } from './fix-dep/fix-dep.component';
import { LoanDueComponent } from './loan-due/loan-due.component';
import { LoanLendingComponent } from './loan-lending/loan-lending.component';
import { ProfileComponent } from './profile/profile.component';
// import { MetamaskComponent } from './metamask/metamask.component'
import { BankguardGuard } from './guard.guard';
// import {BankGuard} from './guard.guard';
import { ReguserGuard } from './reguser.guard';
import { LoanFdGuard } from './loan-fd.guard';



const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate:[BankguardGuard,ReguserGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[ReguserGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[BankguardGuard]
  },
  {
    path: 'banking',
    component: BankingComponent,
    canActivate:[BankguardGuard]
  },
  {
    path: 'loan-request',
    component: LoanReqComponent,
    canActivate:[BankguardGuard]
  },
  {
    path: 'loan-due-pay',
    component:LoanDueComponent,
    canActivate:[BankguardGuard] //,LoanFdGuard
  },
  {
    path: 'loan-lending-detail',
    component:LoanLendingComponent,
    canActivate:[BankguardGuard]
  },
  {
    path: 'fixed-deposit',
    component:FixDepComponent,
    canActivate:[BankguardGuard]
  },
  {
    path: 'fd-amount-request',
    component: FdAmtReqComponent,
    canActivate:[BankguardGuard]
  },
  {
    path: 'fd-amount-settlement',
    component: FdAmtSettleComponent,
    canActivate:[BankguardGuard]
  },
  // {
  //   path:'metamask',
  //   component:MetamaskComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
