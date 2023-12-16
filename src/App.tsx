import { useEffect,useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Wrapper, Status as MapsStatus } from "@googlemaps/react-wrapper";
import { connect } from 'react-redux';
import { RootState } from './store/store';
import { PacmanLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

import UserAuthenticationWrapper from './utils/UserAuthenticationWrapper';
import LocationProvider from './utils/LocationProvider';
import Navbar from './components/navbar/Navbar';

import './styles/styles.scss';
import Map from './components/map/Map';
import Marker from './components/map/Marker';
import jake from './assets/map-icons/jake.png'


interface AppProps {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  isSelectingPoint: boolean;
}


const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'fallback_api_key';

const style = {
  width: "100vw",
  height: "90vh",
  };

  const render = (status: MapsStatus | null): JSX.Element => {
    if (status === MapsStatus.LOADING) {
      return (
        <div className="loading-spinner-overlay">
          <PacmanLoader color="#36D7B7" size={50} />
        </div>
      );
    } else if (status === MapsStatus.FAILURE) {
      return <h1>Error loading map</h1>;
    } else {
      return <div />; // or any other content you want to display when the map is loaded
    }
  };

function App({ latitude, longitude,loading }: AppProps) {
  const [mapKey, setMapKey] = useState(0);
  const position = loading ? null : { lat: latitude!, lng: longitude! };
  const isSelectingPoint = useSelector((state: RootState) => state.formPointSelection.isSelectingPoint);

  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1);
  }, [isSelectingPoint]);

  return (
    <Router>
    <div className="App">
      <Navbar/>
      <UserAuthenticationWrapper>
      <Wrapper apiKey={API_KEY} render={render}>
        <LocationProvider/> 
        {loading && (
          <div className="loading-spinner-overlay-fullscreen">
            <PacmanLoader color="#36D7B7" size={50} />
          </div>
        )}
        <Map key={mapKey} style={style} isSelectingPoint={isSelectingPoint}> 
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
  isSelectingPoint: state.formPointSelection.isSelectingPoint,
});

export default connect(mapStateToProps)(App);