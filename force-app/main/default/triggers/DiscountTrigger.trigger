trigger DiscountTrigger on Book__c (before insert,before update) {
    for(Book__c b:Trigger.new){
        b.Price__c = b.Price__c/10;
    }
}