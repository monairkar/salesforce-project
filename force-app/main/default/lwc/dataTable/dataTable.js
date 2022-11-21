import { LightningElement , track,wire} from 'lwc';
import GET_ACCOUNT from '@salesforce/apex/contactDatabase.getAccount';
import{NavigationMixin} from 'lightning/navigation'
import { deleteRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex'
import {ShowToastEvent}  from 'lightning/platformShowToastEvent';
import deleteSelectedRecords  from '@salesforce/apex/contactDatabase.deleteSelectedRecords';
import getContactByName from '@salesforce/apex/contactDatabase.getContactByAccName';

export default class DataTable extends NavigationMixin(LightningElement) {
    @track lstAccount=[]
    getRowActionInfo={}
    refreshResult;
    @track isModalOpen=false;
    columactions=[
        {label:'View', name:'view'},
        {label:'Edit', name:'edit'},
        {label:'Delete', name:'delete'},
    ]
    @track tableColums=[
        {label:'Account Name', fieldName:'Name'},
        {label:'Account Phone', fieldName:'Phone'},
        {label:'Account Number', fieldName:'AccountNumber'},
        {
            type:'action',
            typeAttributes:{rowActions:this.columactions}

        }
        

    ]

    @wire(GET_ACCOUNT)
        wireMethod(result){
            if(result){
                this.refreshResult=result
                this.lstAccount=[]
                if(result.data){
                    this.lstAccount=result.data;
                }
            }
        }
//// this is for search box
    getSearchResult(event){
        var searchResult=event.target.value;
        getContactByName({searchKey:searchResult})
        .then(result => {
            this.lstAccount=result
        })
    }
    
        refreshAccount(){
            refreshApex(this.refreshResult);
        }
        handleRowAction(event){
            var actioName= event.detail.action.name;
            this.getRowActionInfo= {...event.detail.row};
            console.log(actioName);
            if(actioName == 'view'){

                this.ViewEditRecord('view');
            } else if(actioName == 'edit'){

                this.ViewEditRecord('edit');

            } else if(actioName == 'delete'){
                this.confirmDelete()
            }
        }

    ViewEditRecord(action){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes:{
                actionName: action,
                recordId : this.getRowActionInfo.Id
            }
        
        })
    }

    confirmDelete(){
        this.isModalOpen=true;
    }

    DelRec(){
        deleteRecord(this.getRowActionInfo.Id)
        .then(() => {
            var tostEvent = new ShowToastEvent({
                title: 'message',
                message:this.getRowActionInfo.Id + '  Record Deleted !!! ',
                variant: 'success',
            })
            this.dispatchEvent(tostEvent)
                
        })
        .catch(error => {
            var tostEvent = new ShowToastEvent({
                title: 'error',
                message: error.body.message,
                variant: 'error',
            })
            this.dispatchEvent(tostEvent)
        })
        this.isModalOpen=false;
        this.refreshAccount()
    }
    closebtn(){
        this.isModalOpen=false;
    }

    
//////////////////    Delete Selcted Record     Delete Selcted Record   ///////////////////////////
selectedRecords=[]
handleSelectedRow(event){
    this.selectedRecords=event.detail.selectedRows;
}
deletSeletedRec(){
    if(this.selectedRecords.length==0){
        alert('plese select the record to be deleted!!');
        return;
    }

    if(confirm('Do you Want to delete the records?')){
        deleteSelectedRecords({listAccount: this.selectedRecords})   // impirative  method call 
        .then(() => {                                               //note: jr fact data ghyacha asel tr @Wire  
            var ttostEvent = new ShowToastEvent({                     // user krach ani jeva action perform kraychi asel
                title: 'message',                                  // like delet kiva search kiva button vr as onclick something chya vele 
                message: '  Record Deleted !!! ',                   // impirative method vaprachi, jyat code ch logic apex method mdeh lihaych
                variant: 'success',
            })
            this.dispatchEvent(ttostEvent)
                
        })
        .catch(error => {
            var ttostEvent = new ShowToastEvent({
                title: 'error',
                message: error.body.message,
                variant: 'error',
            })
            this.dispatchEvent(ttostEvent)
        })
    }
}
}