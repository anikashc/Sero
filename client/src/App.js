import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header'
import Footer from './Components/Footer'
import  {Container} from 'react-bootstrap'
function App() {
  return (
    <div>
      <Header />
      
      <main>
        <Container>
        <h1>Welcome to Sero</h1>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
