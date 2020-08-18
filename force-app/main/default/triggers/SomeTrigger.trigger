trigger SomeTrigger on Category__c(before insert) {
  NewClass.simple();
}
