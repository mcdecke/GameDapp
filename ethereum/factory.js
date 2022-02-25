import web3 from './web3';
import MonsterOwnerFactory from './build/MonsterOwnerFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(MonsterOwnerFactory.interface),
  '0xe7d1c6010dc6318Fd21F046F322B5282D3E37eD1'
);

export default instance;
