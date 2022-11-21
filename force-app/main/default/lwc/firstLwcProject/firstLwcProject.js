import { LightningElement, track } from 'lwc';

export default class FirstLwcProject extends LightningElement {
    no1;
    no2;
    @track Result; 
    handlevaluechange(event){
        var name = event.target.name;
        var value = parseFloat(event.target.value);//will get string as a result so it will concanet so use parse

        if(name=="num1"){
            this.no1=value;
        }else{
            this.no2=value
        }
    } 

    addition(){
        this.Result=(this.no1+this.no2); //will get string as a result so it will concanet so use parse 
    }
    Sub(){
        this.Result=this.no1-this.no2;
    }
    Multiple(){
        this.Result=this.no1*this.no2;
    }
    Division(){
        this.Result=this.no1/this.no2;
    }
    
}