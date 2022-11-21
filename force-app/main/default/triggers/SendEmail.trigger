//Write a trigger on Contact , when a contact insert an email should be sent to contact email id with specified template. 
//Did that through Flow also , check flow (AfterCreatingContactEmailSend)
trigger SendEmail on Contact (After insert) {
    for(contact conn: Trigger.new){
        Messaging.SingleEmailMessage Mail=new Messaging.SingleEmailMessage();
        List<string> em=new List<string>();
        em.add(conn.Email);
        Mail.setToAddresses(em);
        Mail.setSubject('You got Email from Trgigger!!');
        Mail.setPlainTextBody('Hey!! You did it..');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{Mail});
        
    }
}