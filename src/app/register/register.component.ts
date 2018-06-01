import { Component, OnInit ,NgModule} from '@angular/core';
import {ContractService} from "../contract.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // products:product[]
  //public balance: number;
  angForm: FormGroup;
  public model:{};
  public bankname:string;
  public fdint:string;
  public lnint:number;
  

  constructor(private cs: ContractService, private spin : NgxSpinnerService, private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit() {
    this.cs.basicfunctions();
  }

  createForm() {
    this.angForm = this.fb.group({
      _bankname: ['', Validators.required ],
      _lnint: ['', Validators.required ],
      _fdint: ['', Validators.required ],
    });
  }
  
  submit(){
    this.spin.show();
    let meta = this.cs;
    
    meta.isregister().then(result =>{
      if(result == false)
    
      meta.register(this.bankname,this.lnint,this.fdint).then((res)=>{
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
      alert("You have registered already");
  })
  }
   

}
