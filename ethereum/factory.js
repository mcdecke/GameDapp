import web3 from './web3';
import MonsterOwnerFactory from './build/MonsterOwnerFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(MonsterOwnerFactory.interface),
  '0x91407c3e4f7C7aE4f87ad7FE8068dc826B72f2A3'
);

export default instance;
