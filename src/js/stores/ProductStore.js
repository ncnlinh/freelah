import alt from '../alt';
import ProductActions from '../actions/ProductActions';

class ProductStore {
  constructor() {
    this.product = null;
    this.retrievedProducts = null;
    this.errors = null;
    this.bindListeners({
      handleCreateProduct: ProductActions.CREATE_PRODUCT,
      handleCreateProductSuccess: ProductActions.CREATE_PRODUCT_SUCCESS,
      handleCreateProductFailed: ProductActions.CREATE_PRODUCT_FAILED,
      handleGetProduct: ProductActions.GET_PRODUCT,
      handleGetProductSuccess: ProductActions.GET_PRODUCT_SUCCESS,
      handleGetProductFailed: ProductActions.GET_PRODUCT_FAILED,
      handleUpdateProduct: ProductActions.UPDATE_PRODUCT,
      handleUpdateProductSuccess: ProductActions.UPDATE_PRODUCT_SUCCESS,
      handleUpdateProductFailed: ProductActions.UPDATE_PRODUCT_FAILED,
      handleGetAllProducts: ProductActions.GET_ALL_PRODUCTS,
      handleGetAllProductsSuccess: ProductActions.GET_ALL_PRODUCTS_SUCCESS,
      handleGetAllProductsFailed: ProductActions.GET_ALL_PRODUCTS_FAILED,
    })
  }

  handleCreateProduct() {
    this.product = null;
    this.errors = null;
  }
  handleCreateProductSuccess(product) {
    this.product = product;
    this.errors = null;
  }
  handleCreateProductFailed(err) {
    this.errors = err;
  }

  handleGetProduct() {
    this.product = null;
    this.errors = null;
  }
  handleGetProductSuccess(product) {
    this.product = product;
    this.errors = null;
  }
  handleGetProductFailed(err) {
    this.errors = err;
  }

  handleUpdateProduct() {
    this.product = null;
    this.errors = null;
  }
  handleUpdateProductSuccess(product) {
    this.product = product;
    this.errors = null;
  }
  handleUpdateProductFailed(err) {
    this.errors = err;
  }

  handleGetAllProducts() {
    this.retrievedProducts = null;
    this.errors = null;
  }
  handleGetAllProductsSuccess(products) {
    this.retrievedProducts = products;
  }
  handleGetAllProductsFailed(err) {
    this.errors = err
  }
}

export default alt.createStore(ProductStore, 'ProductStore');

