pragma solidity ^0.4.17;

/* import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol" */

contract MonsterOwnerFactory {
    address[] public deployedMonsterOwners;

    function createMonsterOwner() public {
        address newMonsterOwner = new MonsterOwner(msg.sender);
        deployedMonsterOwners.push(newMonsterOwner);
    }

    function getDeployedMonsterOwners() public view returns (address[]) {
        return deployedMonsterOwners;
    }
}


contract MonsterOwner{

    struct Monster {
        string name;
        uint strength;
        uint speed;
        uint defense;
        uint health;
        uint exp;
    }

    Monster[] public monsters;
    address public manager;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function MonsterOwner(address creator) public{
        manager = creator;
    }

    function createMonster(string name) public restricted {
        Monster memory newStat = Monster({
            name: name,
            strength: 1,
            speed: 1,
            health: 3,
            defense: 1,
            exp: 10
        });
        monsters.push(newStat);
    }


     function getSummary(uint spot) public view returns ( uint,uint,uint,uint ) {
       return (
           monsters[spot].strength,
           monsters[spot].speed,
           monsters[spot].health,
           monsters[spot].defense
           );
     }

    function lvlUp(uint mon, uint amount) public restricted  returns ( uint,uint ) {
      require( monsters[mon].exp >= amount);
        return (
            monsters[mon].strength += amount,
            monsters[mon].exp -= amount
            );
    }

    function rename(uint spot, string newName) public restricted returns ( string ) {
        return (
            monsters[spot].name = newName
        );
    }

    function gainExp(uint spot, uint amount) internal restricted returns (uint) {
        // amount = current block # - block @ last lvlUp + exp after last level up.
        // user pays to gain exp, but exp is time gated
        // need to find a way to add exp from smart contract (e.g. - winning a battle).

        return (
            monsters[spot].exp += amount
        );
    }

    // function battle(uint spot, address other) public restricted returns (address) {
    //     return (
    //         other
    //     );
    // }


    function getMonsterCount() public view returns (uint) {
      return monsters.length;
    }
}
