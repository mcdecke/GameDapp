import React, { Component } from 'react';
import { Form, Button, Input, Message, Menu } from 'semantic-ui-react';
import {Link, Router} from '../routes';
import Layout from './Layout';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class Header extends Component {

  state = {
    name: '',
    errorMessage: '',
    loading: false,
    activeItem: 'bio'
  };

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({loading: true, errorMessage: ''})
    console.log(this.state.name);
  };

  render(){
    return (
      <Menu style={{marginTop: '10px'}}>
        <Link route="/">
          <a className='item'>Home</a>
        </Link>
        <Input
          transparent
          placeholder=' Search 0x... '
          value = {this.state.name}
          onChange={event => this.setState({name: event.target.value})}
          style={{width: '50%', padding: '14px'}}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Form position='right' error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
              <Form.Field>
                <Message position='right' error header="Ooops!" content={this.state.errorMessage} />
                  <Link route={`/${this.state.name}`}>
                    <Button loading={this.state.loading} primary >
                      Search
                    </Button>
                  </Link>
              </Form.Field>
            </Form>
          </Menu.Item>

          <Link route="/new">
            <a className='item'>New Player</a>
          </Link>
        </Menu.Menu>
      </Menu>
    )
  }
}


export default Header;
