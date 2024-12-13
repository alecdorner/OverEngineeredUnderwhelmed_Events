trigger CaseStatusChangeChangeEventTrigger on Case_Status_Change__ChangeEvent (after insert) {

    System.debug('CaseStatusChangeChangeEventTrigger');


    List<Status_Change_in_Progress__e> eventList = new List<Status_Change_in_Progress__e>();


    for(Case_Status_Change__ChangeEvent event : Trigger.new){

        EventBus.ChangeEventHeader header = event.ChangeEventHeader;

        System.debug(header.changetype);

        if(header.changetype == 'CREATE'){

            for(String recordId : header.getRecordIds()){
                eventList.add(new Status_Change_in_Progress__e(Case_Status_Change_ID__c = recordId));
            }
        }
    }

    if(!eventList.isEmpty()){
        EventBus.publish(eventList);
    }
}