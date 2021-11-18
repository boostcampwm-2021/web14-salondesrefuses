const SalonDesRefuse = artifacts.require("SalonDesRefuse");
const fs = require("fs");

module.exports = async function (deployer) {
	await deployer.deploy(SalonDesRefuse);
	const instance = await SalonDesRefuse.deployed();
	instance.address;
	if (!fs.existsSync("./build/address/")) {
		fs.mkdirSync("./build/address/", "0777", true);
	}
	fs.writeFileSync(
		"./build/address/" + "SalonDesRefusesAddress.json",
		`{"name": "SalonDesRefusesAddress", "address":"${instance.address}"}`
	);
};
