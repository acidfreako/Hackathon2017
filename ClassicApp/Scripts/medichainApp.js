App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        // Load contracts.


        return App.initWeb3();
    },

    initWeb3: function () {
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
        $.getJSON('/MLCMediChainLab/Medichain.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            var MedichainArtifact = data;
            App.contracts.Medichain = TruffleContract(MedichainArtifact);

            // Set the provider for our contract.
            console.log('App.web3Provider ');
            console.log(App.web3Provider);
            App.contracts.Medichain.setProvider(App.web3Provider);
            App.requestTest(1, 100);
           // App.requestTest(2, 100);
            //console.log(App.getTestData());
            //console.log(App.labTestsSize());
            //console.log(App.getCountOfLabTests());
            App.getCountOfLabTests();
            // App.labTestsSize();

            // Use our contract to retieve and mark the adopted pets.
            return App.getTestData();
        });
    },

    getTestData: function () {
        var adoptionInstance;

        App.contracts.Medichain.deployed().then(function (instance) {
            adoptionInstance = instance;

            return adoptionInstance.getTestData.call();
        }).then(function (results) {
            var localResults = results;
            console.log('getTestData results');
            console.log(localResults);
            return results;
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    getLabTestResult: function (customerId, testId) {
        var adoptionInstance;

        App.contracts.Medichain.deployed().then(function (instance) {
            adoptionInstance = instance;

            return adoptionInstance.getLabTestResult.call(customerId, testId);
        }).then(function (results) {
            return results;
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    labTests: function (input) {//aaron ?
        var adoptionInstance;

        App.contracts.Medichain.deployed().then(function (instance) {
            adoptionInstance = instance;

            return adoptionInstance.labTests.call(input);
        }).then(function (results) {
            return results;
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    acceptLabTest: function (customerId, testId) {
        var adoptionInstance;

        App.contracts.Medichain.deployed().then(function (instance) {
            adoptionInstance = instance;

            return adoptionInstance.acceptLabTest.call(customerId, testId);
        }).then(function (results) {
            return results;
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    getCountOfLabTests: function () {
        var adoptionInstance;

        App.contracts.Medichain.deployed().then(function (instance) {
            adoptionInstance = instance;
            //meta.getBalance.call(account_one, { from: account_one }).then(function (balance) {
            //    // If this callback is called, the call was successfully executed.
            //    // Note that this returns immediately without any waiting.
            //    // Let's print the return value.
            //    console.log(balance.toNumber());
            //}).catch(function (e) {
            //    // There was an error! Handle it.
            //})
            return adoptionInstance.getCountOfLabTests.call();
        }).then(function (results) {
            //console.log('getCountOfLabTests results');
            //console.log(results);
            console.log('requestTest results');
            console.log(results);
            console.log('requestTest results.tx');
            console.log(results.tx);
            console.log('requestTest results.logs');
            console.log(results.logs);
            console.log('requestTest results.receipt');
            console.log(results.receipt);

            return results;
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    completeLabTest: function (customerId, testId, result) {
        var adoptionInstance;

        App.contracts.Medichain.deployed().then(function (instance) {
            adoptionInstance = instance;

            return adoptionInstance.completeLabTest.call(customerId, testId, result);
        }).then(function (results) {
            return results;
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    getLabTestStatus: function (customerId, testId) {
        var adoptionInstance;

        App.contracts.Medichain.deployed().then(function (instance) {
            adoptionInstance = instance;

            return adoptionInstance.getLabTestStatus.call(customerId, testId);
        }).then(function (results) {
            return results;
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    requestTest: function (customerId, testId) {
        var adoptionInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];
            console.log('account : ');
            console.log(account);
            //console.log('App.contracts.Medichain :');
            //console.log(App.contracts.Medichain);
            //console.log('App.contracts.Medichain.deployed() :');
            //console.log(App.contracts.Medichain.deployed());
        
            App.contracts.Medichain.deployed().then(function (instance) {
                adoptionInstance = instance;
                console.log('adoptionInstance : ');
                console.log(adoptionInstance);
               // return adoptionInstance.requestTest.call(customerId, testId, { from: account });
               // var getData = myContract.myFunction.getData(function parameters);
                //web3.eth.sendTransaction({ to: Contractaddress, from: Accountaddress, data: getData });
                var account_one = "0xe9907858d7098f1c57cc45280fa2d39df503d4fb";
                //return adoptionInstance.requestTest.call(customerId, testId, { from: account });
                return adoptionInstance.requestTest(customerId, testId, { from: account_one });
                //adoptionInstance.requestTest.call(customerId, testId, { from: account_one }).then(function (tx_id) {
                //    var localResult = tx_id;
                //    console.log('tx_id ');
                //    console.log(localResult);
                //    alert("Transaction successful2!")
                //}).catch(function (e) {
                //    console.log(e);
                //})
            }).then(function (results) {
                console.log('requestTest results');
                console.log(results);
                console.log('requestTest results.tx');
                console.log(results.tx);
                console.log('requestTest results.logs');
                console.log(results.logs);
                console.log('requestTest results.receipt');
                console.log(results.receipt);
                return results;
                }).catch(function (err) {
                    console.log('requestTest *********************errors*************************');
                console.log(err.message);
            });
        });

            
    },

    //labTestsSize: function () {
    //    var adoptionInstance;

    //    App.contracts.Medichain.deployed().then(function (instance) {
    //        adoptionInstance = instance;

    //        return adoptionInstance.labTestsSize.call();
    //    }).then(function (results) {
    //        console.log('labTestsSize results');
    //        console.log(results);
    //        return results;
    //    }).catch(function (err) {
    //        console.log(err.message);
    //    });
    //},

};

$(function () {
    //$(window).load(function() {
    App.init();
    //});
});
