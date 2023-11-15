import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import UserAuthenticationWrapper from './utils/UserAuthenticationWrapper';

import './App.css';
import './styles/styles.scss';
import Map from './components/map/Map';
import Marker from './components/map/Marker';


const render = (status: Status) => {
  return <h1>{status}</h1>;
};


const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'fallback_api_key';

const position = { lat: -38.735901, lng: -72.590378 };
const style = {
  width: "100vw",
  height: "90vh",
  };

function App() {

  return (
    <Router>
    <div className="App">
      <Navbar/>
      <UserAuthenticationWrapper>
      <Wrapper apiKey={API_KEY} render={render}>
        <Map style={style}>
          <Marker position={position} />
        </Map>
      </Wrapper>
      </UserAuthenticationWrapper>
    </div>
    </Router>
  );
}

export default App;
