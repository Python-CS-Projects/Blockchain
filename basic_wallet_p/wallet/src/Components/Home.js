import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Badge, Container, Tabs, Tab } from 'react-bootstrap';

const Home = () => {
  const [userID, setUserID] = useState();
  const [receiver, setReceiver] = useState();
  const [amount, setAmount] = useState();
  const [balace, setBalance] = useState(0);

  const handleSubmit = e => {
    console.log('Click button: ', userID);
    e.preventDefault();
    axios
      .get('http://localhost:5000/chain')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select ID</Form.Label>
                <Form.Control
                  as="select"
                  onChange={e => setUserID(e.target.value)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
            <Container className="App-header">
              <h3>Current Balance: </h3>
              <h1>
                <Badge variant="secondary">${balace}</Badge>
              </h1>
            </Container>
          </Container>
        </Tab>
        <Tab eventKey="Transactions" title="Transactions"></Tab>
      </Tabs>
    </div>
  );
};

export default Home;
