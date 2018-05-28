import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ContractService} from "./contract.service";

@Injectable()
export class ReguserGuard implements CanActivate {
  constructor(private cs:ContractService,private router:Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.cs.isregister().then(result => {      
        if (result)
        {
          // console.log("You have already Registered")  
          this.router.navigate(["profile"]);
        }
        else
        {
          // console.log("You have not Registered")   
          return true;        
        }
      })
  }
}
