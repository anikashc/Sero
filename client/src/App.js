import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Screens/Home';

function App() {

    return (
      <>
      <Header/>
      
      <main>
        <Container>
          <center>
              <h1>Welcome to Sero</h1>
          </center>

            <Home />
        </Container>
      </main>
      
      <Footer/>
      </>
    );
}

export default App;
