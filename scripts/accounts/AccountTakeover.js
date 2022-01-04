function getMessageHash(tx) {
    txKeys = ['gasPrice', 'gasLimit', 'value', 'nonce', 'data', 'chainId', 'to'];
    copy = Object.assign({}, tx);
    Object.keys(copy).forEach((key) => txKeys.includes(key) || delete copy[key]);
    return ethers.utils.keccak256(ethers.utils.serializeTransaction(copy));
}
function getSignature(tx) {
    sigKeys = ['r', 's' ,'v'];
    copy = Object.assign({}, tx);
    Object.keys(copy).forEach((key) => sigKeys.includes(key) || delete copy[key]);
    return copy
}

function modinv(a, n) {
    b = n.sub(2);
    a = a.mod(n);
    var result = ethers.BigNumber.from(1);
    var x = a;
    while (b.gt(0)) {
        var leastSignificantBit = b.mod(2);
        b = b.div(2);
        if (leastSignificantBit.eq(1)) {
            result = result.mul(x);
            result = result.mod(n);
        }
        x = x.mul(x);
        x = x.mod(n);
    }
    return result;
};

async function main() {
    Challenge = await ethers.getContractFactory('AccountTakeoverChallenge');
    challenge = await Challenge.attach('0x6fd9204a40F3E75042316e40d13Fd3FF32aeFa92');

    tx1 = await ethers.provider.getTransaction('0x061bf0b4b5fdb64ac475795e9bc5a3978f985919ce6747ce2cfbbcaccaf51009');
    tx2 = await ethers.provider.getTransaction('0xd79fc80e7b787802602f3317b7fe67765c14a7d40c3e0dcb266e63657f881396');
    hashTx1 = getMessageHash(tx1);
    hashTx2 = getMessageHash(tx2);
    sig1 = getSignature(tx1);
    sig2 = getSignature(tx2);

    order = ethers.BigNumber.from('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141');
    r = ethers.BigNumber.from(sig1.r);
    s1 = ethers.BigNumber.from(sig1.s);
    s2 = ethers.BigNumber.from(sig2.s);
    z1 = ethers.BigNumber.from(hashTx1);
    z2 = ethers.BigNumber.from(hashTx2);
    k = z1.sub(z2).mul(modinv(s1.sub(s2), order)).mod(order);
    d = k.mul(s1).sub(z1).mul(modinv(r, order)).mod(order);
    wallet = new ethers.Wallet(d, ethers.provider);
    tx = await challenge.connect(wallet).authenticate();
    await tx.wait();
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error.message);
      process.exit(1);
  })