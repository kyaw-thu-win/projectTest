import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import APIClient from "../services/api-client";
import useQueryStore from "./queryStore";
import useAppStore from "../appStore";

const useAnimalHistory = (slug: string) => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/animals/byOwner", token);
  return useQuery({
    queryKey: ["animalHistorys", slug],
    queryFn: () => apiClient.get(slug),
  });
};

export const useAnimalHistorys = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/animalHistorys", token);
  return useQuery({
    queryKey: ["animalHistorys"],
    queryFn: () => apiClient.getAll({}),
  });
};

export const useAnimalHistoryByAnimal = (slug: string) => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/animalHistorys/byAnimal", token);

  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);

  return useQuery({
    queryKey: [`animalHistorys/${slug}`],
    queryFn: () =>
      apiClient.getAll({
        params: {
          animalId: slug,
          pageNumber: page || 0,
          pageSize: pageSize || 10,
        },
      }),
  });
};

export const useAnimalHistorysAdd = () => {
  const token = useAppStore((s) => s.token);
  const apiClientAdd = new APIClient<any>("/animalHistorys", token);
  // const useAddMgtUser = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClientAdd.post,
    onMutate: (newData: any) => {
      return newData.animalId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`animalHistorys`],
      });
    },
  });
};

export const useAnimalHistorysEdit = () => {
  const token = useAppStore((s) => s.token);
  const apiClientEdit = new APIClient<any>("/animalHistorys", token);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClientEdit.put,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`animalHistorys`],
      });
    },
  });
};

export const useAnimalHistorysDelete = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/animalHistorys", token);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      queryClient.invalidateQueries({
        queryKey: ["animalHistorys"],
      });
    },
  });
};
export default useAnimalHistory;
