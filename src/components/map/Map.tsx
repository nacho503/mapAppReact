import React , {useEffect,useState,useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelectedPoint } from '../../store/form-point-selection/FormPointSelectionSlice';

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onIdle?: (map: google.maps.Map) => void;
  children: React.ReactNode | React.ReactNode[];
  isSelectingPoint: boolean; // Add this line
}


const Map: React.FC<MapProps> = (
  {
    onIdle,
    children,
    style,
    isSelectingPoint,
    ...options
  }
) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
    const dispatch = useDispatch();
    const selectedPoint = useSelector((state: RootState) => state.formPointSelection.selectedPoint);
    const markers: google.maps.Marker[] = [];

    // const isSelectingPoint = useSelector((state: RootState) => state.formPointSelection.isSelectingPoint);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleMapClick = (e: google.maps.MapMouseEvent) => {
      console.log(isSelectingPoint)
      if (isSelectingPoint) {
      console.log('Clicked at:', e.latLng.lat(), e.latLng.lng());
      dispatch(setSelectedPoint({ lat: e.latLng.lat(), lng: e.latLng.lng()}));
      }
    };


  //Set user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Handle the error gracefully, e.g., display a user message
        },
        { timeout: 5000 } // Timeout after 5 seconds
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

    useEffect(() => {
      const cleanup = () => {
        // Clear existing markers
        markers.forEach((marker) => marker.setMap(null));
        markers.length = 0; // Clear the array
      };

      console.log('isSelectingPoint:', isSelectingPoint);
      const initializeMap = () => {
       
        if (ref.current && !map) {
          const newMap = new window.google.maps.Map(ref.current, {
            zoom: 14,
            center: { lat: userLocation.lat, lng: userLocation.lng },
            ...options,
          });
          
  
          if (handleMapClick) {
            cleanup();
            newMap.addListener('click', handleMapClick);
          }
  
          setMap(newMap);
        }
      };
      setTimeout(()=>{
        initializeMap();
      },2000)

      return cleanup //Agregar este punto como el ultimo marker asi no desaparece
      
    }, [ref, map,handleMapClick, options, isSelectingPoint,selectedPoint,userLocation]);

    useEffect(() => {
      if (map && selectedPoint) {
        const newMarker = new google.maps.Marker({
          position: {
            lat: selectedPoint.lat || 0,
            lng: selectedPoint.lng || 0,
          },
          map: map,
          // Other marker options if needed
        });
  
        // Optional: Add a click listener to the new marker if needed
        newMarker.addListener('click', () => {
          // Handle click on the marker if needed
        });
  
        markers.push(newMarker);
      }
    }, [map, selectedPoint, markers]);
  

    return <>
           <div ref={ref} style={style}/>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                // set the map prop on the child component
                // @ts-ignore
                return React.cloneElement(child,{ map});
              }
            })}
      </>
};


export default Map;

