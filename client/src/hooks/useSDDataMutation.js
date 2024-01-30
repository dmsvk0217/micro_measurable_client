import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSDTableData } from '../api/SDTableApi';
import useSDStore from '../store/SDStore';

export const useSDTableDataMutation = () => {
  // const queryClient = useQueryClient();
  const { setTableData } = useSDStore();

  const tableMutate = (selectOption) => {
    return fetchSDTableData(selectOption);
  };

  const mutation = useMutation({
      mutationFn: tableMutate,
      onSuccess: (data, variables, context) => {
        setTableData(data);
        console.log("✅ SMStore success", data);
      },
      onError: (error, variables, context) => {
        console.log("🚨 SMStore error", error);
      },
      onSettled: (data, error, variables, context) => {
        console.log("🚀 Loading...");
      },
      retry: 1,//오류 발생시, 1회 더 시도
  });

  return mutation;
}

