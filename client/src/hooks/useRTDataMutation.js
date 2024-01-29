import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRTTableData } from '../api/RTTableApi';
import useRTStore from '../store/RTStore';

export const useRTDataMutation = () => {
  // const queryClient = useQueryClient();
  const { setTableData } = useRTStore();

  const mutation = useMutation({
      mutationFn: (selectOption) => {
        return fetchRTTableData(selectOption);
      },
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
