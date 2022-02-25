import web3 from './web3';
import MonsterOwnerFactory from './build/MonsterOwnerFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(MonsterOwnerFactory.interface),
  '0x953E0763075047dad685f8148beB246b67CAc216'
);

export default instance;
