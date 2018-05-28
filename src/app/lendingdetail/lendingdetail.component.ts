import { Component, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {ContractService} from "../contract.service";

@Component({
  selector: 'app-lendingdetail',
  templateUrl: './lendingdetail.component.html',
  styleUrls: ['./lendingdetail.component.scss']
})
export class LendingdetailComponent implements OnInit {

  add : any;
  address : string;
  balance : number;
  amount : number;
  Loan_pro = [];


  constructor(private cs: ContractService, private router:Router) { }


  ngOnInit() {


    // // to check when user lend any loan
    // let count = 0;
    // this.cs.loan_pro_count().then(game =>{
    
    //   game.forEach(item => {
    //     this.cs.pro_loan_id(item).then(add =>{
    //       this.cs.loan_detail(add).then(obj => 
    //       {
    //         if(parseInt(obj[5]) < parseInt(obj[7]))
    //         count++;
    //       });
    //     })
    //   });
    // })

    // if (count == 0)
    // {
    //   alert("You have not Lend any loan");
    //   this.router.navigate(["profile"]);
    // }
    // // ------------------------------------------



    this.cs.basicfunctions();

    this.cs.loan_pro_count().then(game =>{
    
      game.forEach(item => {
        this.cs.pro_loan_id(item).then(add =>{
          this.cs.loan_detail(add).then(obj => 
          {
            if(parseInt(obj[5]) < parseInt(obj[7]))
            this.Loan_pro.push({"id":add,"borrower_add":obj[2],"token_add":obj[3],"amt":obj[4]+" Ξ","settlement":obj[5],"next_settle_time":obj[6],"month":obj[7],"bal_loan":obj[8]+" Ξ","current_inst":obj[9]+" Ξ"})
          });
        })
      });
    })

  }
}
