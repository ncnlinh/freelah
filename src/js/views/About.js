import React from 'react';
import mui from 'material-ui';
import {PropTypes} from 'react-router';
let ThemeManager = new mui.Styles.ThemeManager();

class About extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let style={
      introHeader: {
        paddingTop: '50px',
        paddingBottom: '50px',
        textAlign: 'center',
        color: '#f8f8f8',
        background: 'url(../img/intro-bg.jpg) no-repeat center center',
        backgroundSize: 'cover'
      }
    }
    return (
      <div className='about'>
        <div className="intro-header" style={style.introHeader}>
            <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="intro-message">
                            <h1>Landing Page</h1>
                            <h3>A Template by Start Bootstrap</h3>
                            <hr className="intro-divider"/>
                            <ul className="list-inline intro-social-buttons">
                                <li>
                                    <a href="https://twitter.com/SBootstrap" className="btn btn-default btn-lg"><i className="fa fa-twitter fa-fw"></i> <span className="network-name">Twitter</span></a>
                                </li>
                                <li>
                                    <a href="https://github.com/IronSummitMedia/startbootstrap" className="btn btn-default btn-lg"><i className="fa fa-github fa-fw"></i> <span className="network-name">Github</span></a>
                                </li>
                                <li>
                                    <a href="#" className="btn btn-default btn-lg"><i className="fa fa-linkedin fa-fw"></i> <span className="network-name">Linkedin</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </div>
    );

  }
}

About.childContextTypes = {
  muiTheme: React.PropTypes.object
};
About.contextTypes = {
  history: PropTypes.history
}
export default About;

