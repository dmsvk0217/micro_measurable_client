import {  useEffect } from 'react';

// import Loading from '../loading';
import { useRawDataQuery } from '../hooks/useRawData';
import useMapStore from '../store/MapStore';


const MapDataProvider = ({ children }) => {
    const { isPending, error, data } = useRawDataQuery();
    const { setMapData } = useMapStore();


    useEffect(() => {
        if(data){
            setMapData(data.data);
            console.log(data.data);
        }
        else if(error){
            setMapData([]);
        }
    }, [error, data, setMapData]);

    return (
        !isPending ? children : <div>Loading...</div>
    );
};

export default MapDataProvider;