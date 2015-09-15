import React from 'react';
import ProductCard from './ProductCard';
import {Paper} from 'material-ui';
import {Link} from 'react-router';

class ProductSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let productList = [];
    if (!!this.props.products) {
      this.props.products.forEach((product, i) => {
        productList.push(
          <Link key={i}
          onClick={this.props.itemOnClick.bind(null, product.userId, product.id)}
          to={`products/${product.id}`}>
            <ProductCard key={i}
                onClick={this.props.itemOnClick}
                id={product.id}
                mode='overview'
                name={product.name}
                description={product.description}
                status={product.status}
                location={product.location}
                expiryDate={product.expiryDate}
                userId={product.userId}/>
          </Link>
        );
      });
    }
    return (
      <Paper style={{paddingBottom: '15px', paddingRight:'15px', display: 'flex'}}>
      {productList}
      </Paper>
    );
  }
}

ProductSection.propTypes = {
  itemOnClick: React.PropTypes.func,
  products: React.PropTypes.array
};

export default ProductSection;