var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "DVYzoMG1kPAFxLgTLE12";
var mnemonic = "mean cheap baby retire short hurry gym sniff spoil inner early shoot";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8546,
      network_id: "*" // Match any network id
    },
     ropsten:  {
     network_id: 2,
     host: "localhost",
     port:  8545,
     gas:   5000000
   },
    infura:  {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+"DVYzoMG1kPAFxLgTLE12"),
      network_id: 3
  }
 }
};
