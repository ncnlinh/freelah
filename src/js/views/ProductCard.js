import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui';
import moment from 'moment';
import CountdownTimer from './CountdownTimer';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
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
      },
      cardTextFull: {
        fontSize: '14px'
      }
    }
    var imgUrl = this.props.imgUrls ? '/' + this.props.imgUrls.replace(' ', '') : "http://lorempixel.com/600/337/cats/";
    var biddingText = "Highest bid: " + this.props.highestBid;
    var timeLeft = 0;

    if (this.props.status == 'bidding') {
      var currentTime = new Date();
      var createdTime = new Date(this.props.createdAt);
      var timePassed = Math.round((currentTime - createdTime) / 1000);
      timeLeft = Math.max(0, - timePassed + this.props.expiryDate*3600);
    }


    return (
      <Card style={style.card}>
        <CardMedia >
          <img src={imgUrl}/>
        </CardMedia>
        <CardText style={{marginBottom:'-8px'}}>
          {this.props.mode === 'full' ? (<div style={{fontSize: '20px'}}><strong>{this.props.name}</strong></div>): (<div style={{fontSize: '12px'}}><strong>{this.props.name}</strong></div>)}
          {this.props.mode === 'full' ? (<div style={style.cardTextFull}>Location: {this.props.location}</div>) : (<div style={style.cardTextSummary}>Location: {this.props.location}</div>)}
          {this.props.mode === 'full' ? (<div>Description: {this.props.description}</div>) : null}
          {this.props.mode === 'full' ? (<div style={style.cardTextFull}>{biddingText}</div>) : (<div style={style.cardTextSummary}>{biddingText}</div>)}
          <CountdownTimer seconds={timeLeft} highestBid={this.props.highestBid}/>
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
  imgUrls: React.PropTypes.string,
  status: React.PropTypes.oneOf(['available', 'bidding', 'expired', 'given']),
  location: React.PropTypes.string.isRequired,
  expiryDate: React.PropTypes.object,
  userId: React.PropTypes.number.isRequired,
  highestBid: React.PropTypes.number,
  createdAt: React.PropTypes.string
};


export default ProductCard;