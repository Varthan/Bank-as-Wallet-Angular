import { StockproductComponent } from './fdownersettlement/stockproduct.component';
import { UpdateproductComponent } from './loanrequest/updateproduct.component';
import { ProductComponent } from './Register/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewcusOrderComponent } from './fduserrequest/viewcus-order.component';
import { WithdrawComponent } from './bankprocess/withdraw.component';
import { FixeddepositComponent } from './fixeddeposit/fixeddeposit.component';
import { LoanpayComponent } from './loanpay/loanpay.component';
import { LendingdetailComponent } from './lendingdetail/lendingdetail.component';
import { ProfileComponent } from './profile/profile.component';
import { MetamaskComponent } from './metamask/metamask.component'
import { BankguardGuard } from './guard.guard';
// import {BankGuard} from './guard.guard';
import { ReguserGuard } from './reguser.guard';
import { LoanFdGuard } from './loan-fd.guard';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[BankguardGuard,ReguserGuard]
  },
  {
    path: 'register',
    component: ProductComponent,
    canActivate:[ReguserGuard]
  },
  {
    path: 'loanrequest',
    component: UpdateproductComponent,
    canActivate:[BankguardGuard]
  },
  {
    path: 'fdamountrequest',
    component: ViewcusOrderComponent,
    canActivate:[BankguardGuard]
  },
  {
    path: 'fdownersettlement',
    component: StockproductComponent,
    canActivate:[BankguardGuard]
  },

  {
    path: 'bankprocess',
    component: WithdrawComponent,
    canActivate:[BankguardGuard]
  },
  {
    path: 'fixeddeposit',
    component:FixeddepositComponent,
    canActivate:[BankguardGuard]
  },
  {
    path: 'loanpay',
    component:LoanpayComponent,
    canActivate:[BankguardGuard] //,LoanFdGuard
  },
  {
    path: 'lendingdetail',
    component:LendingdetailComponent,
    canActivate:[BankguardGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
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
