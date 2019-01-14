
const Contract1 = artifacts.require("./Test_FullData.sol")

module.exports = function(deployer) {
	deployer.deploy(Contract1);
};
