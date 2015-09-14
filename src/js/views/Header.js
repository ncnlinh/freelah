import React from 'react';
import {AppBar, IconButton, FlatButton} from 'material-ui'
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
    return (
      <AppBar title='FreeLah'
        iconElementRight={<div>
          <IconButton iconClassName='fa fa-lg fa-search' iconStyle={styles.buttonText}/>
          <FlatButton label='Post' style={styles.buttonRoot} labelStyle={styles.buttonText}>
            <input type="file" accept="image/*;capture=camera" style={styles.imageInput}
            onChange={this.props.handlePost}/>
          </FlatButton>
        </div>}
      />
    );
  }
}

Header.propTypes = {
  handlePost: React.PropTypes.func
}



export default Header;