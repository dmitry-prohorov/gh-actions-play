@isTest
private with sharing class NewClassTests {
  public NewClassTests() {
  }

  @isTest
  static void test1() {
    NewClass.simple();
    system.assert(true);
  }
}
