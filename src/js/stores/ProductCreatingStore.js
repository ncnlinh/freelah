import alt from '../alt';
import ProductCreatingActions from '../actions/ProductCreatingActions';

class ProductCreatingStore {
  constructor() {
    this.image = null;
    this.errors = null;
    this.bindListeners({
      handleUploadImage: ProductCreatingActions.UPLOAD_IMAGE
    });
  }

  handleUploadImage(image) {
    this.image = image;
  }

}

export default alt.createStore(ProductCreatingStore, 'ProductCreatingStore');