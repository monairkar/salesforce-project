//when the leads are inserted into the database it would add Doctor prefixed for all lead names. 
//This is applicable for both inserting and updating the lead records.

trigger CreateLead on Lead (before insert , before update) {
    
    for(Lead l:Trigger.new){
        l.firstname='Doctor'+l.firstname;
    }
}