import {  useEffect } from 'react';

import useNodeInfoStore from '../store/NodeInfoStore';
// import Loading from '../loading';
import { useNodeInfo } from '../hooks/useNodeInfo';


const NodeInfoProvider = ({ children }) => {
    const { isPending, error, data } = useNodeInfo();
    const { setNodes } = useNodeInfoStore();

    useEffect(() => {
        if(data){
            setNodes(data.data);
            console.log(data.data);
        }
        else if(error){
            setNodes([]);
        }
    }, [error, data, setNodes]);

    return (
        !isPending ? children : <div>Loading...</div>
    );
};

export default NodeInfoProvider;