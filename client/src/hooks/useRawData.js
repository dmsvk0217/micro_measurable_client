import { useQuery } from '@tanstack/react-query';

import { todayDate } from '../utils/format-time';
import { fetchRawData } from '../api/axiosApi';

// ----------------------------------------------------------------
export const useRawDataQuery = () => {

    const { isPending, error, data } = useQuery({
        queryKey: ['rawData'],
        queryFn: () => fetchRawData(todayDate()),
        staleTime: Infinity,
        refetchInterval: 1800000,
    });

    return { isPending, error, data };
};