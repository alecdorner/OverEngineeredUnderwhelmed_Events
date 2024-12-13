import { LightningElement, api, wire } from 'lwc';
import { APPLICATION_SCOPE, 
    createMessageContext,
    MessageContext,
    publish,
    releaseMessageContext,
    subscribe,
    unsubscribe } from 'lightning/messageService';

import statusChangeCompleted from '@salesforce/messageChannel/StatusChangeCompleted__c';

export default class ParentComp extends LightningElement {

    @wire(MessageContext)
    messageContext;

    handleStatusChange(){
        
        publish(this.messageContext, statusChangeCompleted, {});
    }
}