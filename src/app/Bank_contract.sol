pragma solidity ^0.4.0;
contract ERC20  
{
  function allowance(address owner, address spender) public view returns (uint);
  function transferFrom(address from, address to, uint value) public returns (bool);
  function approve(address spender, uint value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint value);
  function totalSupply() public view returns (uint);
  function balanceOf(address who) public view returns (uint);
  function transfer(address to, uint value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint value);
}

contract Bank
{

    //Register contract Details
    struct Bank_Details
    {
        bytes name;
        uint bal;
        bool status;
        uint loan_interst;
        uint fixed_deposit_interst;
        uint token_count;
        uint borrow_amount;
        uint lend_amount;
        uint fixed_amount_bank;
        uint fixed_amount_user;
    }
    
    mapping(address => Bank_Details) public bank;
    mapping(uint => address) public bank_users;
    uint public bank_count;


    //Loan_Details contract Details
    
    uint loan_count;
    uint eth= 0.01 ether;

    struct loan_details
    {
        uint loan_id;
        address lender_address;
        address borrower_address;
        address token_address;
        uint amount;
        uint settle_count;
        uint next_settle_time;
        uint months;
        uint bal_loan;
        uint current_installment;
    }
    
    mapping(uint => loan_details) public loan;
     
    mapping(address => mapping(uint => uint)) public loan_get_id;
    mapping(address => uint) public loan_get_count;
    
    mapping(address => mapping(uint => uint)) public loan_pro_id;
    mapping(address => uint) public loan_pro_count;


    //Fixed_Deposit contract Details
    struct fixed_dep_details
    {
        uint fixed_dep_id;
        address bank_address;
        address user_address;
        uint amount;
        uint end_time;
        uint year;
        bool status;
    }

    mapping(uint => fixed_dep_details) public fix_dep;
    uint fix_dep_count;

    //Bank can stores the users details
    mapping(address => mapping(uint => uint)) public my_clients_dep_id;
    mapping(address => uint) public my_clients_count;

    //User can stores the deposited bank details
    mapping(address => mapping(uint => uint)) public my_fix_dep_id;
    mapping(address => uint) public my_fix_acc_count;
    
    
    uint amont;
    uint temp_amount;
    uint temp_int_amt;


    // modifier ch_register(address add)
    // {
    //     require(bank[add].status == true);
    //     _;
    // }

    //Register contract functions
    function register(bytes name, uint loan_interst, uint fixed_deposit) public payable
    {
        require(bank[msg.sender].status == false);
            if(bank[msg.sender].name.length == 0)
            {
                bank_users[bank_count] = msg.sender;
                bank_count += 1;
            }

            bank[msg.sender].name = name; // name;                        // After Change
            bank[msg.sender].loan_interst = loan_interst;
            bank[msg.sender].fixed_deposit_interst = fixed_deposit;
            bank[msg.sender].status = true;
        
    }

    function deregister() public //ch_register(msg.sender)
    {
        // require(bank[msg.sender].borrow_amount == 0);                         // controlled in front end
        // require(bank[msg.sender].lend_amount == 0);
        // require(bank[msg.sender].fixed_amount_bank == 0);
        // require(bank[msg.sender].fixed_amount_user == 0);

        msg.sender.transfer(bank[msg.sender].bal);

        bank[msg.sender].status = false;
        bank[msg.sender].bal = 0;
    }
    
    function tok_count(address token,address ad) public
    {
        bank[ad].token_count = ERC20(token).balanceOf(ad);
    }

    
    //Bank Contract Basic functions
    function deposit(address addr)  public payable
    {
        bank[addr].bal += msg.value;
    }
   
    function withdraw(uint amount) public
    {
        require(bank[msg.sender].bal >= amount);                            // controlled in front end
        bank[msg.sender].bal -= amount;
        msg.sender.transfer(amount);
    }
   
    function transfer(address from, address to, uint amount) public //ch_register(to)
    {  
        require(bank[from].bal >= amount);
        bank[from].bal -= amount;
        bank[to].bal += amount;                //amount transfered to other persion bank address
        //to.transfer(amount);
    }
    
    
    //Loan_Details contract functions
    
    function req_loan(address token_address,address bank_address,uint tokens,uint8 year) public //ch_register(bank_address) payable
    {
        // require(bank_address!=msg.sender);                                   // controlled in front end
        // require (bank[bank_address].bal > (eth * tokens) );
        
        ERC20(token_address).transferFrom(msg.sender,bank_address,tokens);
        
        // bank[bank_address].bal -= (eth * tokens);
        // bank[msg.sender].bal += (eth * tokens);
        transfer(bank_address, msg.sender, (eth * tokens));
        //msg.sender.transfer((eth * tokens));
        
        
        bank[msg.sender].borrow_amount += (eth * tokens);
        bank[bank_address].lend_amount += (eth * tokens);

        tok_count(token_address,msg.sender);
        tok_count(token_address,bank_address);

        amont = ( (eth * tokens) * ((bank[bank_address].loan_interst) / 100) ) /100;
        
        loan_get_id[msg.sender][ loan_get_count[msg.sender] ] = loan_count;
        loan_get_count[msg.sender] += 1;
        loan_pro_id[bank_address][ loan_pro_count[bank_address] ] = loan_count;
        loan_pro_count[bank_address] += 1;
        
        loan[loan_count].loan_id = loan_count;
        loan[loan_count].lender_address = bank_address;
        loan[loan_count].borrower_address = msg.sender;
        loan[loan_count].token_address = token_address;
        loan[loan_count].amount = (eth * tokens);
        loan[loan_count].next_settle_time = now + 2 minutes;//35 days;
        loan[loan_count].months = year*12;
        loan[loan_count].bal_loan = (eth * tokens);
        loan[loan_count].current_installment = amont + (((eth * tokens))/(year*12));
        
        // loan[loan_count].tokens = tokens;
        
        loan_count = loan_count + 1;
    }
    
    function loan_due(uint ln_id,uint due_amt) public
    {
        // require( due_amt <= bank[msg.sender].bal);                          // controlled in front end
        
        transfer(msg.sender, (loan[ln_id].lender_address), due_amt);
        
        bank[msg.sender].borrow_amount -= loan[ln_id].amount / loan[ln_id].months;
        bank[ loan[ln_id].lender_address ].lend_amount -= loan[ln_id].amount / loan[ln_id].months;
        loan[ln_id].bal_loan -= loan[ln_id].amount / loan[ln_id].months;        // reduse one installment
        
        amont = ( (loan[ln_id].bal_loan) * ( (bank[ loan[ln_id].lender_address ].loan_interst) / 100) ) /100;
        loan[ln_id].current_installment = amont + (loan[ln_id].amount / loan[ln_id].months);
                
        loan[ln_id].next_settle_time += 1 minutes;//30 days;
        
        loan[ln_id].settle_count += 1;
    }
        
    function last_loan_due(uint ln_id,uint due_amt) public
    {
        loan_due(ln_id,due_amt);
        
        bank[msg.sender].borrow_amount -= loan[ln_id].bal_loan;
        bank[ loan[ln_id].lender_address ].lend_amount -= loan[ln_id].bal_loan;
        loan[ln_id].bal_loan = 0;
        
        ERC20( loan[ln_id].token_address ).transferFrom( loan[ln_id].lender_address , msg.sender, (loan[ln_id].amount/eth));
            
        tok_count((loan[ln_id].token_address),msg.sender);
        tok_count((loan[ln_id].token_address),(loan[ln_id].lender_address));
    }
    
    
    
    //Fixed_Deposit contract functions
    
    function Fixed_Deposit(address bank_addr, uint year) public payable //ch_register(bank_addr)
    {
        deposit(bank_addr);
        
        fix_dep[fix_dep_count].fixed_dep_id = fix_dep_count;
        fix_dep[fix_dep_count].bank_address = bank_addr;
        fix_dep[fix_dep_count].user_address = msg.sender;
        fix_dep[fix_dep_count].amount = msg.value;
        fix_dep[fix_dep_count].end_time =now + 2 minutes;//now + (year *1 years);
        fix_dep[fix_dep_count].year = year;
        fix_dep[fix_dep_count].status = true;
        
        //store my deposit details for my reference
        my_fix_dep_id[msg.sender][ my_fix_acc_count[msg.sender] ] = fix_dep_count;
        my_fix_acc_count[msg.sender] += 1;
        
        //store my deposit details for owner_bank reference
        my_clients_dep_id[bank_addr][ my_clients_count[bank_addr] ] = fix_dep_count;
        my_clients_count[bank_addr] += 1;
        
        bank[bank_addr].fixed_amount_bank += msg.value;
        bank[msg.sender].fixed_amount_user += msg.value;
        
        fix_dep_count += 1;
    }
    
    function fix_amt_settlement(uint fix_id,uint value)public
    {
        // require(fix_dep[fix_id].status == true);                //controlled in front end
            
        require(bank[ fix_dep[fix_id].bank_address ].bal >= value);
        
        bank[ fix_dep[fix_id].bank_address ].bal -= value;
        (fix_dep[fix_id].user_address).transfer( value );

        bank[ fix_dep[fix_id].user_address ].fixed_amount_user -= fix_dep[fix_id].amount;
        bank[ fix_dep[fix_id].bank_address ].fixed_amount_bank -= fix_dep[fix_id].amount; 
            
        fix_dep[fix_id].status = false;
    }
     
    // function fix_get_within_time(uint fix_id) public
    // {
    //     fix_amt_settlement( fix_id,(fix_dep[fix_id].amount - (fix_dep[fix_id].amount / 100)) );
    // }
    
    // function fix_get_after_time(uint fix_id) public
    // {
    //     fix_amt_settlement( fix_id, ( fix_dep[fix_id].amount + ( (fix_dep[fix_id].amount * fix_dep[fix_id].year * ( bank[fix_dep[fix_id].bank_address ].fixed_deposit_interst / 100)) / 100 ) ) );
    // }
    
}