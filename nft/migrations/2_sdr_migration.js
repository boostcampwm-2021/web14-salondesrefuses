const SalonDesRefuse = artifacts.require("SalonDesRefuse");

module.exports = async function (deployer) {
  await deployer.deploy(SalonDesRefuse);
};
