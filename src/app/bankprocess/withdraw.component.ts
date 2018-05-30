import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  public model:{};
  public depositadd:number;
  public depositamt:number;
  public withdraw:number;
  account:string;
  public bank_address:number;

  angForm: FormGroup;
  public amount:number;
  public tokenaddress:number;
  public bankaddress:number;

  constructor(private de:ContractService , private spin : NgxSpinnerService, private fb: FormBuilder) {
    de.getAccount().then(account=> this.account = account);
    this.createForm();
   }

   createForm() {
    this.angForm = this.fb.group({
      amount: ['', Validators.required ],
      withdraw: ['', Validators.required ],
      tokenaddress: ['', Validators.required ],
      bankaddress1: ['', Validators.required ],
      amount1: ['', Validators.required ],
    });
  }

  ngOnInit() {
    this.de.basicfunctions();

  }
  dep(){
    this.spin.show();
    let meta = this.de;
    meta.isregister().then(result =>{
      if(result == true)
    
        // this.spin.show();

      meta.deposit(this.depositamt).then((res)=>{

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
  
  wit(){
    this.spin.show();
    let meta = this.de;
    meta.acc_bal().then(result =>{
      if(result >= this.withdraw)

        meta.withdraw(this.withdraw).then((res)=>{
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
        {
          console.log(result)
        alert("You have a not enough balance");
        this.spin.hide();
        }
      })
  }
  token(){
    this.spin.show();
    let meta = this.de;
    meta.isregister().then(result =>{
      if(result == true)
  
      meta.token(this.tokenaddress).then((res)=>{
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
  trans(){
    this.spin.show();
    let meta = this.de;
    meta.acc_bal().then(result =>{
      if(result >= this.amount)
  
      meta.transfer(this.bank_address,this.amount).then((res)=>{
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
      {
        alert("You have a not enough balance");
        this.spin.hide();
      }
        
    })
  }
}
