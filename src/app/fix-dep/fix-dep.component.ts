import { Component, OnInit } from '@angular/core';
import {ContractService} from "../contract.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
       
@Component({
  selector: 'app-fix-dep',
  templateUrl: './fix-dep.component.html',
  styleUrls: ['./fix-dep.component.scss']
})
export class FixDepComponent implements OnInit {

  angForm: FormGroup;
  public model:{};
  public bankaddress:string;
  public depositamount:number;
  public periodinyrs:number;

  add : any;
  address : string;
  balance : number;
  amount : number;
  All_bank1 = [];


  constructor(private cs: ContractService, private spin : NgxSpinnerService, private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      bankaddress: ['', Validators.required ],
      depositamount: ['', Validators.required ],
      periodinyrs: ['', Validators.required ],
    });
  }


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
            if(obj[2] && add != this.address)
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