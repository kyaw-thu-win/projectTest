import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import APIClient, { FetchResponse } from "../services/api-client";
import useQueryStore from "./queryStore";
import useAppStore from "../appStore";
import { User } from "../entities/Users";

const useUser = (slug: string) => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<User>("/users", token);
  return useQuery({
    queryKey: ["users", slug],
    queryFn: () => apiClient.get(slug),
  });
};

// queryKey : userId ? ['user',userId,'posts'] : ['posts']
// queryKey : ['posts',query]

export const useUsersAll = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/users", token);
  return useQuery<any, Error>({
    queryKey: ["users/all"],
    queryFn: () =>
      apiClient.getAll({
        params: {
          pageSize: 1000,
          roles: ["Admin", "Management", "User", "Customer"],
        },
      }),
  });
};

export const useUsers = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<User>("/users", token);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);
  const roles = useQueryStore((s) => s.roles);
  return useQuery<FetchResponse<User>, Error>({
    queryKey: ["users", page, pageSize, roles],
    // queryKey: ["users"],
    queryFn: () =>
      apiClient.getAll({
        params: {
          pageNumber: page || 0,
          pageSize: pageSize || 10,
          roles: roles,
        },
      }),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    // initialData: { count: genres.length, results: genres, next: null },
    // initialData: genres,
  });
};

interface AddUserContext {
  previousResult: FetchResponse<User>;
}

export const useUsersAdd = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<User>("/users", token);
  const queryClient = useQueryClient();
  return useMutation<User, Error, User, AddUserContext>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      // onSuccess: (saveUser, newUser) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: () => {},
  });
};

export const useUsersEdit = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/users", token);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.put,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useUsersDelete = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/users", token);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useUsersSearch = (searchText: string) => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/users", token);
  const roles = useQueryStore((s) => s.roles);
  return useQuery<any, Error>({
    queryKey: [`customers/${searchText}`],
    queryFn: () =>
      apiClient.getAll({
        params: {
          searchText: searchText,
          roles: roles,
        },
      }),
    onSuccess: () => {
      // setSearch
    },
  });
};

export const useUsersSearchId = (id: string) => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/users/search/id", token);
  const roles = useQueryStore((s) => s.roles);
  return useQuery<any, Error>({
    queryKey: [`customers/${id}`],
    queryFn: () =>
      apiClient.getAll({
        params: {
          id: id,
          roles: roles,
          // roles: userQuery.roles,
        },
      }),
  });
};

export default useUser;
