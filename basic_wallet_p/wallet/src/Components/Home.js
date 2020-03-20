import React, { useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import {
  Button,
  Form,
  Badge,
  Container,
  Tabs,
  Tab,
  Table
} from 'react-bootstrap';

const Home = () => {
  const [userID, setUserID] = useState();
  const [balace, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .get('http://localhost:5000/chain')
      .then(res => {
        const transArray = res.data.chain;
        filterResults(transArray);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const filterResults = arr => {
    let total = 0;
    let transArr = [];
    for (var i = 0; i < arr.length; i++) {
      let myArr = arr[i]['transactions'];
      for (var j = 0; j < myArr.length; j++) {
        if (myArr[0]['amount'] > 0 && myArr[0]['receiver'] == `${userID}\n`) {
          transArr.push(myArr[0]);
          total += myArr[0]['amount'];
        }
      }
    }
    setBalance(total);
    setTransactions(transArr);
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
                  <option>Select User</option>
                  <option>Fritz</option>
                  <option>Alex</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Get Results
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
        <Tab eventKey="Transactions" title="Transactions">
          <Container>
            <br />
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Receiver</th>
                  <th>Sender</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.timestamp}>
                    <td>${t.amount}</td>
                    <td>{t.receiver}</td>
                    <td>{t.sender}</td>
                    <td>
                      <Moment format="YYYY/MM/DD" unix>
                        {t.timestamp}
                      </Moment>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <br />
            <br />
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Home;
