import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ContractService } from './contract.service';
import { ProfileComponent } from './profile/profile.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BankguardGuard} from './guard.guard';
// import {BankGuard} from './guard.guard';
import {ReguserGuard} from './reguser.guard';
import { LoanFdGuard } from './loan-fd.guard';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { BankingComponent } from './banking/banking.component';
import { LoanReqComponent } from './loan-req/loan-req.component';
import { LoanDueComponent } from './loan-due/loan-due.component';
import { LoanLendingComponent } from './loan-lending/loan-lending.component';
import { FixDepComponent } from './fix-dep/fix-dep.component';
import { FdAmtReqComponent } from './fd-amt-req/fd-amt-req.component';
import { FdAmtSettleComponent } from './fd-amt-settle/fd-amt-settle.component';

// const appRoutes: Routes = [
//   { path: 'register', component: ProductComponent },
//   { path: 'profile', component: ProfileComponent },
//   { path: 'bankprocess', component: WithdrawComponent },
//   { path: 'loanrequest', component: UpdateproductComponent },
//   { path: 'loanpay', component: LoanpayComponent },
//   { path: 'lendingdetail', component: LendingdetailComponent },
//   { path: 'fixeddeposit', component: FixeddepositComponent },
//   { path: 'fdamountrequest', component: ViewcusOrderComponent },
//   { path: 'fdownersettlement', component: StockproductComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterComponent,
    BankingComponent,
    LoanReqComponent,
    LoanDueComponent,
    LoanLendingComponent,
    FixDepComponent,
    FdAmtReqComponent,
    FdAmtSettleComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MDBBootstrapModule.forRoot(),
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true } // <-- debugging purposes only
    // )
  ],

  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ContractService,BankguardGuard,ReguserGuard,LoanFdGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
