import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { promise } from 'protractor';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

declare let require: any;
declare let window: any;

let tokenAbi = require('./contract.json');

@Injectable()
export class ContractService {

  private _account: string = null;
  private _balance: number = 0;
  private _web3: any;

  private _tokenContract: any;
  private _tokenContractAddress: string = "0xa47f284c75ff5254d79bbdb1e8e73e4069f5d3c1"; 

  constructor(private router:Router) { 
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider);
    } 
    else 
    {
      console.warn("Please use a dapp browser like mist or MetaMask plugin for chrome");
    }
    this._web3.version.getNetwork((err,netId)=>
      {
        switch(netId)
        {
          case "1":
            console.log('This is mainnet');
            break;
          case "2":
            console.log('This is deprecated Morden test network');
            break;
          case "3":
            console.log('This is ropsten test network');
            break;
          case "4":
            console.log('This is the Rinkeby test network');
          case "42":
            console.log('This is the kovan test network');
            break;
          default:
            console.log('This is an unknown network.');
        }	
      });
    this._tokenContract = this._web3.eth.contract(tokenAbi).at(this._tokenContractAddress);
  }


  public async basicfunctions(): Promise<string> {
    let meta = this;
    let account = await meta.getAccount();
    var accountInterval = setInterval(function()
    {
      meta._web3.eth.getAccounts((err, accs) => {
        if(accs[0] !== meta._account)
        {
          console.log("Met : "+accs[0]+", acc : "+meta._account);
          window.location.reload();
        }
      })
      
    }, 100);

  //  var id1 = setInterval(function() {
  //     if (typeof window.web3 !== 'undefined') {
  //         meta._web3 = new Web3(window.web3.currentProvider);
  //         if (meta._web3.eth.accounts[0] !== meta._account) {
  //             meta._account = meta._web3.eth.accounts[0];
  //             if (meta._web3.eth.accounts[0] === undefined) {
  //               meta.router.navigate(['']);
  //                 // clearInterval(this.interval);
  //             } else
  //             {
  //               window.location.reload(true);
  //             }
  //         }
  //     } else
  //     {
  //       meta.router.navigate(['']);
  //     }
  //     }, 200);

    return Promise.resolve(this._account);
  }

  public async hash(a): Promise<string> {
    let meta = this;
    return new Promise((resolve, reject) => {

      var accountInterval = setInterval(function()
      {
        meta._web3.eth.getTransactionReceipt(a,function(err,result){
          if(err != null) {
          reject(err);
          }

          if(result !== null)
          {
            clearInterval(accountInterval);
            // console.log("obj 1 :"+result);

            if(result.status == 0x1)
            {
              // console.log("obj "+result.status)
              resolve("Success");
              meta.router.navigate(['']);
              // window.location.reload();
            }
            else
            {
              // console.log("obj "+result.status)
              resolve("Failed");
              meta.router.navigate(['']);
              // window.location.reload();
            }
          }
        })
      },100)
    }) as Promise<string>;
  }
  

