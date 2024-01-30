import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRTTableData,fetchRTGraphData } from '../api/RTTableApi';
import useRTStore from '../store/RTStore';

export const useRTTableDataMutation = () => {
  // const queryClient = useQueryClient();
  const { setTableData, tableLocation, tableUnit, tableDate, tableHour } = useRTStore();

  const tableMutate = () => {
    return fetchRTTableData(tableLocation, tableUnit, tableDate, tableHour);
  };

  const mutation = useMutation({
      mutationFn: tableMutate,
      onSuccess: (data, variables, context) => {
        // const queryClient = useQueryClient(); // 캐시 데이터된 무효화 -> 다시 실행 -> 최신 데이터
        setTableData(data);
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


export const useRTGraphDataMutation = () => {
  // const queryClient = useQueryClient();
  const { setGraphData, graphLocation, graphSubstance } = useRTStore();

  const graphMutate = () => {
    return fetchRTGraphData(graphLocation, graphSubstance);
  };

  const mutation = useMutation({
      mutationFn: graphMutate,
      onSuccess: (data, variables, context) => {
        // const queryClient = useQueryClient(); // 캐시 데이터된 무효화 -> 다시 실행 -> 최신 데이터
        setGraphData(data);
        console.log("✅ RTStore graph success", data);
      },
      onError: (error, variables, context) => {
        console.log("🚨 RTStore graph error", error);
      },
      onSettled: (data, error, variables, context) => {
        // console.log("🚀 Loading graph...");
      },
      //retry: 1,//오류 발생시, 1회 더 시도
  });

  return mutation;
}