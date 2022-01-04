/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');
// require('ethers');
require('dotenv').config();

module.exports = {
  solidity: "0.4.21"
  , networks: {
    hardhat: {
      forking: {
        url: process.env.ROPSTEN_URI,
      },
      mining: {
        auto: false,
        interval: 150,
      },
    },
    ropsten: {
      url: process.env.ROPSTEN_URI,
      accounts: [process.env.PRIVATE_KEY1, process.env.PRIVATE_KEY2, process.env.PRIVATE_KEY3],
    },
  }
};
