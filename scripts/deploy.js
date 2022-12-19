const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account: ", deployer.address);
  const lotteryContractFactory = await hre.ethers.getContractFactory(
    "Lottery"
  );
  const lotteryContract = await lotteryContractFactory.deploy();
  await lotteryContract.deployed();

  console.log("Lottery Contract Address: ", lotteryContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

// npx hardhat run scripts/deploy.js --network goerli
