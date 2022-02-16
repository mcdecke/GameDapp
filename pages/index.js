import React, {Component} from 'react';
import { Card, Button  } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class PlayerIndex extends Component {
  static async getInitialProps(){
    const players = await factory.methods.getDeployedMonsterOwners().call()

    return {  players };
  }

  renderPlayers(){
    const items = this.props.players.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/${address}`}>
            <a>View Monster</a>
          </Link>
        ),
        fluid: true
      };
    });
    return <Card.Group items={items} />
  }
  //render after button for 2 colums
  render(){
    return (
      <Layout>
        <div>
          <h3>Newest Monsters</h3>
          <Link route="/new">
            <a>
              <Button floated='right'
                content="Create Monster" icon="add circle"
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
