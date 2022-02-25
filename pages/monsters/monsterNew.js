import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import monsterOwner from '../../ethereum/monster';

class MonsterNew extends Component {

  static async getInitialProps(props){
    console.log(props.query.address+"!");
    const owner = monsterOwner(props.query.address);
    const a = await owner.methods.getMonsterCount().call();
    return {
      address: props.query.address,
      // strength: mon[0].strength
    };
  }

  state = {
    name: '',
    errorMessage: '',
    loading: false
  };


  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading: true, errorMessage: ''})
    const owner = monsterOwner(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await owner.methods.createMonster(this.state.name)
      .send({
        from: accounts[0]
      });
      Router.pushRoute('/')
    } catch (err) {
        this.setState({errorMessage: err.message });
    }
    this.setState({loading: false})
  };

  render(){
    return (
    <Layout>
      <h1>Create a New Monster!</h1>
      <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit} address={this.props.address}>
        <Form.Field>
          <label>Name</label>
          <Input
            value = {this.state.name}
            onChange={event => this.setState({name: event.target.value})}
          />
        </Form.Field>

        <Message error header="Ooops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>Create!</Button>

      </Form>



    </Layout>
    )
  }
}

export default MonsterNew;
