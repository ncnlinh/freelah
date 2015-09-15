import React from 'react';
import {ProductStore} from '../stores';
import {ProductActions} from '../actions';
import {HeaderConstants} from '../constants';
import ProductCard from './ProductCard';
import Header from './Header';

class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = ProductStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProductStore.listen(this.onChange);
    if (!this.state.product) {
      const id = this.props.params.id;
      ProductActions.getProduct(userId, id);
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
          <ProductCard
              mode='full'
              id={product.id}
              name={product.name}
              description={product.description}
              status={product.status}
              location={product.location}
              expiryDate={product.expiryDate}
              userId={product.userId}/>
        </div>
      );
    } else {
      return <div className='product'/>;
    }

  }
}

Product.propTypes = {
  params: React.PropTypes.object //from react-router
}

export default Product;

