import React from 'react';
import {AppStore} from '../stores';
import {AppConstants} from '../constants';
import Landing from './Landing';
import Home from './Home';

import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

class App extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
  constructor(props) {
    super(props);
    this.state = AppStore.getState()
  }

  componentDidMount() {
    AppStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AppStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePost(e) {

  }

  render() {
    switch (this.state.app) {
      case AppConstants.SCREEN_LANDING: {
        return (
          <div className='app'>
            <Landing/>
          </div>
        );
      }
      case AppConstants.SCREEN_HOME: {
        return (
          <div className='app'>
            <Home/>
          </div>
        );
      }
    }
    
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default App;