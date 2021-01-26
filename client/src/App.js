import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Screens/Home';
import Menu from './Screens/Menu';

function App() {

    return (
      <Router>

        <Header />
        <main className='py-3'>
          <Container>
            <center>
                <h1>Welcome to Sero</h1>
            </center>

            <Route path='/' component={Home} exact />
            <Route path='/menu/:id' component={Menu} exact />

          </Container>
        </main>

        <Footer />

      </Router>
    );
}

export default App;
