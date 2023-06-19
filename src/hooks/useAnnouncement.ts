import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAppStore from "../appStore";
import APIClient from "../services/api-client";
import useQueryStore from "./queryStore";

// const apiClient = new APIClient<any>("/announcements");

// const useUser = (slug: string) =>
//   useQuery({
//     queryKey: ["users", slug],
//     queryFn: () => apiClient.get(slug),
//   });

export const useAnnouncements = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/announcements", token);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);
  const userId = useAppStore((state: any) => state.userId);
  return useQuery<any, Error>({
    queryKey: ["announcements", page + "/" + pageSize],
    queryFn: () =>
      apiClient.getAll({
        params: {
          pageNumber: page || 0,
          pageSize: pageSize || 10,
          userId: userId,
        },
      }),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    // initialData: { count: genres.length, results: genres, next: null },
    // initialData: genres,
  });
};

export const useAnnouncementsAdd = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/announcements", token);
  // const useAddMgtUser = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
};

// const apiClient = new APIClient<any>("/messages/read");
// const queryClient = useQueryClient();
// return useMutation<any, Error, any>({
//   mutationFn: apiClient.putMessage,
//   onSuccess: () => {
//     queryClient.invalidateQueries({
//       queryKey: ["messagesInbox"],
//     });
//   },
// });

export const useAnnouncementsRead = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/announcements/read", token);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.putRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
};

export const useAnnouncementsEdit = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/announcements", token);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.put,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
};

export const useAnnouncementDelete = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/announcements", token);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
};

export const useAnnouncementDeletePut = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/announcements/delete", token);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.putRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
};

// export default useUser;
