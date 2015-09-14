import React from 'react';
import {Button, Grid, Row, Col} from 'react-bootstrap';
class Login extends React.Component {
  
  render() {
    return (
      <Grid>
        <div className="fl-auth lead">
        <Row>
            <Col xs={3} md={4}/>
            <Col xs={6} md={4}>
              <h1>Freelah</h1>
            </Col>
            <Col xs={3} md={4}/>
        </Row>
        <Row>
            <Col xs={3} md={4}/>
            <Col xs={6} md={4}>
              <Button bsSize="lg" bsStyle="primary">
                Login
              </Button>
            </Col>
            <Col xs={3} md={4}/>
        </Row>
        </div>
      </Grid>
    );
  }

}

export default Login;