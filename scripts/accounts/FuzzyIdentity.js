async function main() {
    [owner] = await ethers.getSigners();
    Challenge = await ethers.getContractFactory('FuzzyIdentityChallenge');
    challenge = await Challenge.attach('0x2EE951b3b4D6b91F325Bfb95F399f1496FE0868E');

    wallet = new ethers.Wallet('0x7252f4fa9fcb404d68e3dc31a68f2d10664befee1c467870a37f437f3a43512c', ethers.provider);
    tx = await owner.sendTransaction({to: wallet.address, value: ethers.utils.parseEther('1')});
    await tx.wait();
    Exploit = await ethers.getContractFactory('FuzzyIdentityExploit', wallet);
    exploit = await Exploit.deploy(challenge.address);
    await exploit.deployed();
    tx = await exploit.exploit();
    await tx.wait();
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error.message);
      process.exit(1);
  })