import React from 'react';
import {ProductStore, AppStore} from '../stores';
import {ProductActions, ProductCreatingActions} from '../actions';
import {HeaderConstants} from '../constants';
import Header from './Header';
import ProductSection from './ProductSection';
import mui from 'material-ui';
import {PropTypes} from 'react-router';
import {LeftNav, MenuItem} from 'material-ui'
let ThemeManager = new mui.Styles.ThemeManager();

class Home extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
  constructor(props, context) {
    super(props, context);
    this.state = ProductStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.toggleLeftNav = this.toggleLeftNav.bind(this);
  }

  componentWillMount() {
    if (!AppStore.getState().isLoggedIn) {
      this.context.history.pushState(null, '/login');
    }
  }

  componentDidMount() {
    ProductStore.listen(this.onChange);
    ProductActions.getAllProducts();
  }

  componentWillUnmount() {
    ProductStore.unlisten(this.onChange);
  }

  onChange(state) {
    if (!!React.findDOMNode(this)) {
      this.setState(state);
    }
  }

  handlePost(e) {
    ProductCreatingActions.uploadImage(e.target.value);
    this.context.history.pushState(null, '/products/new');
  }

  handleProductCardOnClick(id) {
    ProductActions.getProduct(id);
  }
  toggleLeftNav(){
    this.refs.leftNav.toggle();
  }

  render() {
    const products = this.state.retrievedProducts;
    const menuItems = [
      {
        type: MenuItem.Types.LINK,
        text: 'Home',
        payload: '/#/'
      },
      {
        type: MenuItem.Types.LINK,
        text: 'About',
        payload: '/#/about'
      },
      {
        type: MenuItem.Types.LINK,
        text: 'Profile',
        payload: '/#/me'
      },
      {
        type: MenuItem.Types.LINK,
        text: 'Activity',
        payload: '/#/activity'
      },
      {
        type: MenuItem.Types.LINK,
        text: 'Logout',
        payload: '/#/logout'
      },
      {
        type: MenuItem.Types.LINK,
        text: 'Login',
        payload: '/#/login'
      }
    ];
    return (
      <div className='home'>
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems}/>
        <Header leftItemTouchTap={this.toggleLeftNav} mode={HeaderConstants.HOME} handlePost={this.handlePost} />
        <ProductSection products={products}
        itemOnClick={this.handleProductCardOnClick}/>
      </div>
    );

  }
}

Home.childContextTypes = {
  muiTheme: React.PropTypes.object
};
Home.contextTypes = {
  history: PropTypes.history
}
export default Home;

