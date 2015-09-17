import React from 'react';
import {AppBar, IconButton, FlatButton, IconMenu, MenuItem} from 'material-ui';
import {HeaderConstants} from '../constants';
import mui from 'material-ui';
import {Link} from 'react-router'

class Header extends React.Component {

  constructor(props) {
    super(props);
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
                this.props.showLoginButton ? 
                (<Link to={`/login`}>
                  <FlatButton label='Login' style={styles.buttonRoot} labelStyle={styles.buttonText}/>
                </Link>)
                :
                (<FlatButton label='Post' style={styles.buttonRoot} labelStyle={styles.buttonText}>
                  <input type="file" accept="image/*;capture=camera" style={styles.imageInput}
                  onChange={this.props.handlePost}/>
                </FlatButton>)
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
    };
    
  }
}

Header.propTypes = {
  mode: React.PropTypes.string,
  handlePost: React.PropTypes.func,
  leftItemTouchTap: React.PropTypes.func,
  rightItemTouchTap: React.PropTypes.func,
  showLoginButton: React.PropTypes.bool
}

Header.defaultProps = {
  mode: HeaderConstants.HOME
}

export default Header;