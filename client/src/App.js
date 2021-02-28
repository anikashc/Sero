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
import Dashboard from './Screens/Dashboard';
import Feedback from './Screens/Feedback';
import DashboardMenu from './Screens/DashboardMenu';
import UserList from './Screens/UserList';
import UserEdit from './Screens/UserEdit';
import EateryList from './Screens/EateryList';
import EateryEdit from './Screens/EateryEdit';
import OrderSummary from './Screens/OrderSummary';
import OrderList from './Screens/OrderList';
function App() {

    return (
      <Router>

        <Header />

        <main>

          <Route path='/' component={Home} exact />

          <Container>
            <Route path = '/login' component={Login} />
            <Route path = '/register' component={Register} />
            <Route path = '/dashboard' component={Dashboard} />
            <Route path = '/dashboardMenu' component={DashboardMenu} />
            <Route path = '/menu/:id' component={Menu} exact />
            <Route path = '/cart' component={Cart} />
            <Route path = '/checkout' component={Checkout} />
            <Route path = '/payment' component={Payment} />
            <Route path = '/orderSummary/:id' component={OrderSummary} />
            <Route path = '/orders' component={OrderList} />
            <Route path = '/feedback' component={Feedback} />
            <Route path = '/admin/userlist' component={UserList} />
            <Route path = '/admin/user/:id/edit' component={UserEdit} />
            <Route path = '/admin/eatery/:id/edit' component={EateryEdit} />
            <Route path = '/admin/eaterylist' component={EateryList} />
          </Container>
        </main>

        <Footer />

      </Router>
    );
}

export default App;
