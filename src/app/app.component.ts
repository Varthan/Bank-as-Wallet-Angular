import { Component, OnInit } from '@angular/core';
import { ContractService } from './contract.service';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
declare let window: any;
import * as Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'app';

  public balance;
public address;


public  _web3: any;
public id1: any;
public id2;
public account;
 constructor(private take:ContractService,private router:Router)
 {
   take.getUserBalance().then(balance => this.balance = balance);
   take.getAccount().then(address=>this.address=address);
 }
 

//  ngOnInit()
//  {
//      let meta = this;
   
//      meta.take.getUserBalance().then(balance => meta.balance = balance);
//      meta.take.getAccount().then(acc => {
//          this.account = acc;
//          meta.id1 = setInterval(function() {
//           if (typeof window.web3 !== 'undefined') {
//               meta._web3 = new Web3(window.web3.currentProvider);
//               if (meta._web3.eth.accounts[0] !== meta.account) {
//                   meta.account = meta._web3.eth.accounts[0];
//                   if (meta._web3.eth.accounts[0] === undefined) {
//                       meta.router.navigate(['metamask']);
//                       clearInterval(this.interval);
//                   } else
//                   {
//                    window.location.reload(true);
//                   }
//               }
//           } else
//           {
//               meta.router.navigate(['metamask']);
//           }
//          }, 200);
//       });

//       meta.id2 = setInterval(function()
//       {
//        meta.take.getUserBalance().then(balance => this.balance = balance);
//        //meta.alltablework();
//      }, 20000);
//  }

//  ngOnDestroy()
//  {
//    if (this.id1)
//    {
//      clearInterval(this.id1);
//    }
//    if (this.id2)
//    {
//        clearInterval(this.id2);
//    }
//  }
} 
