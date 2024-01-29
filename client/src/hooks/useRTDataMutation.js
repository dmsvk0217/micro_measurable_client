import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRTTableData,fetchRTGraphData } from '../api/RTTableApi';
import useRTStore from '../store/RTStore';

export const useRTTableDataMutation = () => {
  // const queryClient = useQueryClient();
  const { setTableData } = useRTStore();

  const tableMutate = (selectOption) => {
    return fetchRTTableData(selectOption);
  };

  const mutation = useMutation({
      mutationFn: tableMutate,
      onSuccess: (data, variables, context) => {
        // const queryClient = useQueryClient(); // 캐시 데이터된 무효화 -> 다시 실행 -> 최신 데이터
        setTableData(data);
        console.log("✅ RTStore success", data);
      },
      onError: (error, variables, context) => {
        console.log("🚨 RTStore error", error);
      },
      onSettled: (data, error, variables, context) => {
        console.log("🚀 Loading...");
      },
      retry: 1,//오류 발생시, 1회 더 시도
  });

  return mutation;
}


export const useRTGraphDataMutation = () => {
  // const queryClient = useQueryClient();
  const { setGraphData } = useRTStore();

  const graphMutate = (selectOption) => {
    return fetchRTGraphData(selectOption);
  };

  const mutation = useMutation({
      mutationFn: graphMutate,
      onSuccess: (data, variables, context) => {
        // const queryClient = useQueryClient(); // 캐시 데이터된 무효화 -> 다시 실행 -> 최신 데이터
        setGraphData(data);
        console.log("✅ RTStore success", data);
      },
      onError: (error, variables, context) => {
        console.log("🚨 RTStore error", error);
      },
      onSettled: (data, error, variables, context) => {
        console.log("🚀 Loading...");
      },
      retry: 1,//오류 발생시, 1회 더 시도
  });

  return mutation;
}