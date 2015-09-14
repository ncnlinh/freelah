import React from 'react';
import {ProductStore} from '../stores';
import {ProductActions} from '../actions'
import Header from './Header';
import ProductSection from './ProductSection';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

class Home extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
  constructor(props) {
    super(props);
    this.state = ProductStore.getState()
  }

  componentDidMount() {
    ProductStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ProductStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePost(e) {

  }

  render() {
    let products = [
      {
        name: 'kitty',
        description: 'cute cute',
        status: 'available',
        location: 'nus',
        expiryDate: new Date(),
        userId: 1
      },
      {
        name: 'kitty',
        description: 'cute cute',
        status: 'available',
        location: 'nus',
        expiryDate: new Date(),
        userId: 1
      }
    ]
    return (
      <div className='home'>
        <Header handlePost={this.handlePost} />
        <ProductSection products={products}/>
      </div>
    );

  }
}

Home.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default Home;

