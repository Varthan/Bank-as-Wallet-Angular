import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
declare let window: any;
import * as Web3 from 'web3';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-metamask',
  templateUrl: './metamask.component.html',
  styleUrls: ['./metamask.component.scss']
})
export class MetamaskComponent implements OnInit {

  public  _web3: any;
 public id1: any;

 constructor(private wcs:ContractService, private router: Router) {  }

 ngOnInit() {
   let meta = this;
   this.id1 = setInterval(function() {
     if (typeof window.web3 !== 'undefined') {
       meta._web3 = new Web3(window.web3.currentProvider);
       if (meta._web3.eth.accounts[0] !== undefined) {
         meta.router.navigate(['']);
       }
     }
   }, 200);
 }

 ngOnDestroy() {
   if (this.id1) {
     clearInterval(this.id1);
   }
 }

}
