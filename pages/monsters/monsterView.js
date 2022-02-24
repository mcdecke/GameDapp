import React, { Component } from 'react';
import { Form, Button, Input, Message, Card, Segment } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router, Link } from '../../routes';
import monsterOwner from '../../ethereum/monster';

class MonsterNew extends Component {

  static async getInitialProps(props){
    let mons = []
    // current player
    const player = monsterOwner(props.query.address);
    // address managing player
    const manager = await player.methods.manager().call();
    // console.log(props.query.address+"!: ", manager);
    const monsterCount = await player.methods.getMonsterCount().call();
    for (var i = 0; i < monsterCount; i++) {
      mons[i] = await player.methods.monsters(i).call();
    }
    // console.log(mons);
    return {
      PlayerAccount: props.query.address,
      manager,
      monsterCount,
      mons
    };
  }

  renderCards() {

    const PlayerAccount = this.props.PlayerAccount

    const items = this.props.mons.map(mon => {

      const {
        defense, exp, health, name, speed, strength
      } = mon;

      return {
        header: `${name} - Energy/MaxEng`,
        image: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
        meta: `monster descriptsion`,
        description: `Hp: ${health} Strength: ${strength} Defense: ${defense} Speed: ${speed} Exp: ${exp}`,
      };
    });
    return <Card.Group items={items} />;
  }

  state = {
    name: '',
    errorMessage: '',
    loading: false
  };


  onSubmit = async (event) => {
    event.preventDefault();
    this.renderCards();
  };

  render(){
    return (
    <Layout>
      <h1>Monsters for {this.props.PlayerAccount}!</h1>
        {this.renderCards()}
    </Layout>
    )
  }
}

export default MonsterNew;
