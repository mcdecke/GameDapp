const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/MonsterOwnerFactory.json');

//these should go in an env
const phrase = 'alarm inject negative life spawn casino notable cactus alarm local brief hand';
const endpt = 'https://rinkeby.infura.io/v3/3a04022ced214e0ab4ce51cb9a40805e';

const provider = new HDWalletProvider(
  phrase, endpt
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '2000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
