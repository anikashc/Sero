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
import Cart from './Screens/Cart';
import Checkout from './Screens/Checkout';

function App() {

    return (
      <Router>

        <Header />
        <main>
          <Route path='/' component={Home} exact />
          <Container>
            

            
            <Route path='/menu/:id' component={Menu} exact />
            <Route path = '/cart' component={Cart} />
            <Route path = '/checkout' component={Checkout} />

          </Container>
        </main>

        <Footer />

      </Router>
    );
}

export default App;
