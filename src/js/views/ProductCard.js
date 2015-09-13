import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card style={{marginBottom: '15px'}}>
        <CardMedia overlay={<CardTitle title={this.props.name} subtitle={String(this.props.userId)}/>}>        
          <img src="http://lorempixel.com/600/337/cats/"/>
        </CardMedia>
        <CardText>
          <div><strong>Location: {this.props.location}</strong></div>
          <div>
          {!!this.props.expiryDate ? (<em>{this.props.expiryDate.toString()}</em>) : null}
          </div>
          <div>{this.props.description}</div>
        </CardText>
      </Card>
    );
  }
}

ProductCard.propTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  status: React.PropTypes.oneOf(['available', 'bidding', 'expired', 'given']),
  location: React.PropTypes.string.isRequired,
  expiryDate: React.PropTypes.object,
  userId: React.PropTypes.number.isRequired
};


export default ProductCard;