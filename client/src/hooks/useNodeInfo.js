import { useQuery } from '@tanstack/react-query';

import { fetchNodes } from '../api/nodeInfoApi';

export const useNodeInfo = () => {

    const { isPending, error, data } = useQuery({
        queryKey: ['nodes'],
        queryFn: () => fetchNodes(),
        staleTime: Infinity,
    });


    return { isPending, error, data };
};