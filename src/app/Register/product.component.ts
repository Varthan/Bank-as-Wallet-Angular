import { Component, OnInit ,NgModule} from '@angular/core';
import {ContractService} from "../contract.service";
import { NgxSpinnerService } from 'ngx-spinner';
        
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})



export class ProductComponent implements OnInit{
 // products:product[]
  //public balance: number;
  public model:{};
  public bankname:string;
  public fdint:string;
  public lnint:number;
  

  constructor(private cs: ContractService, private spin : NgxSpinnerService) {
      
  }
  ngOnInit() {
    this.cs.basicfunctions();
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

