import * as hre from "hardhat";

async function main() {

  const VideoStorage = await hre.ethers.getContractFactory("VideoStorage");
  const videoStorage = await VideoStorage.deploy();

  await videoStorage.deployed();

  console.log("Video Storage deployed to:", videoStorage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
