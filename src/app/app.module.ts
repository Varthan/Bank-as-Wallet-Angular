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
    NgxSpinnerModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ContractService,BankguardGuard,ReguserGuard,LoanFdGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
