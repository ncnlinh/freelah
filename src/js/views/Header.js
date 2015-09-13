import React from 'react';
import {AppBar, IconButton} from 'material-ui'

class Header extends React.Component {

  render() {
    return (
      <AppBar title="FreeLah"
        iconElementRight={<IconButton iconClassName="fa fa-lg fa-search"/>}
      />
    );
  }
}

export default Header;