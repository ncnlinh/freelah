import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui';
import moment from 'moment';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card style={{paddingBottom:'0px', marginTop:'15px', marginLeft:'1%', 
        marginRight:'1%', width:'48%', float:'left'}}>
      {
        this.props.mode === 'full' ? (
          <CardMedia overlay={<CardTitle title={this.props.name} subtitle={String(this.props.userId)}/>}>
            <img src="http://lorempixel.com/600/337/cats/"/>
          </CardMedia>) : 
        (<CardMedia style={{height:'150px',overflow:'hidden'}}>
          <img style={{minHeight:'150px'}} src="http://lorempixel.com/600/337/cats/"/>
        </CardMedia>)
      }
        <CardText >
          <div style={{fontSize: '12px'}}><strong>{this.props.name}</strong></div>
          <div style={{fontSize: '12px', marginBottom: '-8px'}}>Location: {this.props.location}</div>
          {!!this.props.expiryDate ? (<div><em>Available until: {moment().to(this.props.expiryDate)}</em></div>) : null}
          {this.props.mode === 'full' ? (<div>{this.props.description}</div>) : null}
        </CardText>
      </Card>
    );
  }
}

ProductCard.propTypes = {
  onClick: React.PropTypes.func,
  id: React.PropTypes.number,
  mode: React.PropTypes.oneOf(['overview', 'full']),
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  status: React.PropTypes.oneOf(['available', 'bidding', 'expired', 'given']),
  location: React.PropTypes.string.isRequired,
  expiryDate: React.PropTypes.object,
  userId: React.PropTypes.number.isRequired
};


export default ProductCard;