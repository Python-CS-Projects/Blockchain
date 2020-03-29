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

////////////////How To Use///////////////////////////

// In order to use it first run:
// 1. blockchain.py
// 2. miner.py and wait to generate some coins then stop
// 3. then chain the name in my_id.text (Alex or Fritz)
// 4. miner.py and wait to generate some coins then stop
// 5. Run switch to this directory to run npm start and test

///////////////////////////////////////////

const Home = () => {
  //Hooks
  const [userID, setUserID] = useState();
  const [balace, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .get('http://localhost:5000/chain')
      .then(res => {
        //Array off transactions
        const transArray = res.data.chain;
        //Call function to filter transactions based on selected user
        filterResults(transArray);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const filterResults = arr => {
    //Properties
    let total = 0;
    let transArr = [];
    //Nested loop to get the disired values
    for (var i = 0; i < arr.length; i++) {
      let myArr = arr[i]['transactions'];
      for (var j = 0; j < myArr.length; j++) {
        //If the user match the receiver
        if (myArr[0]['amount'] > 0 && myArr[0]['receiver'] == `${userID}\n`) {
          //Push to the array of transactions
          transArr.push(myArr[0]);
          //Add to total
          total += myArr[0]['amount'];
        }
      }
    }
    //Set balance hook
    setBalance(total);
    //set array of transactions
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
