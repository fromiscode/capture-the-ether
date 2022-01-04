async function main() {
    Challenge = await ethers.getContractFactory('PublicKeyChallenge');
    challenge = await Challenge.attach('0x8311aA185B55A33Ef1adcd2326dcF46DF8A04227');

    tx = await ethers.provider.getTransaction('0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb');
    expandedSig = {
        r: tx.r,
        s: tx.s,
        v: tx.v,
    }
    sig = ethers.utils.joinSignature(expandedSig);
    txData = {
        gasPrice: tx.gasPrice,
        gasLimit: tx.gasLimit,
        value: tx.value,
        nonce: tx.nonce,
        data: tx.data,
        chainId: tx.chainId,
        to: tx.to,
    }
    raw = ethers.utils.serializeTransaction(txData);
    msgHash = ethers.utils.keccak256(raw);  
    msgBytes = ethers.utils.arrayify(msgHash);
    recoveredPubKey = ethers.utils.recoverPublicKey(msgBytes, sig);

    tx = await challenge.authenticate(ethers.utils.hexDataSlice(recoveredPubKey, 1));
    await tx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error.message);
      process.exit(1);
  })