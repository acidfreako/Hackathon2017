App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load contracts.


    return App.initWeb3();
  },

  initWeb3: function() {
	// Is there is an injected web3 instance?
	if (typeof web3 !== 'undefined') {
		console.log('using injected web3');
	  App.web3Provider = web3.currentProvider;
	  web3 = new Web3(web3.currentProvider);
	} else {
	  // If no injected web3 instance is detected, fallback to the TestRPC.
	  App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545'); 
	  console.log('using local http://localhost:8545');
	  web3 = new Web3(App.web3Provider);
	}
    return App.initContract();
  },

  initContract: function () {
      $.getJSON('/MLCMediChainLab/Medichain.json', function(data) {
	  // Get the necessary contract artifact file and instantiate it with truffle-contract.
	  var MedichainArtifact = data;
      App.contracts.Medichain = TruffleContract(MedichainArtifact);

	  // Set the provider for our contract.
	  App.contracts.Medichain.setProvider(App.web3Provider);
      console.log(App.getTestData());
	  // Use our contract to retieve and mark the adopted pets.
      return App.getTestData();
	});



	//$.getJSON('Adoption.json', function(data) {
	//  // Get the necessary contract artifact file and instantiate it with truffle-contract.
	//  var AdoptionArtifact = data;
	//  App.contracts.Medichain = TruffleContract(AdoptionArtifact);

	//  // Set the provider for our contract.
	//  App.contracts.Medichain.setProvider(App.web3Provider);

	//  // Use our contract to retieve and mark the adopted pets.
	// // return App.markAdopted();
	//});

  //  return App.bindEvents();
  },

 

 // markAdopted: function(adopters, account) {
	//var adoptionInstance;

	//App.contracts.Medichain.deployed().then(function(instance) {
	//  adoptionInstance = instance;

	//  return adoptionInstance.getAdopters.call();
	//}).then(function(adopters) {
	//  for (i = 0; i < adopters.length; i++) {
	//	if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
	//	  $('.panel-pet').eq(i).find('button').text('Pending...').attr('disabled', true);
	//	}
	//  }
	//}).catch(function(err) {
	//  console.log(err.message);
	//});
 // }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
