import React from 'react';
import ProductCard from './ProductCard';
import {Paper} from 'material-ui';

class ProductSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let productList = [];
    this.props.products.forEach((product, i) => {
      productList.push(
        <ProductCard key={i}
            name={product.name}
            description={product.description}
            status={product.status}
            location={product.location}
            expiryDate={product.expiryDate}
            userId={product.userId}/>
      );
    });
    return (
      <Paper style={{padding: '15px'}}>
      {productList}
      </Paper>
    );
  }
}

ProductSection.propTypes = {
  products: React.PropTypes.array.isRequired
};

export default ProductSection;