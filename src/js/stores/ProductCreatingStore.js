import alt from '../alt';
import ProductCreatingActions from '../actions/ProductCreatingActions';

class ProductCreatingStore {
  constructor() {
    this.product = null;
    this.errors = null;
    this.images = null;
    this.bindListeners({
      handleUploadImages: ProductCreatingActions.UPLOAD_IMAGES,
      handleCreateProductSuccess: ProductCreatingActions.CREATE_PRODUCT_SUCCESS,
      handleCreateProductFailed: ProductCreatingActions.CREATE_PRODUCT_FAILED
    });
  }

  handleUploadImages(images) {
    console.log(images);
    this.images = images;
  }

  handleCreateProductSuccess(data) {
    this.product = data;
  }

  handleCreateProductFailed(err) {
    this.errors = err;
  }

}

export default alt.createStore(ProductCreatingStore, 'ProductCreatingStore');