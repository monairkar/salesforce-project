trigger createAccount on Contact (after insert) {
    List<Account> cn= new List<Account>();
    for(contact c:Trigger.new){
        Account a=new Account();
        a.Name = c.LastName;
        cn.add(a);
    }
    insert cn;
    
}