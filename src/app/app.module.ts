import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './Register/product.component';
import { UpdateproductComponent } from './loanrequest/updateproduct.component';
import { ViewcusOrderComponent } from './fduserrequest/viewcus-order.component';
import { StockproductComponent } from './fdownersettlement/stockproduct.component';
import { WithdrawComponent } from './bankprocess/withdraw.component';
import { ContractService } from './contract.service';
import { FixeddepositComponent } from './fixeddeposit/fixeddeposit.component';
import { LoanpayComponent } from './loanpay/loanpay.component';
import { LendingdetailComponent } from './lendingdetail/lendingdetail.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BankguardGuard} from './guard.guard';
// import {BankGuard} from './guard.guard';
import {ReguserGuard} from './reguser.guard';
import { MetamaskComponent } from './metamask/metamask.component';
import { LoanFdGuard } from './loan-fd.guard';
import { RouterModule, Routes } from '@angular/router';

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
    HomeComponent,
    ProductComponent,
    UpdateproductComponent,
    ViewcusOrderComponent,
    StockproductComponent,
    WithdrawComponent,
    FixeddepositComponent,
    LoanpayComponent,
    LendingdetailComponent,
    ProfileComponent,
    MetamaskComponent,
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
