public class practice {
    public static void check(){
        account[] acc =  [select Name from account];
        system.debug(acc[0]);
    }
}