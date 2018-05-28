import { Component, OnInit } from '@angular/core';
import {ContractService} from "../contract.service";
import { NgxSpinnerService } from 'ngx-spinner';
       
@Component({
  selector: 'app-fixeddeposit',
  templateUrl: './fixeddeposit.component.html',
  styleUrls: ['./fixeddeposit.component.scss']
})
export class FixeddepositComponent implements OnInit {

  public model:{};
  public bankaddress:string;
  public depositamount:number;
  public periodinyrs:number;

  add : any;
  address : string;
  balance : number;
  amount : number;
  All_bank1 = [];


  constructor(private cs: ContractService, private spin : NgxSpinnerService) { }


  ngOnInit() {
    this.cs.basicfunctions();

    this.cs.getAccount().then(address => this.address = address)
    this.cs.getUserBalance().then(balance => this.balance = balance)
    this.cs.bank_count().then(game =>{
    
      game.forEach(item => {
        this.cs.bank_address(item).then(add =>{
          if (add != this.address)
          this.cs.bank_detail(add).then(obj => 
          {
            this.All_bank1.push({"address":add,"bank_name":obj[0],"Bal":obj[1]+" Ξ","Fix_dep_int":obj[4]+" %"})
          });
        })
      });
    })
  }

  submit(){
    this.spin.show();
    let meta = this.cs;
    meta.isregister().then(result =>{
     if(result == true)
     meta.fixeddeposit(this.bankaddress,this.depositamount,this.periodinyrs).then((res)=>{
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
    
    else
      alert("You have not Register");

   })
  }
  
}