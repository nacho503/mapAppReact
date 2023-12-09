import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setPosition,setError } from '../store/position/PositionSlice'

interface LocationProviderProps {
  setPosition: typeof setPosition;
  setError: typeof setError;
}

const LocationProvider: React.FC<LocationProviderProps> = ({ setPosition, setError }) => {
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition({ latitude, longitude });
            console.log(position.coords)
          },
          (error) => {
            setError('Error getting user location');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, [setPosition, setError]);

  return null;
};

const mapDispatchToProps = {
  setPosition,
  setError,
};

export default connect(null, mapDispatchToProps)(LocationProvider);
