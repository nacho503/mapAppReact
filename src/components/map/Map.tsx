import React , {useEffect,useState,useRef} from 'react';



interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children: React.ReactNode | React.ReactNode[];
}


const Map: React.FC<MapProps> = (
  {
    onClick,
    onIdle,
    children,
    style,
    ...options
  }
) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
      if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {
          zoom: 14,
          center: { lat: -38.735901, lng: -72.590378 }, 
          ...options, 
        }));
      }
    }, [ref, map,options]);

    return <><div ref={ref} style={style}/>
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