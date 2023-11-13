import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import Navbar from './components/navbar/Navbar';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './App.css';
import './styles/styles.scss';
import Map from './components/map-container/MapLoader';


const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const API_KEY = 'AIzaSyBmqsxJV92Ezb_4zFZxkEE6tL20wBPb4lA';

const style = {
  width: "100vw",
  height: "90vh",
  };

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Wrapper apiKey={API_KEY} render={render}>
        <Map style={style}/>
      </Wrapper>
    </div>
    </Router>
  );
}

export default App;
