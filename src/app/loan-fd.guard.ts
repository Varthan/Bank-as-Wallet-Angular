import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ContractService} from "./contract.service";

@Injectable()
export class LoanFdGuard implements CanActivate {
  constructor(private cs:ContractService,private router:Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      let count = 0;
      this.cs.loan_get_count().then(game =>{
    
        game.forEach(item => {
          this.cs.get_loan_id(item).then(add =>{
            this.cs.loan_detail(add).then(obj => 
            {
              if(parseInt(obj[5]) < parseInt(obj[7]))
              count++;
            });
          })
        });
      })

      if (count == 0)
      {
        alert("You have not borrow any loan");
        this.router.navigate(["profile"]);
      }
      else
      {   
        return true;        
      }
  }
}
