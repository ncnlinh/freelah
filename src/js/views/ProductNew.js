import React from 'react';
import {ProductCreatingStore} from '../stores';
import {ProductActions, ProductCreatingActions} from '../actions';
import {HeaderConstants} from '../constants';
import ProductCard from './ProductCard';
import Header from './Header';

class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = ProductCreatingStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProductCreatingStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ProductCreatingStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePost(e) {

  }

  render() {
    return (
      <div>Hi!</div>
    );

  }
}

Product.propTypes = {
  params: React.PropTypes.object //from react-router
}

export default Product;

