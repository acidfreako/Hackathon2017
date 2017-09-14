pragma solidity ^0.4.15;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Medichain.sol";

/*// Proxy contract for testing throws
contract ThrowProxy {
  address public target;
  bytes data;

  function ThrowProxy(address _target) {
    target = _target;
  }

  //prime the data using the fallback function.
  function() {
    data = msg.data;
  }

  function execute() returns (bool) {
    return target.call(data);
  }
}

// Contract you're testing
contract Thrower {
  function doThrow() {
    throw;
  }

  function doNoThrow() {
    //
  }
}*/

contract TestMedichain {

  function testRequestLabTest() {
    Medichain medi = new Medichain();

    uint customerId = 123;
    uint testId = 999;

    medi.requestTest(customerId, testId);
    Assert.equal(medi.getCountOfLabTests(),1, "There should be only 1 lab test in the contract");
  }

  function testRequestTwoLabTests() {
    Medichain medi = new Medichain();

    uint customerId = 123;
    uint testId = 999;
    medi.requestTest(customerId, testId);

    customerId = 456;
    testId = 222;
    medi.requestTest(customerId, testId);

    Assert.equal(medi.getCountOfLabTests(), 2, "There should be 2 lab tests in the contract");
  }

  function testPendingLabTest() {
    Medichain medi = new Medichain();

    uint customerId = 123;
    uint testId = 999;

    medi.requestTest(customerId, testId);
    Assert.equal(medi.getLabTestStatus(customerId, testId), 1, "Lab test status should be 1 (Pending) for a new lab test");
  }

  function testLabTestNotFound() {
    Medichain medi = new Medichain();
    Assert.equal(medi.getLabTestStatus(1, 1), 0, "Lab test status should be 0 (Not Found) for a lab test not pushed to the contract");
  }

  function testAcceptLabTest() {
    Medichain medi = new Medichain();

    uint customerId = 123;
    uint testId = 999;
    medi.requestTest(customerId, testId);

    medi.acceptLabTest(customerId, testId);
    Assert.equal(medi.getLabTestStatus(customerId, testId), 2, "Lab test status after Acceptance should be 2 (Accepted)");
  }

  function testCompleteLabTest() {
    Medichain medi = new Medichain();

    uint customerId = 123;
    uint testId = 999;
    uint result = 111;
    medi.requestTest(customerId, testId);
    medi.acceptLabTest(customerId, testId);

    medi.completeLabTest(customerId, testId, result);
    Assert.equal(medi.getLabTestStatus(customerId, testId), 3, "Lab test status after Completion should be 3 (Completed)");
  }

  function testCompleteLabTestResult() {
    Medichain medi = new Medichain();

    uint customerId = 123;
    uint testId = 999;
    uint result = 111;
    medi.requestTest(customerId, testId);
    medi.acceptLabTest(customerId, testId);

    medi.completeLabTest(customerId, testId, result);
    Assert.equal(medi.getLabTestResult(customerId, testId), 111, "Lab test result after Completion should be 111");
  }


  /*function testCannotAcceptLabTestTwice() {
    Medichain medi = new Medichain();

    uint customerId = 123;
    uint testId = 999;
    medi.requestTest(customerId, testId);

    medi.acceptLabTest(customerId, testId);

    ThrowProxy throwProxy = new ThrowProxy(address(medi)); //set medi as the contract to forward requests to. The target.

    //prime the proxy.
    Thrower(address(throwProxy)).acceptLabTest(customerId, testId);
    //execute the call that is supposed to throw.
    //r will be false if it threw. r will be true if it didn't.
    //make sure you send enough gas for your contract method.
    bool r = throwProxy.execute.gas(200000)();

    Assert.isFalse(r, "Accepting a lab test twice should throw");

    Asset.isTrue(true, "Test not yet implmeneted");
  }*/

}
