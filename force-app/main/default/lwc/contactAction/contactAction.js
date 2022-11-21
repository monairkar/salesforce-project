import { LightningElement, track , api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class ContactAction extends NavigationMixin (LightningElement) {

    @track isopen=false;

    @api record=[];
    

// action cha dropdown box/arrow open close sathi
    toggleaction(){
        this.isopen= !this.isopen ;
        

    }
    //action chya List sathi Like EDIT, View , Delete
    viewRecord(){
        this.toggleaction();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName:'Contact',
                actionName:'view',
                recordId:this.record.Id
            },
        });

    }
    EditRecord() {
        this.toggleaction();
        // Navigate to the contact edit page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'edit',
                recordId:this.record.Id
            }
        })
    }

    deleteRec(){
        deleteRecord(this.record.Id)
        .then(result=> {
            alert(' suss  Deleted..!');
        })
        .catch(error=> {
            console.log('got error'+ error);
        })
    }

// Child to partent communication ..we use custom event.
    handlePromptClick(){
        this.toggleaction();
        var customEvent=new CustomEvent('delete',{
            detail: this.record
        })
        this.dispatchEvent(customEvent); //he record/data parent kd janar means contactDatabase component kd jail
    }
}