const main = async () => {
  const [deployer, playerOne, playerTwo,playerThree] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account: ", deployer.address);

  // Showing the balances of all the three accounts
  console.log(`${playerOne.address} balance:`, await getPlayerBalance(playerOne));
  console.log(`${playerTwo.address} balance:`, await getPlayerBalance(playerTwo));
  console.log(`${playerThree.address} balance:`, await getPlayerBalance(playerThree));

  const lotteryContractFactory = await hre.ethers.getContractFactory("Lottery");
  const lotteryContract = await lotteryContractFactory.deploy();
  await lotteryContract.deployed();
  console.log("Contract Address:", lotteryContract.address);

  await getInfoAboutLottery(lotteryContract);

  console.log("Player One enters the lottery");
  let lotteryAmount = hre.ethers.utils.parseEther("0.02");
  await playLottery(lotteryContract, playerOne, lotteryAmount);

  console.log("Player Two enters the lottery");
  lotteryAmount = hre.ethers.utils.parseEther("0.2");
  await playLottery(lotteryContract, playerTwo, lotteryAmount);

  console.log("Player Three enters the lottery");
  lotteryAmount = hre.ethers.utils.parseEther("2");
  await playLottery(lotteryContract, playerThree, lotteryAmount);

  console.log("Picking the winner");
  await lotteryContract.pickWinner();
  await getInfoAboutLottery(lotteryContract);

  // Showing the balances of all the three accounts after the lottery results
  console.log(`${playerOne.address} balance:`, await getPlayerBalance(playerOne));
  console.log(`${playerTwo.address} balance:`, await getPlayerBalance(playerTwo));
  console.log(`${playerThree.address} balance:`, await getPlayerBalance(playerThree));
};

const getInfoAboutLottery = async (contract) => {
  console.log("LOTTERY INFO:")
  let players = await contract.getPlayers();
  let winner = await contract.getWinner();
  let amount = await contract.getAmount();
  console.log("Players:", players);
  console.log("Winner:", winner);
  console.log("Amount:", hre.ethers.utils.formatEther(amount));
};

const playLottery = async (contract, player, amount) => {
  await contract.connect(player).enter({ value: amount });
  await getInfoAboutLottery(contract);
};

const getPlayerBalance = async (player) => {
  const amount = await player.getBalance();
  return hre.ethers.utils.formatEther(amount)
}

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

// npx hardhat run scripts/run.js
