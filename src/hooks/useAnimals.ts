import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import APIClient from "../services/api-client";
import useQueryStore from "./queryStore";
import useAppStore from "../appStore";

const useAnimal = (slug: string) => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/animals/", token);
  return useQuery({
    queryKey: ["users", slug],
    queryFn: () => apiClient.get(slug),
  });
};
export const useAnimalByOwner = (slug: string) => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/animals/byOwner", token);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);
  return useQuery({
    queryKey: [`animals/${slug}`],
    queryFn: () =>
      apiClient.getAll({
        params: {
          ownerId: slug,
          pageNumber: page || 0,
          pageSize: pageSize || 10,
        },
      }),
  });
};

export const useAnimals = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/animals/byOwner", token);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);
  return useQuery<any, Error>({
    queryKey: ["users", page + "/" + pageSize],
    queryFn: () =>
      apiClient.getAll({
        params: {
          pageNumber: page || 0,
          pageSize: pageSize || 10,
        },
      }),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    // initialData: { count: genres.length, results: genres, next: null },
    // initialData: genres,
  });
};

export const useAnimalsAdd = (ownerId: any) => {
  const token = useAppStore((s) => s.token);
  const apiClientAdd = new APIClient<any>("/animals", token);
  // const useAddMgtUser = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClientAdd.post,
    onMutate: (newData: any) => {
      return newData.ownerId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`animals/${ownerId}`],
      });
    },
    // onMutate: (newMgtUser: MgtUser) => {
    //   // For UI
    //   // onAdd();
    // },
    // onSuccess: (saveMgtUser, newMgtUser) => {
    //   // APPROACH : Invalidating the cache
    //   // queryClient.invalidateQueries({
    //   //   queryKey: ['todos']
    //   // })

    //   // APPROACH 2 : Updating the data in the cache
    //   queryClient.setQueryData<MgtUser[]>(CACHE_KEY_MgtUsers, (mgtUsers) => {
    //     return mgtUsers?.map((mgtUser) =>
    //       mgtUser === newMgtUser ? saveMgtUser : mgtUser
    //     );
    //   });
    // },
    // onError: (error, newMgtUser, context) => {
    //   if (!context) return;
    //   queryClient.setQueryData<MgtUser[]>(
    //     CACHE_KEY_MgtUsers,
    //     context.previousMgtUsers
    //   );
    // },
  });
};

export const useAnimalsEdit = (ownerId: any) => {
  const token = useAppStore((s) => s.token);
  const apiClientEdit = new APIClient<any>("/animals", token);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClientEdit.put,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`animals/${ownerId}`],
      });
    },
  });
};

export const useAnimalsDelete = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/animals", token);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      queryClient.invalidateQueries({
        queryKey: ["animals"],
      });
    },
  });
};
export default useAnimal;
