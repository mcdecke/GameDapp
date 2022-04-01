import React, { Component } from 'react';
import { Form, Button, Input, Image, Message, Card, Segment, Icon, Grid, Radio } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router, Link} from '../../routes';
import monsterOwner from '../../ethereum/monster';

class MonsterTrain extends Component {

  state = {
    name: '',
    errorMessage: '',
    loading: false,
    view: 'hidden',
    stat: ''
  };

  static async getInitialProps(props){

    console.log("num", props.query);

    let number = 0

    const name = parseInt(props.query.name);
    // current player
    const player = await monsterOwner(props.query.address);
    // address managing player
    const manager = await player.methods.manager().call();
    // console.log(props.query.address+"!: ", manager);
    const monsterCount = await player.methods.getMonsterCount().call();

    console.log("MC", monsterCount);
    for(let i = 0; i < monsterCount; i++){
      const mons = await player.methods.monsters(i).call();
      if (mons.name == name) {
        number = i
      }
    }

    const monster = await player.methods.monsters(number).call();

    return {
      address: props.query.address,
      player,
      manager,
      monsterCount,
      monster,
      number
    };
  }

  renderCard() {

    const {
      defense, exp, currentHealth, maxHealth, currentEnergy, maxEnergy, name, speed, strength, url
    } = this.props.monster;

      return (
        <Card style={{padding: "10px"}}>
            <Image src={url} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>
                <span>Hp: {currentHealth}/{maxHealth} Energy: {currentEnergy}/{maxEnergy}</span>
              </Card.Meta>
              <Card.Description>
                Strength: {strength} Defense: {defense} Speed: {speed} Exp: {exp}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='Description' />
                Monster Description
              </a>
            </Card.Content>
          </Card>
        )
    // }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading: true, errorMessage: ''})
    const player = monsterOwner(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(parseInt(this.props.number), parseInt(this.state.amount), this.state.stat);
      await player.methods.lvlUp(parseInt(this.props.number), parseInt(this.state.amount), parseInt(this.state.stat))
      .send({
        from: accounts[0]
      });
      Router.pushRoute(`/${this.props.address}`)
    } catch (err) {
        this.setState({errorMessage: err.message });
    }
    this.setState({loading: false})
  };


  // Rename
  onRename = async (event) => {
    event.preventDefault();
    this.setState({loading: true, errorMessage: ''})
    const player = monsterOwner(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts, player);
      await player.methods.rename(this.props.number, this.state.name, this.state.url)
      .send({
        from: accounts[0]
      });
      Router.pushRoute(`/${this.props.address}`)
    } catch (err) {
        this.setState({errorMessage: err.message });
    }
    this.setState({loading: false})
  };

  handleChange = (e, { value }) => this.setState({ stat:value })

  render(){
    return (
    <Layout>

      <h2 style={{padding: "10px"}}>Monsters {this.props.number} for {this.props.address}!</h2>
        {this.renderCard()}
      <Button>
        <Link route={`/${this.props.address}/new`}>
          <a>Create New Monster</a>
        </Link>
      </Button>

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <div>
              <h3>Train Monster!</h3>
              <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit} address={this.props.address}>
                  <Form.Field>
                      Selected stat: <b>{this.state.stat}</b>
                  </Form.Field>
                  <Form.Field>
                      <Radio
                        label='Strength'
                        name='radioGroup'
                        value='1'
                        checked={this.state.stat === "Strength"}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label='Defense'
                        name='radioGroup'
                        value='2'
                        checked={this.state.stat === "Defense"}
                        onChange={this.handleChange}
                      />
                    </Form.Field>

                  <label>Amount</label>
                  <Input
                    value = {this.state.amount}
                    onChange={url => this.setState({amount: event.target.value})}
                  />

                <Message error header="Ooops!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>Update!</Button>
              </Form>
            </div>

            </Grid.Column>

            <Grid.Column>
              <div>
                <h3>Rename Monster</h3>
                <Form error={!!this.state.errorMessage} onSubmit={this.onRename} address={this.props.address}>
                  <Form.Field>
                    <label>New Name</label>
                    <Input
                      value = {this.state.name}
                      onChange={event => this.setState({name: event.target.value})}
                    />

                    <label>New Url</label>
                    <Input
                      value = {this.state.url}
                      onChange={url => this.setState({url: event.target.value})}
                    />
                  </Form.Field>
                  <Message error header="Ooops!" content={this.state.errorMessage} />
                  <Button loading={this.state.loading} primary>Update!</Button>
                </Form>
              </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
    )
  }
}

export default MonsterTrain;
