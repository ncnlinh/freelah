import React from 'react';
import {ProductStore, AppStore, ProductCreatingStore} from '../stores';
import {ProductActions, ProductCreatingActions} from '../actions';
import {HeaderConstants} from '../constants';
import Header from './Header';
import ProductSection from './ProductSection';
import mui from 'material-ui';
import {PropTypes, Link} from 'react-router';
import {LeftNav, MenuItem, TextField, RaisedButton} from 'material-ui'
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
  }

  componentDidMount() {
    ProductCreatingStore.listen(this.onChange);
  }

  ComponentWillUnMount() {
    ProductCreatingStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
    console.log(state);
    if (this.state.product) {
      this.context.history.pushState(null, '/');
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
    this.setState({imageFileName: e.target.value.replace("C:\\fakepath\\", "")});

    var reader = new FileReader();
    reader.onload = function(upload) {
      ProductCreatingActions.uploadImages(upload.target.result.split(",")[1]);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    var error = null;
    const pageMenuItems = [
      {
        type: MenuItem.Types.LINK,
        text: 'Home',
        payload: '/#/'
      },
      {
        type: MenuItem.Types.LINK,
        text: 'About',
        payload: '/#/about'
      }
    ];

    var menuItems;
    if (this.hasUser) {
      menuItems = pageMenuItems.concat([{
        type: MenuItem.Types.LINK,
        text: 'Profile',
        payload: '/#/me'
      },
      {
        type: MenuItem.Types.LINK,
        text: 'Activity',
        payload: '/#/activity'
      },
      {
        type: MenuItem.Types.LINK,
        text: 'Log out',
        payload: '/#/logout'
      }]);
    } else {
      menuItems = pageMenuItems.concat([{
        type: MenuItem.Types.LINK,
        text: 'Log in',
        payload: '/#/login'
      },
      {
        type: MenuItem.Types.LINK,
        text: 'Sign up',
        payload: '/#/signup'
      }]);
    }

    console.log(this.state.imageFileName);
    return (
      <div className='newproduct'>
        <Header mode={HeaderConstants.NEWPRODUCT} />

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
  history: PropTypes.history
}
ProductNew.propTypes = {
  params: React.PropTypes.object //from react-router
}

export default ProductNew;

