//Write a trigger on contact to prevent duplicate records based on Contact Email & Contact Phone.

trigger PreventDuplicateRecords on Contact (before insert) {
    set<string> EmailSet= new set<string>();
    set<string> PhoneSet= new set<string>();
    
    for(contact cn:Trigger.new){
        EmailSet.add(cn.Email);
        PhoneSet.add(cn.MobilePhone);
        
        List<contact> conn=[select Email,MobilePhone from Contact where Email IN:EmailSet or MobilePhone IN:PhoneSet];
        if(conn.size()>0){
            cn.addError('duplicate value');
        }
    }
    
    
    
}