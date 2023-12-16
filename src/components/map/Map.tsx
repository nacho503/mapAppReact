import React , {useEffect,useState,useRef} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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
    // const isSelectingPoint = useSelector((state: RootState) => state.formPointSelection.isSelectingPoint);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleMapClick = (e: google.maps.MapMouseEvent) => {
      console.log(isSelectingPoint)
      if (isSelectingPoint) {
      console.log('Clicked at:', e.latLng.lat(), e.latLng.lng());
      }
    };

    useEffect(() => {
      console.log('isSelectingPoint:', isSelectingPoint);
      const initializeMap = () => {
        if (ref.current && !map) {
          const newMap = new window.google.maps.Map(ref.current, {
            zoom: 14,
            center: { lat: -38.735901, lng: -72.590378 },
            ...options,
          });
  
          if (handleMapClick) {
            newMap.addListener('click', handleMapClick);
          }
  
          setMap(newMap);
        }
      };
  
      initializeMap();
    }, [ref, map,handleMapClick, options, isSelectingPoint]);
  

    return <>
           <div ref={ref} style={style}/>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                // set the map prop on the child component
                // @ts-ignore
                return React.cloneElement(child, { map });
              }
            })}
      </>
};


export default Map;

