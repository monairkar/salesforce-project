//Trigger will fire  when we try to create the account with the same name
// Preventing the users to create Duplicate Accounts.

trigger DuplicateRecords on Account (before insert , before update) {
    for(Account a:Trigger.new) 
       {
           List<Account> acc=[Select id from Account where Name=:a.Name and Rating=:a.Rating ];
           if(acc.size()>0) 
          {
            a.Name.addError('duplicate accounts can not be add');
          }
       }
}