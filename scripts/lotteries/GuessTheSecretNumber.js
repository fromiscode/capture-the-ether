async function main() {
    Challenge = await ethers.getContractFactory('GuessTheSecretNumberChallenge');
    challenge = await Challenge.attach('0x8FA89C5651a1578D9e2dab7A90dB5C980944ffAf');
    answer_hash = '0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365';
    for (let i = 0; i < (2**8); i++) {
        if (ethers.utils.keccak256(i) === answer_hash) {
            tx = await challenge.guess(i, {value:ethers.utils.parseEther('1')});
            console.log(tx);
            await tx.wait();
            break;
        }
    }
    console.log('Challenge completed:', await challenge.isComplete());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  })