//getAccount details
public async getAccount(): Promise<string> {
  if (this._account == null) {
    this._account = await new Promise((resolve, reject) => {
      this._web3.eth.getAccounts((err, accs) => {
        if (err != null) {
          alert('There was an error fetching your accounts.');
          return;
        }

          if (accs.length === 0) {
            alert(
              'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }
        resolve(accs[0]);
      })
    }) as string;

    this._web3.eth.defaultAccount = this._account;
  }

  return Promise.resolve(this._account);
}
  //getBalance
  public async getUserBalance(): Promise<number> {
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._web3.eth.getBalance( account, function (err, result) {
        if(err != null) {
          reject(err);
        }
        this._balance = _web3.fromWei(result);
        // console.log("bal",parseFloat(_web3.fromWei(result)));
        resolve(parseFloat(_web3.fromWei(result)));
      });
    }) as Promise<number>;
  }
  //Add Product
  
  public async register(a,b,c): Promise<number> {
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      b = b.toFixed(2) *100;
      c = c.toFixed(2) *100;
      // alert(b);
      // alert(c);
      this._tokenContract.register(_web3.fromAscii(a),b,c, {from:account,gas:600000},function (err, result) {
        if(err != null) {
          // reject(err);
          console.log(err);
          resolve(0);
        } 
        else 
        resolve(result);
      });
    }) as Promise<number>;
  }


  public async deregister(): Promise<number> {
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      let con = this._tokenContract;

      con.bank(account,function (err, val) {
        //6789
        if(parseInt(val[6]) != 0)
        {
          alert("You have Borrow Some Amount");
          resolve(0);
          return;
        }
        if(parseInt(val[7]) != 0)
        {
          alert("You have Lend Some Amount");
          resolve(0);
          return;
        }
        if(parseInt(val[8]) != 0)
        {
          alert("Some Bank deposit to your Bank");
          resolve(0);
          return;
        }
        if(parseInt(val[9]) != 0)
        {
          alert("You have Deposit Some Amount");
          resolve(0);
          return;
        }

        con.deregister({from:account,gas:600000},function (err, result) {
          if(err != null) {
            // reject(err);
            console.log(err);
            resolve(0);
          } 
          else 
          resolve(result);
        });
      
      });
    }) as Promise<number>;
  }

  // Bank Table
  public async bank_count(): Promise<number[]> {
    let account = await this.getAccount();
    let _web3 = this._web3;
    return new Promise((resolve, reject) => {
      this._tokenContract.bank_count.call(function (error,result) {
        const arr:number[] = [];
          for(var i=0;i< result.toNumber();i++){
            // console.log("count : "+i);
              arr.push(i);
          }
          resolve(arr);
      });
    })as Promise<number[]>;
  }

  public async bank_address(gid):Promise<any> 
  {
    return new Promise((resolve, reject) => 
    {
      
      let _web3 = this._web3;
      this._tokenContract.bank_users.call(gid,function (error,result) {

          if(error){    
            reject(error); 
          } 
          // console.log("address : "+ (result));
          
          resolve(result);
      });
    })as Promise<any>;
  }


  public async bank_detail(gid):Promise<object> 
  {
    return new Promise((resolve, reject) => 
    {
      let a = this._tokenContract;
      let _web3 = this._web3;

        this._tokenContract.bank.call(gid,function (error,result) {

          if(error){    
            reject(error); 
          } 
          // console.log("detail : "+ (result[0]));
          result[0] = _web3.toAscii(result[0])
          result[3] = parseInt(result[3])/100;
          result[4] = parseInt(result[4])/100;
          // if(result[2] == false)
          //   result[2] = "Not Available"
          // else
          //   result[2] = "Available"
          result[1] = _web3.fromWei(result[1],'ether')
          result[6] = _web3.fromWei(result[6],'ether')
          result[7] = _web3.fromWei(result[7],'ether')
          result[8] = _web3.fromWei(result[8],'ether')  
          result[9] = _web3.fromWei(result[9],'ether')                  
          resolve(result);
      });
    })as Promise<object>;
  }

  // Bank Table
  public async loan_get_count(): Promise<number[]> {
    let account = await this.getAccount();
    let _web3 = this._web3;
    return new Promise((resolve, reject) => {
      this._tokenContract.loan_get_count.call(account, function (error,result) {
        
        const arr:number[] = [];
          for(var i=0;i< result.toNumber();i++){
            // console.log("count : "+i);
              arr.push(i);
          }
          resolve(arr);
      });
    })as Promise<number[]>;
  }

  public async loan_pro_count(): Promise<number[]> {
    let account = await this.getAccount();
    let _web3 = this._web3;
    return new Promise((resolve, reject) => {
      this._tokenContract.loan_pro_count.call(account, function (error,result) {
        
        const arr:number[] = [];
          for(var i=0;i< result.toNumber();i++){
            // console.log("count : "+i);
              arr.push(i);
          }
          resolve(arr);
      });
    })as Promise<number[]>;
  }

  public async get_loan_id(gid):Promise<any> 
  {
    let account = await this.getAccount();
    let _web3 = this._web3;
    return new Promise((resolve, reject) => 
    { 
      this._tokenContract.loan_get_id.call(account, gid,function (error,result) {
        
          if(error){    
            reject(error); 
          } 
          // console.log("address : "+ (result));
          
          resolve(result);
      });
    })as Promise<any>;
  }

  public async pro_loan_id(gid):Promise<any> 
  {
    let account = await this.getAccount();
    let _web3 = this._web3;
    return new Promise((resolve, reject) => 
    {
      this._tokenContract.loan_pro_id.call(account, gid,function (error,result) {
        
          if(error){    
            reject(error); 
          } 
          // console.log("address : "+ (result));
          
          resolve(result);
      });
    })as Promise<any>;
  }


  public async loan_detail(gid):Promise<object> 
  {
    return new Promise((resolve, reject) => 
    {
      let a = this._tokenContract;
      let _web3 = this._web3;

        this._tokenContract.loan.call(gid,function (error,result) {
          
          if(error){    
            reject(error); 
          } 
          let time = Math.round((new Date()).getTime() / 1000);

          result[4] = _web3.fromWei(result[4],'ether')
          result[10] = result[6];
          result[12] = result[9];
          let myDate = new Date( (result[6].toNumber()) *1000);
          result[6]=(myDate.toLocaleString());
          result[8] = _web3.fromWei(result[8],'ether')
          result[9] = _web3.fromWei(result[9],'ether')

          if(time > parseInt(result[10]))
            result[11] = parseFloat(_web3.fromWei(result[12],'ether')) + 0.01;
          else
            result[11] = _web3.fromWei(result[12],'ether')

          resolve(result);
      });
    })as Promise<object>;
  }


  public async my_fix_acc_count(): Promise<number[]> {
    let account = await this.getAccount();
    let _web3 = this._web3;
    return new Promise((resolve, reject) => {
      this._tokenContract.my_fix_acc_count.call(account, function (error,result) {
        
        const arr:number[] = [];
          for(var i=0;i< result.toNumber();i++){
            // console.log("count : "+i);
              arr.push(i);
          }
          resolve(arr);
      });
    })as Promise<number[]>;
  }

  public async my_clients_count(): Promise<number[]> {
    let account = await this.getAccount();
    let _web3 = this._web3;
    return new Promise((resolve, reject) => {
      this._tokenContract.my_clients_count.call(account, function (error,result) {
        
        const arr:number[] = [];
          for(var i=0;i< result.toNumber();i++){
            // console.log("count : "+i);
              arr.push(i);
          }
          resolve(arr);
      });
    })as Promise<number[]>;
  }

  public async my_fix_dep_id(gid):Promise<any> 
  {
    let account = await this.getAccount();
    let _web3 = this._web3;
    return new Promise((resolve, reject) => 
    { 
      this._tokenContract.my_fix_dep_id.call(account, gid,function (error,result) {
        
          if(error){    
            reject(error); 
          } 
          // console.log("address : "+ (result));
          
          resolve(result);
      });
    })as Promise<any>;
  }

  public async my_clients_dep_id(gid):Promise<any> 
  {
    let account = await this.getAccount();
    let _web3 = this._web3;
    return new Promise((resolve, reject) => 
    {
      this._tokenContract.my_clients_dep_id.call(account, gid,function (error,result) {
        
          if(error){    
            reject(error); 
          } 
          // console.log("address : "+ (result));
          
          resolve(result);
      });
    })as Promise<any>;
  }


  public async fix_dep_detail(gid):Promise<object> 
  {
    return new Promise((resolve, reject) => 
    {
      let a = this._tokenContract;
      let _web3 = this._web3;

        this._tokenContract.fix_dep.call(gid,function (error,result) {
          
          if(error){    
            reject(error); 
          } 
          
          result[3] = _web3.fromWei(result[3],'ether')
          let myDate = new Date( (result[4].toNumber()) *1000);
          result[4]=(myDate.toLocaleString());
          
          resolve(result);
      });
    })as Promise<object>;
  }






  // public async bank_detail(gid):Promise<object> 
  // {
  //   return new Promise((resolve, reject) => 
  //   {
  //     let a = this._tokenContract;
  //     let _web3 = this._web3;
  //     this._tokenContract.bank_users.call(gid,function (error,val) {
  //       console.log("add "+val)
  //       a.bank.call(val,function (error,result) {

  //         if(error){    
  //           reject(error); 
  //         } 
          
  //         result[0] = _web3.toAscii(result[0])
  //         result[1] = _web3.fromWei(result[1],'ether')
  //         result[10] = val;
  //         console.log("detail : "+ (result[0]));
  //         resolve(result);
          

  //       });
  //     });
  //   })as Promise<object>;
  // }


  public async loan(a,b,c,d): Promise<number> {
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {

      if(b == account)
      {
          alert("Chance the bank Address");
          resolve(0);
          return;
      }

      if(parseInt(c) != c || parseInt(c) <= 0)
      {
          alert("Enter the Valid Token Count...");
          resolve(0);
          return;
      }

      if(parseInt(d) == 0)
      {
          alert("Enter the Valid number of years");
          resolve(0);
          return;
      }

      if(parseInt(d) != d)
      {
          alert("Change the decimal values, You have only deposit the complete number of years");
          resolve(0);
          return;
      }

      let _web3 = this._web3;
      this._tokenContract.req_loan(a, b, c, d, {from:account,gas:600000},function (err, result) {
        if(err != null) {
          // reject(err);
          console.log(err);
          resolve(0);
        } 
        else 
        resolve(result);
      });
    }) as Promise<number>;
  }



  public async pay_due(a): Promise<number> {
 
    let account = await this.getAccount();
    let con = this._tokenContract;
    let _web3 = this._web3;
    let self = this;
  
    return new Promise((resolve, reject) => 
    {
      if(parseInt(a) != a)
      {
          alert("Please give the Valid ID");
          resolve(0);
          return;
      }
      
      self._tokenContract.loan(a, function(err,value)
        {
            if(value[2] != account)
            {
            alert("Invalid ID");
            resolve(0);
            return;
            }

            if( (value[5].toNumber()) >= (value[7].toNumber()) )
            {
                alert("You have already settle this loan");
                resolve(0);
                return;
            }

            let time = Math.round((new Date()).getTime() / 1000);

            if(time < (value[6]-60))
            {
                alert("Due time can't come");
                resolve(0);
                return;
            }

            if( value[5].toNumber() < (value[7].toNumber()-1) )
            {
              // if( ((loan[ln_id].next_settle_time - 1 minutes  /* 5 days */) <= now) && (now <= loan[ln_id].next_settle_time))
                if( (value[6].toNumber()-60) <= time && time <= value[6].toNumber())
                {         
                  // console.log("1",(value[6].toNumber()-60), time);
                  self.acc_bal().then(res =>
                    {
                      console.log("Due amt:",parseInt(value[9]),"wei,",_web3.fromWei(parseInt(value[9]), "ether"),"ether"); 
                      console.log("A/c bal:",_web3.toWei(res, "ether"),"wei,",res,"ether");
                      if(_web3.toWei(res, "ether") < parseInt(value[9]))
                      {
                        alert("You have a not enough balance");
                        resolve(0);
                        return;
                      } 
                             
                      con.loan_due(a,parseInt(value[9]),{from:account,gas: 600000},function(err,result)
                      {
                        if(err != null) {
                          // reject(err);
                          console.log(err);
                          resolve(0);
                        } 
                        else 
                        resolve(result);
                      });
                    })
                }
                else
                {
                  // console.log("2",(value[6].toNumber()-60), time);
                    let amt = parseInt(value[9]) + parseInt(_web3.toWei(0.01, "ether"));
                    console.log("Due amt:",amt,"wei,",_web3.fromWei(amt, "ether"),"ether");
                    self.acc_bal().then(res =>
                    {
                      console.log("A/c bal:",_web3.toWei(res, "ether"),"wei,",res,"ether");
                      if(_web3.toWei(res, "ether") < amt)
                      {
                        alert("You have a not enough balance");
                        resolve(0);
                        return;
                      }
                      
                      con.loan_due(a,amt,{from:account,gas: 600000},function(err,result) 
                      {
                        if(err != null) {
                          // reject(err);
                          console.log(err);
                          resolve(0);
                        } 
                        else 
                        resolve(result);
                      });
                    })
                }

            }
            else if( value[5].toNumber() == (value[7].toNumber()-1) )
            { 
             
              if( (value[6].toNumber()-60) <= time && time <= value[6].toNumber())
                {
                    let amt = parseInt(value[9]) + ( parseInt(value[8]) - (parseInt(value[4]) / parseInt(value[7]) ));
                    console.log("Due amt:",amt,"wei,",_web3.fromWei(amt, "ether"),"ether");
                    self.acc_bal().then(res =>
                      {
                        console.log("A/c bal:",_web3.toWei(res, "ether"),"wei,",res,"ether");
                        if(_web3.toWei(res, "ether") < amt)
                        {
                          alert("You have a not enough balance");
                          resolve(0);
                          return;
                        }
                        con.last_loan_due(a,amt,{from:account,gas: 600000},function(err,result) 
                        {
                          if(err != null) {
                            // reject(err);
                            console.log(err);
                            resolve(0);
                          } 
                          else 
                          resolve(result);
                        });
                      });
                }
                else
                {
                    console.log("bal : "+ ( parseInt(value[8]) - (parseInt(value[4]) / parseInt(value[7]) ) ) );
                    let amt = parseInt(value[9]) + parseInt(_web3.toWei(0.01, "ether")) + ( parseInt(value[8]) - (parseInt(value[4]) / parseInt(value[7])) );
                    console.log("Due amt:",amt,"wei,",_web3.fromWei(amt, "ether"),"ether");
                    self.acc_bal().then(res =>
                    {
                      console.log("A/c bal:",_web3.toWei(res, "ether"),"wei,",res,"ether");
                      if(_web3.toWei(res, "ether") < amt)
                      {
                        alert("You have a not enough balance");
                        resolve(0);
                        return;
                      }
                      con.last_loan_due(a,amt,{from:account,gas: 600000},function(err,result) 
                      {
                        if(err != null) {
                          // reject(err);
                          console.log(err);
                          resolve(0);
                        } 
                        else 
                        resolve(result);
                      });
                    });
                }
            }
        });
    }) as Promise<number>;
  }

  public async deposit(a): Promise<number> {
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._tokenContract.deposit(account,{from:account,value:this._web3.toWei(a,"ether"),gas: 600000},function (err, result) {
        if(err != null) {
          // reject(err);
          console.log(err);
          resolve(0);
        } 
        else 
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async token(a): Promise<number> {
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._tokenContract.tok_count(a, account, {from:account,gas:600000},function (err, result) {
        if(err != null) {
          // reject(err);
          console.log(err);
          resolve(0);
        } 
        else
  
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async withdraw(a): Promise<number> {
    
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      console.log(_web3.toWei(a,"ether"));
      this._tokenContract.withdraw(_web3.toWei(a,"ether"), {from:account,gas:600000},function (err, result) {
        if(err != null) {
          // reject(err);
          console.log(err);
          resolve(0);
        } 
        else
  
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async transfer(a,b): Promise<number> {
    
    let account = await this.getAccount();
 
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      if(a == account)
      {
          alert("Chance the bank Address");
          resolve(0);
          return;
      }
    
      this._tokenContract.transfer(account,a,_web3.toWei(b,"ether"),{from:account,gas:600000},function (err, result) {
        if(err != null) {
          // reject(err);
          console.log(err);
          resolve(0);
        } 
        else
        resolve(result);
      });
    }) as Promise<number>;
  }


  public async fduser(fix_id) {// Promise<string>
    {
        //let fix_id :string= (<HTMLInputElement>document.getElementById("bank_fix_address")).value;    
        
        let account = await this.getAccount();
        let con = this._tokenContract;
        var web3=this._web3;
        return new Promise((resolve, reject) =>
        {
          if(parseInt(fix_id) != fix_id)
          {
              alert("Please give the Valid ID");
              resolve(0);
              return;
          }

            this._tokenContract.fix_dep(fix_id, function(err,value)
            {
                if(value[2] != account)
                {
                    alert("Invalid ID");
                    resolve(0);
                    return;
                }
    
                if(value[6] == false)
                {
                    alert("Already Settled");
                    resolve(0);
                    return;
                }
    
                let time = Math.round((new Date()).getTime() / 1000); 
                let dep_amt = value[3];
                let dep_yr = value[5];
                let amt;
                
                if(value[4].toNumber() > time)
                {
                    con.bank(value[1], function(err,val)
                    {
                        let bal = parseInt(val[1]);
                        amt = parseInt(dep_amt) - (dep_amt / 100) ;
                        console.log("Request Amount : "+amt);
                        console.log("Bank Balance : "+bal);
                        if(bal<amt)
                        {
                          alert("Bank have not enough balance !");
                          resolve(0);
                          return;
                        }
                        con.fix_amt_settlement(fix_id, amt, {from:account,gas: 600000},function(err,result) 
                        // con.fix_get_within_time(fix_id,this.web3.towei(a) {from:account,gas: 600000},function(err,result) 
                        {
                          if(err != null) {
                            // reject(err);
                            console.log(err);
                            resolve(0);
                          } 
                          else
                            resolve(result);
                        })
                    })
                }
                else
                {
                    con.bank(value[1], function(err,val)
                    {
                        let bal = parseInt(val[1]);
                        let int_rete = val[4];
                        amt = parseInt(dep_amt) + ( (dep_amt * dep_yr * (int_rete / 100)) / 100 );
                        console.log("Request Amount : "+amt);
                        console.log("Bank Balance : "+bal);
                        if(bal<amt)
                        {
                          alert("Bank have not enough balance !");
                          resolve(0);
                          return;
                        }
                        con.fix_amt_settlement(fix_id, amt, {from:account,gas: 600000},function(err,result)
                        // con.fix_get_after_time(fix_id, {from:account,gas: 600000},function(err,result)
                        {
                          if(err != null) {
                            // reject(err);
                            console.log(err);
                            resolve(0);
                          } 
                          else
                            resolve(result);
                        })
                    })
                }
            })
        })
    }
  }


  public async fdowner(fix_idowner)
{
    //let fix_id = (<HTMLInputElement>document.getElementById("user_fix_address")).value;    
    
    let account = await this.getAccount();
    let con = this._tokenContract;
    return new Promise((resolve, reject) =>
    {

      if(parseInt(fix_idowner) != fix_idowner)
          {
              alert("Please give the Valid ID");
              resolve(0);
              return;
          }

        this._tokenContract.fix_dep(fix_idowner, function(err,value)
        {
            if(value[1] != account)
            {
                alert("Invalid ID");
                resolve(0);
                return;
            }

            if(value[6] == false)
            {
                alert("Already Settled");
                resolve(0);
                return;
            }

            let time = Math.round((new Date()).getTime() / 1000); 

            console.log(time,value[4].toNumber())

            if(value[4].toNumber() > time)
            {
                alert("User deposited time not expired");
                resolve(0);
                return;
            }

            let dep_amt = value[3];
            let dep_yr = value[5];

            con.bank(account, function(err,val)
            {
                let int_rete = val[4];
                let bal = parseInt(val[1]);
                let amt = parseInt(dep_amt) + ( (dep_amt * dep_yr * (int_rete / 100)) / 100 );
                console.log("Amount : "+amt);
                console.log("Your Balance : "+bal);
                 
                if(bal<amt)
                {
                  alert("You have not enough balance !");
                  resolve(0);
                  return;
                }
                con.fix_amt_settlement(fix_idowner, amt, {from:account,gas: 600000},function(err,result)
                // con.fix_get_after_time(fix_idowner, {from:account,gas: 600000},function(err,result)
                {
                  if(err != null) {
                    // reject(err);
                    console.log(err);
                    resolve(0);
                  } 
                  else
                    resolve(result);
                })
            })
        })
    })
}

public async fixeddeposit(bankaddress,depositamount,periodinyrs): Promise<any> {
  let account = await this.getAccount();
    
  return new Promise((resolve, reject) => {

    if(bankaddress == account)
      {
          alert("Chance the bank Address");
          resolve(0);
          return;
      }

      if(depositamount == 0)
      {
          alert("Enter the Amount...");
          resolve(0);
          return;
      }

      if(parseInt(periodinyrs) != periodinyrs || parseInt(periodinyrs) == 0)
      {
          alert("Change the decimal values, You have only deposit the complete number of years");
          resolve(0);
          return;
      }

    let _web3 = this._web3;
    this._tokenContract.Fixed_Deposit(bankaddress,periodinyrs,{from:account,value:this._web3.toWei(depositamount,'ether'),gas: 600000},function (err, result) {
      if(err != null) {
        // reject(err);
        console.log(err);
        resolve(0);
      } 
      else

     resolve((result));
    });
  }) as Promise<any>;
}



  public async isregister():Promise<boolean>
  {
    let account = await this.getAccount();

    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._tokenContract.bank(account,function (err, result) {
        if(err != null) {
          reject(err);
        }

      resolve(result[2]);
      });
    }) as Promise<boolean>;
    
  }

  public async acc_bal():Promise<number>
  {
    let account = await this.getAccount();

    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._tokenContract.bank(account,function (err, result) {
        if(err != null) {
          reject(err);
        }

      resolve(parseFloat(_web3.fromWei(result[1],"ether")));
      });
    }) as Promise<number>;
    
  }

  // public async tok_bal(a):Promise<number>
  // {
  //   let account = await this.getAccount();

  //   return new Promise((resolve, reject) => {
  //     let _web3 = this._web3;
  //     this._tokenContract.ERC20(a).balanceOf(account,function (err, result) {
  //       if(err != null) {
  //         reject(err);
  //       }

  //     resolve(parseInt(result));
  //     });
  //   }) as Promise<number>;
    
  // }


  /*


  dues : function()
  {
    //$("#loan-status").html("Initiating transaction... (please wait)");
  
    var self = this;
    var bank;

    
    var time = Math.round((new Date()).getTime() / 1000); 

    Bank.deployed().then(function(instance) 
    {
        bank = instance;
        return bank.loan_get_count(account);
    }).then(function(valu) 
        {
          var loan_bending = 0;
          var loan_expire = 0;
            for(var i=0;i<valu.toNumber();i++)
            {
                bank.loan_due_pending(i,time,false,{from:account}).then(function(result)
                {
                  bank_list                 
                    if(result[0]==true)
                        loan_bending+=1;
                                           
                    if(result[1]==true)
                        loan_expire+=1;
                    
                    document.getElementById('lp').value = loan_bending;
                    document.getElementById('de').value = loan_expire;
                 
                });
            }
        })
  },


  function loan_due_pending(uint i, uint time,bool id) public view returns(bool,bool)
    {
        uint temp_id;
        bool temp_bending_count;
        bool temp_exp_count;

        if(id == true)
            temp_id = i;
        else
            temp_id = loan_get_id[msg.sender][i];

        if( time >= (loan[temp_id].next_settle_time - 1 minutes  ))
        {
          if( ((loan[temp_id].next_settle_time - 1 minutes  ) <= time) && (time <= loan[temp_id].next_settle_time))
          {
              // if( ((loan[temp_id].months - loan[temp_id].settle_count) * (loan[temp_id].amount / loan[temp_id].months)) > 0 )
              if(loan[temp_id].bal_loan > 0)
                  temp_bending_count = true;
          }
          else
          {
              // if( ((loan[temp_id].months - loan[temp_id].settle_count) * (loan[temp_id].amount / loan[temp_id].months)) > 0 )
              if(loan[temp_id].bal_loan > 0)
                  temp_exp_count = true;
          }
      }
      return (temp_bending_count,temp_exp_count);
  }



  */

}




