import { LightningElement ,track} from 'lwc';
import getContactByName from '@salesforce/apex/contactDatabase.getContactByAccName';
import{NavigationMixin} from 'lightning/navigation'

export default class SearchResult extends NavigationMixin( LightningElement ){
    record;
    actions=[
        {label:'Edit', name:'edit'},
        {label:'view', name:'view'}
    ]
    @track tableColumns=[
        {label:'Name', fieldName:'Name'},
        {label:'Phone', fieldName:'Phone'},
        {label:'Email', fieldName:'Email'},
        {
            type:'action',
            typeAttributes:{rowActions:this.actions}
        }
    ];

    @track lstContact=[]


    getcontacts(event){
        var searchResult=event.target.value;
        getContactByName({searchKey:searchResult})
        .then(result => {
            this.lstContact=result
        })
    }

    peformAction(event){
        var getActionName= event.detail.action.name;
        this.record={...event.detail.row};
        console.log(getActionName);
        if(getActionName == 'view'){
            this.viewDelete('view');
        }else if(getActionName == 'edit'){
            this.viewDelete('edit');
        }
    
    }

    viewDelete(action){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                objectApiName:'contact',
                actionName:action,
                recordId:this.record.Id
            }
        })
    }


}