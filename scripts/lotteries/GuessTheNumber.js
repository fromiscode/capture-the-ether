async function main() {
    Challenge = await ethers.getContractFactory('GuessTheNumberChallenge');
    challenge = await Challenge.attach('0xAeEC60b543FA4d866C9E8a6E5A380d47540f5428');
    tx = await challenge.guess(ethers.BigNumber.from('42'), {value:ethers.utils.parseEther('1')});
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