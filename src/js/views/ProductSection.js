import React from 'react';
import ProductCard from './ProductCard';
import {CircularProgress, Paper} from 'material-ui';
import {Link} from 'react-router';

class ProductSection extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleScroll = this.handleScroll.bind(this);
    this.loadMore = this.loadMore.bind(this);
    window.addEventListener('scroll', this.handleScroll);
    this.state = {
      products: [],
      page: 0,
      loadingFlag: false,
      hasMore: true
    }

  }

  handleScroll() {
    let windowHeight = document.body.clientHeight;
    let inHeight = window.innerHeight;
    let scrollT = document.body.scrollTop;
    let totalScrolled = scrollT+inHeight;

    if (totalScrolled + 100 > windowHeight && this.state.hasMore) {
      if (!this.state.loadingFlag) {
        this.setState({
          loadingFlag: true
        })
        setTimeout(this.loadMore, 1500);
      }
    }
  }

  componentDidUpdate() {
    console.log(this.props);
    console.log(this.state);
    if (this.state.page === 0 && !!this.props.products) this.loadMore();
  }

  loadMore() {
    console.log('loadMore');
   
    let hasMore = this.state.hasMore;
    let products = this.props.products;

    if (hasMore) { 
      let newProducts = [];
      let nextPage = this.state.page;
      if (!!products) {
        nextPage = this.state.page + 1;
        let nextCount = nextPage*10;
        if (nextCount>products.length) {
          nextCount = products.length;
          hasMore = false;
        }
        for (let i = this.state.page*10; i<nextCount; i++) {
          let product = this.props.products[i];
          newProducts.push(product);
        };
      }
      console.log(newProducts);
      this.setState({
        products: this.state.products.concat(newProducts),
        loadingFlag: false,
        page:nextPage,
        hasMore
      });
    }
  }

  render() {
    let style = {
      wrapper : {
        width:'50%'
        // float:'left'
      }
    }
    let productList = [];
    if (!!this.state.products) {
      this.state.products.forEach((product, i) => {
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
         {this.state.loadingFlag ? (<div className='center'><CircularProgress mode='indeterminate'/></div>) : null}
      </Paper>
    );
  }
}

ProductSection.propTypes = {
  products: React.PropTypes.array
};

export default ProductSection;