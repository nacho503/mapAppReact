import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';

import { loginSuccess, logout } from './components/navbar/login-button/LoginSlice';

import { BrowserRouter as Router } from 'react-router-dom';
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
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  useEffect(() => {
    // Check if the user is already logged in (you might want to improve this check)
    const token = sessionStorage.getItem('token');

    if (token && !isLoggedIn) {
      // If there's a token and the user is not logged in, fetch user data
      fetchUserData(token);
    }
  }, [isLoggedIn]);


  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('https://nodemysqlrailwaytest-production.up.railway.app/user-data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(loginSuccess({ email: userData.email }));
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
      dispatch(logout()); // Log out the user if there's an error fetching data
    }
  };

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
