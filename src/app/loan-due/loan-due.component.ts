import { Component, OnInit } from '@angular/core';
import {ContractService} from "../contract.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-due',
  templateUrl: './loan-due.component.html',
  styleUrls: ['./loan-due.component.scss']
})
export class LoanDueComponent implements OnInit {

  angForm: FormGroup;
  add : any;
  games : any
  address : string;
  balance : number;
  amount : number;
  Loan_get = [];
  pay_due : any;

  constructor(private cs: ContractService, private spin : NgxSpinnerService, private router:Router, private fb: FormBuilder) {
    this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      ln_id: ['', Validators.required ],
    });
  }

  ngOnInit() {


    // // to check when user get any loan
    //   let count = 0;
    //   this.cs.loan_get_count().then(game =>{
    
    //     game.forEach(item => {
    //       this.cs.get_loan_id(item).then(add =>{
    //         this.cs.loan_detail(add).then(obj => 
    //         {
    //           if(parseInt(obj[5]) < parseInt(obj[7]))
    //           count++;
    //         });
    //       })
    //     });
    //   })

    //   if (count == 0)
    //   {
    //     alert("You have not borrow any loan");
    //     this.router.navigate(["profile"]);
    //   }
      



    this.cs.basicfunctions();

    this.cs.loan_get_count().then(game =>{
    
      game.forEach(item => {
        this.cs.get_loan_id(item).then(add =>{
          this.cs.loan_detail(add).then(obj => 
          {
            if(parseInt(obj[5]) < parseInt(obj[7]))
            this.Loan_get.push({"id":add,"lender_add":obj[1],"amt":obj[4]+" Ξ","settlement":obj[5],"next_settle_time":obj[6],"month":obj[7],"bal_loan":obj[8]+" Ξ","current_inst":obj[11]+" Ξ"})
          });
        })
      });
    })

  }


  submit(){

    this.spin.show();
    let meta = this.cs;
    
    meta.pay_due(this.pay_due).then((res)=>{
      console.log("Hash :"+res);
      if(res === 0)
        {  
          this.spin.hide();
        }
        else
        meta.hash(res).then((result) => 
        {
          console.log("result : "+ result );  
          this.spin.hide();
        })
    
    });
  }

}
