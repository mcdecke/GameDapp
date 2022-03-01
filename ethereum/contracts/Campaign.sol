pragma solidity ^0.4.17;
// SPDX-License-Identifier: MIT

contract MonsterOwnerFactory {
    address[] public deployedMonsterOwners;

    function createMonsterOwner() public {
        address newMonsterOwner = new MonsterOwner(msg.sender);
        deployedMonsterOwners.push(newMonsterOwner);
    }

    function getDeployedMonsterOwners() public view returns (address[]) {
        return deployedMonsterOwners;
    }

    address public owner = msg.sender;

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function getMinter() external view returns(address){
        return owner;
    }
}


contract MonsterOwner{

    struct Monster {
        string name;
        uint strength;
        uint speed;
        uint defense;
        uint maxHealth;
        uint currentHealth;
        uint maxEnergy;
        uint currentEnergy;
        uint exp;
        string url;
    }

    Monster[] public monsters;

    address public manager;

    address minter = msg.sender;

    function getFactoryCreator() public view returns (address) {
        address mof = MonsterOwnerFactory(minter).getMinter();
        return (mof);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getMinter() external view returns(address){
        return minter;
    }

    function MonsterOwner(address creator) public{
        manager = creator;
    }

    function createMonster(string name, string url) public restricted {
        Monster memory newStat = Monster({
            name: name,
            strength: 1,
            speed: 1,
            defense: 1,
            maxHealth: 3,
            currentHealth: 3,
            maxEnergy: 3,
            currentEnergy: 3,
            exp: 10,
            url: url
        });
        monsters.push(newStat);
    }

    function healMonster(uint mon) public restricted returns (uint,uint) {
        require (monsters[mon].currentEnergy >= 1);
        return (
            monsters[mon].currentHealth = monsters[mon].maxHealth,
            monsters[mon].currentEnergy -= 1
        );
    }

    function harmMonster(uint mon) public restricted returns (uint) {
        if(monsters[mon].currentHealth <= 1){
            return monsters[mon].currentHealth = 0;
        } else {
            return monsters[mon].currentHealth -= 1;
        }
    }

    function gainExp(uint mon, uint amount) internal restricted returns (uint) {
        return (
            monsters[mon].exp += amount
        );
    }

    function gainEnergy(uint mon) public payable restricted returns (uint) {
        uint amt = msg.value;
        require(amt >= 1 wei);
        address bene = this.getFactoryCreator();
        bene.transfer(msg.value);
        return (
            monsters[mon].currentEnergy = monsters[mon].maxEnergy
        );
    }

    function loseEnergy(uint mon) public restricted returns (uint) {
        return ( monsters[mon].currentEnergy -= 1 );
    }

    function train(uint mon, uint amount) internal restricted returns (uint, uint) {
        require (monsters[mon].currentEnergy >= amount);
        return (
            gainExp(mon, amount),
            loseEnergy(mon)
        );
    }

    function lvlUp(uint mon, uint amount, uint stat) public restricted  returns ( uint,uint,uint) {
      require( monsters[mon].exp/10 >= amount);
        if(stat == 1){
        return (
            monsters[mon].strength += amount,
            monsters[mon].exp -= 10*amount,
            monsters[mon].currentHealth = monsters[mon].maxHealth
            );
        }

        if(stat == 2){
        return (
            monsters[mon].speed += amount,
            monsters[mon].exp -= 10*amount,
            monsters[mon].currentHealth = monsters[mon].maxHealth
            );
        }

        if(stat == 3){
        return (
            monsters[mon].maxHealth += amount,
            monsters[mon].exp -= 10*amount,
            monsters[mon].currentHealth = monsters[mon].maxHealth
            );
        }

        if(stat == 4){
        return (
            monsters[mon].defense += amount,
            monsters[mon].exp -= 10*amount,
            monsters[mon].currentHealth = monsters[mon].maxHealth
            );
        }

    }

    function rename(uint mon, string newName, string newUrl) public restricted returns ( string, string ) {
        return (
            monsters[mon].name = newName,
            monsters[mon].url = newUrl
        );
    }

    function getMonsterCount() public view returns (uint) {
      return monsters.length;
    }

}
