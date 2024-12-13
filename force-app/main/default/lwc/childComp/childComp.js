import { LightningElement } from 'lwc';
import { subscribe } from 'lightning/empApi';

const CHANNEL_NAME = '/event/Status_Change_Completed__e'

export default class ChildComp extends LightningElement {

    subscription;


    connectedCallback(){

        this.subscribeToEvent();
    }



    subscribeToEvent(){

        const thisReference = this;

        const messageCallback = function(response){

            thisReference.dispatchEvent(new CustomEvent('statuschange', {}));
        }

        subscribe(CHANNEL_NAME, -1, messageCallback).then(response => {

            this.subscription = response;
        });
    }
}