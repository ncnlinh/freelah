import React from 'react';
import ProductCard from './ProductCard';
import {Paper} from 'material-ui';
import {Link} from 'react-router';

class ProductSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let style = {
      wrapper : {
        width:'50%'
        // float:'left'
      }
    }
    let productList = [];
    if (!!this.props.products) {
      this.props.products.forEach((product, i) => {
        productList.push(
          <Link style={style.wrapper} key={i}
          onClick={this.props.itemOnClick.bind(null, product.id)}
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
      <Paper style={{display: 'flex', flexWrap: 'wrap', paddingRight: '10px', paddingBottom: '10px'}}>
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