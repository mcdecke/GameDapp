import React, { Component } from 'react';
import { Form, Button, Input, Message, Card, Segment } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router, Link } from '../../routes';
import monsterOwner from '../../ethereum/monster';

class MonsterView extends Component {

  state = {
    name: '',
    errorMessage: '',
    loading: false,
    view: 'hidden',
    number: 0,
    url: ''
  };

  static async getInitialProps(props){
    let mons = []
    // current player
    const player = await monsterOwner(props.query.address);
    // address managing player
    const manager = await player.methods.manager().call();
    // console.log(props.query.address+"!: ", manager);
    const monsterCount = await player.methods.getMonsterCount().call();
    for (var i = 0; i < monsterCount; i++) {
      mons[i] = await player.methods.monsters(i).call();
    }
    return {
      address: props.query.address,
      player,
      manager,
      monsterCount,
      mons
    };
  }

  renderCards() {
    const items = this.props.mons.map(mon => {

      const {
        defense, exp, currentHealth, maxHealth, currentEnergy, maxEnergy, name, speed, strength, url
      } = mon;

      return {
        header: (
          <Link route={`/${this.props.address}/${name}`}>
            <a>{name}</a>
          </Link>
          ),
        image: `${url}`,
        meta: `Hp: ${currentHealth}/${maxHealth} Energy: ${currentEnergy}/${maxEnergy}`,
        description: `Strength: ${strength} Defense: ${defense} Speed: ${speed} Exp: ${exp}`,

      };

    });

    return <Card.Group style={{padding: "10px"}} items={items} />;
  }


  // New Monster

  // onSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(this.state.number, this.state.name, this.props.manager, this.props.address);
  //   this.setState({loading: true, errorMessage: ''})
  //   try {
  //     const accounts = await web3.eth.getAccounts();
  //     const owner = await monsterOwner(accounts[0]);
  //     console.log('acct:', accounts[0], owner, this.state.number, this.state.name, this.state.url);
  //     await owner.methods.rename(this.state.number, this.state.name, this.state.url)
  //     .send({
  //       from: accounts[0]
  //     });
  //     Router.pushRoute(`/${this.props.address}`)
  //   } catch (err) {
  //       this.setState({errorMessage: err.message });
  //   }
  //   this.setState({loading: false})
  // };


  // Rename

  // onSubmit = async (event) => {
  //   event.preventDefault();
  //   this.setState({loading: true, errorMessage: ''})
  //   const player = monsterOwner(this.props.address);
  //   try {
  //     const accounts = await web3.eth.getAccounts();
  //     console.log(accounts, player);
  //     await player.methods.rename(this.state.number, this.state.name, this.state.url)
  //     .send({
  //       from: accounts[0]
  //     });
  //     Router.pushRoute(`/${this.props.address}`)
  //   } catch (err) {
  //       this.setState({errorMessage: err.message });
  //   }
  //   this.setState({loading: false})
  // };

  render(){
    return (
    <Layout>
      <h2 style={{padding: "10px"}}>Monsters for {this.props.address}!</h2>
        {this.renderCards()}
      <Button>
        <Link route={`/${this.props.address}/new`}>
          <a>Create New Monster</a>
        </Link>
      </Button>

    </Layout>
    )
  }
}

export default MonsterView;
