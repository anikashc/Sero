import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Screens/Home';
import Menu from './Screens/Menu';
import Cart from './Screens/Cart';
import Login from './Screens/Login';
import Register from './Screens/Register'
import Checkout from './Screens/Checkout';
import Payment from './Screens/Payment';
import Profile from './Screens/Profile';
import AddItem from './Screens/AddItem';
import UpdateDetails from './Screens/UpdateDetails';
import Feedback from './Screens/Feedback';
import DashboardMenu from './Screens/DashboardMenu';

function App() {

    return (
      <Router>

        <Header />
        <main>
          <Route path='/' component={Home} exact />
          <Container>
            
            <Route path = '/login' component={Login} />
            <Route path = '/register' component={Register} />
            <Route path = '/profile' component={Profile} />
            <Route path = '/dashboardMenu' component={DashboardMenu} />
            <Route path = '/addItem' component={AddItem} />
            <Route path = '/updateDetails' component={UpdateDetails} />
            <Route path = '/menu/:id' component={Menu} exact />
            <Route path = '/cart' component={Cart} />
            <Route path = '/checkout' component={Checkout} />
            <Route path = '/payment' component={Payment} />
            <Route path = '/feedback' component={Feedback} />

          </Container>
        </main>

        <Footer />

      </Router>
    );
}

export default App;
