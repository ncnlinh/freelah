import React from 'react';
import {AppStore, ProductCreatingStore} from '../stores';
import {ProductCreatingActions} from '../actions';
import {HeaderConstants} from '../constants';
import Header from './Header';
import mui from 'material-ui';
import {PropTypes} from 'react-router';
import {MenuItem, TextField, RaisedButton} from 'material-ui'
import {Grid, Row, Col} from 'react-bootstrap';

let ThemeManager = new mui.Styles.ThemeManager();

class ProductNew extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  constructor(props) {
    super(props);
    this.state = ProductCreatingStore.getState();
    this.user = AppStore.getState().user;
    this.onChange = this.onChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount() {
    ProductCreatingStore.listen(this.onChange);
    ProductCreatingActions.startPost();
  }

  ComponentWillUnmount() {
    ProductCreatingStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
    console.log(state);
    if (this.state.product) {
      this.context.history.pushState(null, '/products/'+this.state.product.id);
    }
  }

  handlePost(e) {
    e.preventDefault();

    let name = this.refs.productname.refs.input.getDOMNode().value;
    let location = this.refs.location.refs.input.getDOMNode().value;
    let discription = this.refs.description.refs.input.getDOMNode().value;
    let images = this.state.images;

    console.log(images);
    ProductCreatingActions.create(this.user, name, location, discription, images);
  }

  handleFileChange(e) {
    this.setState({imageFileName: e.target.value.split(/[/\\]+/)[(e.target.value.split(/[/\\]+/).length-1 )]});

    let reader = new FileReader();
    reader.onload = function(upload) {
      ProductCreatingActions.uploadImages(upload.target.result.split(',')[1]);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  handleGoBack() {
    this.context.history.pushState('/');
  }

  render() {
    let error = null;
    
    console.log(this.state.imageFileName);
    return (
      <div className='newproduct'>
        <Header leftItemTouchTap={this.handleGoBack} mode={HeaderConstants.NEWPRODUCT} />

        <Grid>
          <div className="fl-auth lead">
          <form bsStyle="inline" onSubmit={this.handleLogin}>
          <Row>
            <Col style={{paddingLeft: '20px', paddingRight:'20px'}}>
              <TextField ref="productname" hintText="Product Name" floatingLabelText="Product Name" required={true} errorText={error} fullWidth/>
              <TextField ref="location" hintText="Location" floatingLabelText="Location" required={true} errorText={error} fullWidth/>
              <TextField ref="description" hintText="Description" floatingLabelText="Description" required={true} errorText={error} fullWidth/>
              <TextField ref="image" value={this.state.imageFileName} hintText="Upload Image" floatingLabelText="Upload Image" required={true} errorText={error} fullWidth/>
              <input ref="imageSource" type="file" name="image" accept="image/*;capture=camera" 
                  style={{ height:'100px', marginTop:'-35px', opacity:'0.0', position:'absolute'}} 
                  onChange={this.handleFileChange}/>
            </Col>
          </Row>
          <Row>
            <Col style={{'padding': '20px'}}>
              <RaisedButton type="submit" bsStyle="success" onClick={this.handlePost} fullWidth>
                Submit
              </RaisedButton >
            </Col>
          </Row>
          </form>
          </div>
        </Grid>
      </div>
    );

  }
}

ProductNew.childContextTypes = {
  muiTheme: React.PropTypes.object
};
ProductNew.contextTypes = {
  history: PropTypes.history //from react-router
}
ProductNew.propTypes = {
  params: React.PropTypes.object //from react-router
}

export default ProductNew;

