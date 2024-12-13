trigger StatusChangeInProgressTrigger on Status_Change_in_Progress__e (after insert) {

    List<Status_Change_Completed__e> eventList = new List<Status_Change_Completed__e>();
    List<Case> casesToUpdate = new List<Case>();
    List<Case_Status_Change__c> statusChangesToUpdate = new List<Case_Status_Change__c>();

    Set<Id> caseStatusChangeIds = new Set<Id>();

    for(Status_Change_in_Progress__e event : Trigger.new){

        caseStatusChangeIds.add(event.Case_Status_Change_ID__c);
    }

    System.debug(caseStatusChangeIds);

    for(Case_Status_Change__c chng : [SELECT Id, Case__c FROM Case_Status_Change__c WHERE Id IN :caseStatusChangeIds]){

        casesToUpdate.add(new Case(Id = chng.Case__c, Status = 'Working'));
        statusChangesToUpdate.add(new Case_Status_Change__c(Id = chng.Id, Status__c = 'Completed'));

        eventList.add(new Status_Change_Completed__e(Case_ID__c = chng.Case__c));
    }

    update casesToUpdate;
    update statusChangesToUpdate;
    EventBus.publish(eventList);
}