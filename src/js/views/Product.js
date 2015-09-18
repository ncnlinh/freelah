import React from 'react';
import {ProductStore} from '../stores';
import {ProductActions} from '../actions';
import {HeaderConstants} from '../constants';
import ProductCard from './ProductCard';
import Header from './Header';
import mui, {Paper} from 'material-ui';
import {PropTypes} from 'react-router';

let ThemeManager = new mui.Styles.ThemeManager();

class Product extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  constructor(props) {
    super(props);
    this.state = ProductStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount() {
    ProductStore.listen(this.onChange);
    if (!this.state.product) {
      const id = this.props.params.id;
      ProductActions.getProduct(id);
    }
  }

  componentWillUnmount() {
    ProductStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePost(e) {

  }
  handleGoBack() {
    this.context.history.goBack();
  }

  render() {
    const product = this.state.product;
    if (!!product) {
      return (
        <div className='product'>
          <Header leftItemTouchTap={this.handleGoBack} mode={HeaderConstants.PRODUCT}/>
          <Paper style={{paddingRight: '10px', paddingBottom:'10px', display: 'flex'}}>
          <ProductCard
              mode='full'
              id={product.id}
              name={product.name}
              description={product.description}
              status={product.status}
              location={product.location}
              expiryDate={product.expiryDate}
              imgUrls={product.imgUrls}
              userId={product.userId}/>
          </Paper>
        </div>
      );
    } else {
      return <div className='product'/>;
    }

  }
}

Product.childContextTypes = {
  muiTheme: React.PropTypes.object
};

Product.propTypes = {
  params: React.PropTypes.object //from react-router
}
Product.contextTypes = {
  history: PropTypes.history
}
export default Product;

