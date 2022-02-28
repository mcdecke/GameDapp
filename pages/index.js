import React, {Component} from 'react';
import { Card, Button  } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import monsterOwner from '../ethereum/monster';

class PlayerIndex extends Component {

  state = {
    owner: 'Other'
  }

  static async getInitialProps(){
    console.log("GIP");
    const players = await factory.methods.getDeployedMonsterOwners().call()
    const account = await web3.eth.getAccounts()
    return {  account, players};
  }

  renderPlayers(){
    var playerList = [];
    var hidden = false;

    const items = this.props.players.map(address => {

      const creater = monsterOwner(address).methods.manager().call().then((res) => {
        if (res == this.props.account[0]){
          playerList.push(address)
        }
        console.log("Player List: ", playerList, playerList.indexOf(address));
      });
      console.log(address, "!", creater[0]);

      return {
        header: address,
        description: (
          <Link route={`/${address}`} >
            <a>Owned by you.</a>
          </Link>
        ),
        fluid: true
      }
    });
    return <Card.Group items={items} />
  }

  //render after button for 2 colums
  render(){
    return (
      <Layout>
        <div>
          <h3>Newest Players</h3>
          <Link route="/new">
            <a>
              <Button floated='right'
                content="Create Player" icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderPlayers()}

        </div>
      </Layout>
    )
  }
}

export default PlayerIndex;


// renderPlayers(){
//     var playerList = [];
//     const items = this.props.players.map(address => {
//       const creater = monsterOwner(address).methods.manager().call().then((res) => {
//         if (res == this.props.account[0]){
//           this.state.playerList.push(address);
//         }
//       }
//     )
//   })
// }
