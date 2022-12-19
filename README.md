# Simple Solidity Lottery Contract

This is a simple lottery contract written in Solidity. It is a simple lottery contract that allows users to buy tickets for a lottery. The contract will pick a winner at random and send them the entire pot. The owner can choose when to pick the winner, but the owner cannot choose who the winner is it is randomized(not fully). 

This is modified version of [Solidity Lottery Contract](https://github.com/Scofield-Idehen/Lottery_Contract) by [Scofield Idehen](https://github.com/Scofield-Idehen)

We are using the [Hardhat](https://hardhat.org/) development environment to compile and deploy the contract and [Alchemy](https://alchemyapi.io/) API to deploy the contract to the Goerli testnet.

## Useful Scripts

### See an example of the contract in action

```bash
npx hardhat run scripts/run.js
```

### Deploy the contract to the Goerli testnet

Copy the `.env.example` file to `.env` and fill in the private key and alchemy project key url for the Goerli testnet.

```bash
cp .env.example .env
```

Then run the deploy script.

```bash
npx hardhat run scripts/deploy.js --network goerli
```

This will also generate the ABI in the `artifacts` folder which you can use to interact with the contract in the frontend.

## Limitations

- [ ] The owner can choose when to pick the winner
- [ ] Lack of randomness in the pickWinner function: As mentioned earlier, the pickWinner function relies on the random() function to pick a winner. However, the random() function is not truly random, as it uses the block timestamp and the array of players as inputs. This means that the winner is not picked completely at random, and an attacker may be able to predict the winner with some degree of probability.
- [ ] If a user buys a ticket multiple times, they will be entered into the lottery multiple times. This means that the user has a higher chance of winning the lottery, which can be exploited by an attacker.

**_NOTE:_** *It would be more secure to use a more reliable source of randomness, such as calling the random function in the Chainlink library or using a source of external randomness*



