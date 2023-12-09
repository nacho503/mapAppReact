import React , {useEffect,useState,useRef} from 'react';



interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onIdle?: (map: google.maps.Map) => void;
  children: React.ReactNode | React.ReactNode[];
}


const Map: React.FC<MapProps> = (
  {
    onIdle,
    children,
    style,
    ...options
  }
) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
      console.log('Clicked at:', e.latLng.lat(), e.latLng.lng());
      // You can do something with the coordinates here
    };

    useEffect(() => {
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
    }, [ref, map,handleMapClick, options]);
  

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