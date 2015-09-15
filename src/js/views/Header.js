import React from 'react';
import {AppBar, IconButton, FlatButton} from 'material-ui';
import {HeaderConstants} from '../constants';
import mui from 'material-ui';


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
            iconElementLeft={<div></div>}
            iconElementRight={<div>
              <IconButton iconClassName='fa fa-lg fa-search' iconStyle={styles.buttonText}/>
              <FlatButton label='Post' style={styles.buttonRoot} labelStyle={styles.buttonText}>
                <input type="file" accept="image/*;capture=camera" style={styles.imageInput}
                onChange={this.props.handlePost}/>
              </FlatButton>
            </div>}
          />
        );
    };
    
  }
}

Header.propTypes = {
  mode: React.PropTypes.string,
  handlePost: React.PropTypes.func
}

Header.defaultProps = {
  mode: HeaderConstants.HOME
}



export default Header;