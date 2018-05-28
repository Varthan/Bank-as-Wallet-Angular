import { Component, OnInit } from '@angular/core';
import {ContractService} from "../contract.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-viewcus-order',
  templateUrl: './viewcus-order.component.html',
  styleUrls: ['./viewcus-order.component.scss']
})
export class ViewcusOrderComponent implements OnInit {
  public model:{};
  public fix_id:number;

  add : any;
  games : any
  address : string;
  balance : number;
  amount : number;
  fix_dep = [];
  pay_due : any;

  constructor(private cs: ContractService, private spin : NgxSpinnerService, private router:Router) { }


  ngOnInit() {


    // // to check when user have any FD
    // let count = 0;
    // this.cs.my_fix_acc_count().then(game =>{
    //   game.forEach(item => {
    //     this.cs.my_fix_dep_id(item).then(add =>{
    //       this.cs.fix_dep_detail(add).then(obj => 
    //       {
    //         if(obj[6]){
    //           count++;
    //           console.log(count);
    //         }
           
    //       });
    //     })
    //   });
    // })

    // alert(count)

    // if (count == 0)
    // {
    //   alert("You have not Deposit to any bank");
    //   this.router.navigate(["profile"]);
    // }
    // // ------------------------------------------



    this.cs.basicfunctions();
    
    this.cs.my_fix_acc_count().then(game =>{
      game.forEach(item => {
        this.cs.my_fix_dep_id(item).then(add =>{
          this.cs.fix_dep_detail(add).then(obj => 
          {
            if(obj[6])
            this.fix_dep.push({"id":add,"bank_add":obj[1],"amt":obj[3]+" Ξ","End_time":obj[4],"year":obj[5],"status":"Not Settled"})
          });
        })
      });
    })
  }

  submit(){
    this.spin.show();

    let meta = this.cs;
    meta.fduser(this.fix_id).then((res)=>{
      
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
