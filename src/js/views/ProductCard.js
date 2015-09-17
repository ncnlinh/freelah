import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui';
import moment from 'moment';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let style = {
      card : {
        paddingBottom:'0px',
        marginTop:'10px',
        marginLeft:'10px',
      },
      cardTextSummary: {
        fontSize: '12px',
        marginBottom: '-8px'
      },
      cardTextFull: {
        fontSize: '14px'
      }
    }
    return (
      <Card style={style.card}>
        <CardMedia >
          <img src="http://lorempixel.com/600/337/cats/"/>
        </CardMedia>
        <CardText >
          {this.props.mode === 'full' ? (<div style={{fontSize: '20px'}}><strong>{this.props.name}</strong></div>): (<div style={{fontSize: '12px'}}><strong>{this.props.name}</strong></div>)}
          {this.props.mode === 'full' ? (<div style={style.cardTextFull}>Location: {this.props.location}</div>) : (<div style={style.cardTextSummary}>Location: {this.props.location}</div>)}
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