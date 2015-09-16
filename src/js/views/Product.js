import React from 'react';
import {ProductStore} from '../stores';
import {ProductActions} from '../actions';
import {HeaderConstants} from '../constants';
import ProductCard from './ProductCard';
import Header from './Header';
import mui, {Paper} from 'material-ui';

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

  render() {
    const product = this.state.product;
    if (!!product) {
      return (
        <div className='product'>
          <Header mode={HeaderConstants.PRODUCT}/>
          <Paper style={{paddingBottom: '15px', paddingRight:'15px', display: 'flex'}}>
          <ProductCard
              mode='full'
              id={product.id}
              name={product.name}
              description={product.description}
              status={product.status}
              location={product.location}
              expiryDate={product.expiryDate}
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

export default Product;

