//SPDX-License-Identifier: MIT 

pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address[] public players;

    address public winner;
    uint public amount;

    constructor ()  {
       manager = msg.sender;
    }
    
    function enter() public payable{
        // stop if the lottery is already won
        require(winner == address(0),"Lottery is already won.");
        require(msg.value > .01 ether,"Need minimum .01 ether to enter this lottery."); // need minimum 0.01 eth to enter the lottery
        amount += msg.value;
        players.push(msg.sender);
    }

    //creates a random hash that will become our winner
    function random() private view returns(uint){
        return  uint (keccak256(abi.encode(block.timestamp,  players)));
    }

    function pickWinner() public restricted{
        //only the manager can call pickWinner
        //require(msg.sender == manager);
        //creates index that is gotten from func random % play.len
        uint index = random() % players.length;
        //pays the winner picked randomly(not fully random)
        (bool sent,) = payable(players[index]).call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        winner = players[index];
    }

    function getPlayers() public view returns(address[] memory){
        return players;
    }

    function getWinner() public view returns(address){
        return winner;
    }

    function getAmount() public view returns(uint){
        return amount;
    }

    modifier restricted(){
        require(msg.sender == manager,"Only the manager can call this function.");
        // also check if winner is not already picked
        require(winner == address(0),"Winner is already picked.");
        _;
    }
}