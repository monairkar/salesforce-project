import { LightningElement , track, wire} from 'lwc';
import GET_CONTACTS from '@salesforce/apex/contactDatabase.getContact';
import {refreshApex} from '@salesforce/apex';
import{NavigationMixin} from 'lightning/navigation'
import { deleteRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class LayoutPractice extends NavigationMixin (LightningElement) {

    @track titlename=['Name', 'Phone','Email','Title'];
    @track lstContacts=[];
    refreshResult; ///sgla wire mdla data ith store hota , so we can use it to refresh the data
    @track isModalOpen=false;
    getDatafromCustomEvent;

    @wire(GET_CONTACTS)
    Wirename(result){
        if(result){
            this.refreshResult=result;
            this.lstContacts=[];
            if(result.data){
                var copycontact= Object.assign([],result.data);
                
                for(var cpydata of copycontact ){
                    var cn= Object.assign({},cpydata);
                    cn['Recordurl']='/lightning/r/Contact/'+cn.Id +'/view';
                    this.lstContacts.push(cn);
                }
                

            }
            else if(result.error){
                console.log('Error'+ result.error);
            }
        }
    }
 // refresh button vr click kelyavr action perform hote
    refreshContact(){
        refreshApex(this.refreshResult);
    }

// New button vr click kel ki action hote 
    createNewContact() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            }
        })
    }

// Delet Modal/prompt sathi
    openMdoelPrompt(event){
        this.getDatafromCustomEvent=event.detail;
        this.isModalOpen=true;
    }

    tabClose(){
        this.isModalOpen=false;
        
    }

    delRec(){
        deleteRecord(this.getDatafromCustomEvent.Id)
        .then(() => {
            this.dispatchEvent(new ShowToastEvent ({
                title: 'message',
                message:'sbbdkjn d ',
                variant: 'success'
            }))

            
            
            this.refreshContact();
            
        })
        .catch(error => {
            var tostEvent= new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            })
            this.dispatchEvent(tostEvent);
        })
        this.isModalOpen=false;
    }


    //absnbbdhdbhbna nbsnbh
}