import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class PlayerNew extends Component {

  state = {
    name: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault()

    this.setState({loading: true, errorMessage: ''})

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods
      .createMonsterOwner()
      .send({
        from: accounts[0]
      });
      console.log("Player created at: ", address);
      Router.pushRoute('/')
    } catch (err) {
        this.setState({errorMessage: err.message });
    }
    this.setState({loading: false})
  };

  render(){
    return (
    <Layout>
      <h1>Create a New Monster Trainer!</h1>

      <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
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

export default PlayerNew;
