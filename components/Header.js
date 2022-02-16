import React from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from '../routes';

export default () => {
  return (
    <Menu style={{marginTop: '10px'}}>
      <Link route="/">
        <a className='item'>Monsters</a>
      </Link>

      <Menu.Menu position="right">

        <Link route="/">
          <a className='item'>Search Monsters</a>
        </Link>
        <Link route="/new">
          <a className='item'>New Player</a>
        </Link>
      </Menu.Menu>
    </Menu>
  )
}
