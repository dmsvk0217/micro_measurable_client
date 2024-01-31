import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMapData } from '../api/MapApi';
import useMapStore from '../store/MapStore';

export const useRTTableDataMutation = () => {
  // const queryClient = useQueryClient();
  const { mapLocation, setMapData } = useMapStore();

  const tableMutate = () => {
    return fetchMapData(mapLocation);
  };

  const mutation = useMutation({
      mutationFn: tableMutate,
      onSuccess: (data, variables, context) => {
        // const queryClient = useQueryClient(); // 캐시 데이터된 무효화 -> 다시 실행 -> 최신 데이터
        setMapData(data);
        console.log("✅ RTStore table success", data);
      },
      onError: (error, variables, context) => {
        console.log("🚨 RTStore table error", error);
      },
      onSettled: (data, error, variables, context) => {
        // console.log("🚀 Loading table ...");
      },
      //retry: 1,//오류 발생시, 1회 더 시도
  });

  return mutation;
}