import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import UserAuthenticationWrapper from './utils/UserAuthenticationWrapper';
import { connect } from 'react-redux';
import { RootState } from './store/store';
import LocationProvider from './utils/LocationProvider';

import './styles/styles.scss';
import Map from './components/map/Map';
import Marker from './components/map/Marker';
import jake from './assets/map-icons/jake.png'

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface AppProps {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
}


const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'fallback_api_key';

const style = {
  width: "100vw",
  height: "90vh",
  };

function App({ latitude, longitude,loading }: AppProps) {
  const position = loading
  ? null 
  : { lat: latitude!, lng: longitude! }; 

  return (
    <Router>
    <div className="App">
      <Navbar/>
      <UserAuthenticationWrapper>
      <Wrapper apiKey={API_KEY} render={render}>
        <LocationProvider/> 
        <Map style={style}>
        {position !== null && <Marker position={position} icon={jake} />}
        </Map>
      </Wrapper>
      </UserAuthenticationWrapper>
    </div>
    </Router>
  );
}

const mapStateToProps = (state: RootState) => ({
  latitude: state.position.latitude,
  longitude: state.position.longitude,
  loading: state.position.latitude === null || state.position.longitude === null,
});

export default connect(mapStateToProps)(App);