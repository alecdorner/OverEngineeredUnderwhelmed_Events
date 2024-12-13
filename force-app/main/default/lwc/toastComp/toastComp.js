import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { APPLICATION_SCOPE, 
    createMessageContext,
    MessageContext,
    publish,
    releaseMessageContext,
    subscribe,
    unsubscribe } from 'lightning/messageService';

import statusChangeCompleted from '@salesforce/messageChannel/StatusChangeCompleted__c';

export default class ToastComp extends LightningElement {

    subscription;

    @wire(MessageContext)
    messageContext;



    connectedCallback(){

        this.subscribeToEvent();
    }

    subscribeToEvent(){
        this.subscription = subscribe(
            this.messageContext,
            statusChangeCompleted,
            (message) => this.handleMessage(message),
            { scope: APPLICATION_SCOPE }
        );
    }

    handleMessage(message){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Status Change Completed',
                message: 'Status change was completed successfully!',
                variant: 'success'
            })
        );
    }
}