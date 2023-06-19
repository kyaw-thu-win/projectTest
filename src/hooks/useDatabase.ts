import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import useAppStore from "../appStore";

export const useDatabaseGet = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/dbBackUpRestore", token);
  // const useAddMgtUser = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.getAll,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["database"],
      });

      // Swal.fire("Submitted!", "Your file has been submitted.", "success");
    },
  });
};

export const useDatabasePost = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/dbBackUpRestore", token);
  // const useAddMgtUser = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.postDB,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["database"],
      });
    },
  });
};
