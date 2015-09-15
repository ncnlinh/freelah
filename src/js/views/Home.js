import React from 'react';
import {ProductStore} from '../stores';
import {ProductActions, ProductCreatingActions} from '../actions';
import {HeaderConstants} from '../constants';
import Header from './Header';
import ProductSection from './ProductSection';
import mui from 'material-ui';
import {PropTypes} from 'react-router';

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
    this.context.history.pushState(null, 'products/new');
  }

  handleProductCardOnClick(userId, id) {
    ProductActions.getProduct(userId, id);
  }

  render() {
    const products = this.state.retrievedProducts;
    return (
      <div className='home'>
        <Header mode={HeaderConstants.HOME} handlePost={this.handlePost} />
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

