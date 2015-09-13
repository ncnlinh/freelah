import alt from '../alt';
import api from '../api';

class ProductActions {
  createProduct(userId, product) {
    this.dispatch();
    api.createProduct(userId, product)
      .then((res) => {
        this.actions.createProductSuccess(JSON.parse(res.text));
      })
      .catch((err) => {
        this.actions.createProductFailed(JSON.parse(err.errors));
      });
  }
  createProductSuccess(product) {
    this.dispatch(product);
  }
  createProductFailed(err) {
    this.dispatch(err);
  }

  getProduct(userId, productId) {
    this.dispatch();
    api.getProduct(userId, productId)
      .then((res) => {
        this.actions.getProductSuccess(JSON.parse(res.text));
      })
      .catch((err) => {
        this.actions.getProductFailed(JSON.parse(err.errors));
      });
  }

  getProductSuccess(product) {
    this.dispatch(product);
  }
  getProductFailed(err) {
    this.dispatch(err);
  }

  getAllProducts() {
    this.dispatch();
    api.getAllProducts()
      .then((res) => {
        this.actions.getAllProductsSuccess(JSON.parse(res.text));
      })
      .catch((err) => {
        this.actions.getAllProductsFailed(JSON.parse(err.errors));
      });
  }
  getAllProductsSuccess(product) {
    this.dispatch(product);
  }
  getAllProductsFailed(err) {
    this.dispatch(err);
  }


  updateProduct(userId, productId, data) {
    this.dispatch();
    api.updateProduct(userId, productId, data)
      .then((res) => {
        this.actions.updateProductSuccess(JSON.parse(res.text));
      })
      .catch((err) => {
        this.actions.updateProductFailed(JSON.parse(err.errors));
      });
  }

  updateProductSuccess(user) {
    this.dispatch(user);
  }
  updateProductFailed(err) {
    this.dispatch(err);
  }
}

export default alt.createActions(ProductActions);
