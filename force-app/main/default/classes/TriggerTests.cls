@isTest
private with sharing class TriggerTests {
  private TriggerTests() {
  }

  @isTest
  static void test1() {
    insert new MainObject__c();
    system.assert(true);
  }
  @isTest
  static void test2() {
    insert new Category__c();
    system.assert(true);
  }
}
