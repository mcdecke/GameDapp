import web3 from './web3';
import MonsterOwnerFactory from './build/MonsterOwnerFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(MonsterOwnerFactory.interface),
  '0xD835AF823c995E674B33A7b8d4d1f9737467f554'
);

export default instance;
