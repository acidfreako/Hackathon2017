pragma solidity ^0.4.15;

contract Medichain {

  enum LabTestStages{
    NotFound,
    Pending,
    Accepted,
    Completed,
    Cancelled
  }

  struct LabTest{
    address insurer; // insurer requesting test
    uint customerId;
    uint testId;
    LabTestStages status;
    address labProvider;
    uint result;
  }
  // Dynamically sized array of LabTests
  LabTest[] public labTests;
  uint public labTestsSize;

  function getCountOfLabTests() returns (uint){
    return labTestsSize;
  }

	function getTestData() public returns (uint) {
	  return 999999999;
	}

  // Iterate lab tests and returns status
  // Returns 0 if not found
  function getLabTestStatus(uint customerId, uint testId) returns (uint) {
    for(uint i = 0; i<labTestsSize; i++){
      if((labTests[i].customerId == customerId) && (labTests[i].testId==testId)){
        return uint256(labTests[i].status);
      }
    }
    return uint256(LabTestStages.NotFound);
  }

  function getLabTestResult(uint customerId, uint testId) returns (uint) {
    for(uint i = 0; i<labTestsSize; i++){
      if((labTests[i].customerId == customerId) && (labTests[i].testId==testId)){
        return uint256(labTests[i].result);
      }
    }
    return uint256(LabTestStages.NotFound);
  }

  function requestTest(uint customerId, uint testId){
    // MLC submit a test to the contract's storage
    LabTest memory newLabTest = LabTest( msg.sender,
                          customerId,
                          testId,
                          LabTestStages.Pending,
                          0,
                          0);
    labTests.push(newLabTest);
    labTestsSize++;
  }

  // Lab to notify they are beginning a test
  function acceptLabTest(uint customerId, uint testId){
      for(uint i = 0; i<labTestsSize; i++){
        if((labTests[i].customerId == customerId) && (labTests[i].testId==testId)){
          require(labTests[i].status==LabTestStages.Pending);
          labTests[i].status=LabTestStages.Accepted;
          labTests[i].labProvider=msg.sender;
        }
      }
  }

  // Lab to notify they are completing a test
  function completeLabTest(uint customerId, uint testId, uint result){
    for(uint i = 0; i<labTestsSize; i++){
      if((labTests[i].customerId == customerId) && (labTests[i].testId==testId)){
        require(labTests[i].status==LabTestStages.Accepted);
        require(labTests[i].labProvider==msg.sender);
        labTests[i].status=LabTestStages.Completed;
        labTests[i].result=result;
      }
    }
  }

}
