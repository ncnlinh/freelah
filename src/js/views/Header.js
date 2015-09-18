import React from 'react';
import {AppBar, IconButton, FlatButton, IconMenu, MenuItem} from 'material-ui';
import {HeaderConstants} from '../constants';
import {AppStore} from '../stores';
import mui from 'material-ui';
import {Link} from 'react-router'

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.hasUser = AppStore.getState().isLoggedIn
  }

  render() {
    let ThemeManager = new mui.Styles.ThemeManager();
    const styles = {
      buttonText: {
        color: ThemeManager.component.appBar.textColor,
        fill: ThemeManager.component.appBar.textColor
      },
      buttonRoot: {
        backgroundColor: ThemeManager.component.appBar.color
      },
      container: {},
      imageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        right: '0px',
        left: '0px',
        width: '100%',
        opacity: '0'
      }
    };

    switch (this.props.mode) {
      case (HeaderConstants.HOME):
        return (
          <AppBar title='FreeLah'
            onLeftIconButtonTouchTap={this.props.leftItemTouchTap}
            iconElementRight={<div>
              <IconButton iconClassName='fa fa-lg fa-search' iconStyle={styles.buttonText}/>
              {
                this.hasUser ? 
                (<FlatButton label='Post' style={styles.buttonRoot} labelStyle={styles.buttonText}>
                  <input style={styles.imageInput}
                  onClick={this.props.handlePost}/>
                </FlatButton>)
                :
                (<Link to={`/login`}>
                  <FlatButton label='Login' style={styles.buttonRoot} labelStyle={styles.buttonText}/>
                </Link>)
              }
            </div>}
          />
        );
      case (HeaderConstants.PRODUCT):
        return (
          <AppBar title='FreeLah'
            iconElementLeft={<IconButton iconClassName='fa fa-arrow-left'/>}
            iconElementRight={
              <IconMenu iconButtonElement={(<IconButton iconClassName='fa fa-bars' iconStyle={styles.buttonText}/>)}>
                <MenuItem primaryText='Report listing'/>
              </IconMenu>}
          />
        );
      case (HeaderConstants.NEWPRODUCT):
        return (
          <AppBar title='FreeLah'
            iconElementLeft={<IconButton iconClassName='fa fa-arrow-left'/>}
            iconElementRight={
              <FlatButton label='New product' style={styles.buttonRoot} labelStyle={styles.buttonText}/>
            }
          />
        );
    };
    
  }
}

Header.propTypes = {
  mode: React.PropTypes.string,
  handlePost: React.PropTypes.func,
  leftItemTouchTap: React.PropTypes.func,
  rightItemTouchTap: React.PropTypes.func,
  hasUser: React.PropTypes.bool
}

Header.defaultProps = {
  mode: HeaderConstants.HOME
}

export default Header;