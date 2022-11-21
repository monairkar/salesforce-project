public class contactDatabase { 
	@auraenabled(cacheable=true)  //this method for wire service 
    public static List<contact> getContact(){
        List<contact> conn=[select Id,name,Phone,Email,Title from contact];
        return Conn;
    }
    
    @auraenabled(cacheable=true)  //this method for wire service 
    public static List<account> getAccount(){
        List<account> acc=[select Id,name,Phone,AccountNumber from account];
        return acc;
    }
    
    @auraenabled
    // delete Selected account
    public static void deleteSelectedRecords(List<Account> listAccount){
        try{
            delete listAccount;
        } 
        catch(Exception e){
            
            throw new AurahandledException(e.getMessage());
        }
    }

    @AuraEnabled
    //get all the contact by Account name
    public static List<contact> getContactByAccName(String searchKey){
        try { 
            searchKey= '%' + searchKey + '%';
            List<contact> conne= [select Id,Name,Phone,Email from contact where Account.Name Like : searchKey];
            return conne;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}