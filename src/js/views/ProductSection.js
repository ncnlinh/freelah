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
          to={`/products/${product.id}`}>
            <ProductCard key={i}
                id={product.id}
                mode='overview'
                name={product.name}
                description={product.description}
                status={product.status}
                location={product.location}
                expiryDate={product.expiryDate}
                highestBid={product.highestBid}
                imgUrls={product.imgUrls}
                userId={product.userId}
                createdAt={product.createdAt}/>
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
  products: React.PropTypes.array
};

export default ProductSection;