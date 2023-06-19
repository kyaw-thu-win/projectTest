import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAppStore from "../appStore";
import APIClient from "../services/api-client";
import useQueryStore from "./queryStore";

// const apiClient = new APIClient<any>("/messages");

// const useUser = (slug: string) =>
//   useQuery({
//     queryKey: ["users", slug],
//     queryFn: () => apiClient.get(slug),
//   });

export const useMessagesInbox = () => {
  const token = useAppStore((s) => s.token);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);
  const apiClient = new APIClient<any>("/messages/inbox", token);
  return useQuery<any, Error>({
    queryKey: ["messagesInbox", page, pageSize],
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

export const useMessagesSendbox = () => {
  const token = useAppStore((s) => s.token);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);
  const apiClient = new APIClient<any>("/messages/sendbox", token);
  return useQuery<any, Error>({
    queryKey: ["messagesSendbox", page, pageSize],
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

export const useMessageSend = () => {
  // const useAddMgtUser = (onAdd: () => void) => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/messages", token);
  const queryClient = useQueryClient();
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);
  return useMutation<any, Error, any>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messagesInbox", page, pageSize],
      });
      queryClient.invalidateQueries({
        queryKey: ["messagesSendbox", page, pageSize],
      });

      Swal.fire("Submitted!", "Your file has been submitted.", "success");
    },
  });
};

export const useMessageEditRead = () => {
  const token = useAppStore((s) => s.token);
  // const useAddMgtUser = (onAdd: () => void) => {
  const apiClient = new APIClient<any>("/messages/read", token);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.putRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messagesInbox", page, pageSize],
      });
    },
  });
};

export const useMessageDeleteInbox = () => {
  const token = useAppStore((s) => s.token);
  // const useAddMgtUser = (onAdd: () => void) => {
  const apiClient = new APIClient<any>("/messages/delete", token);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.putRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messagesInbox", page, pageSize],
      });
    },
  });
};

export const useMessagesDelete = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/messages", token);
  const page = useQueryStore((s) => s.page);
  const pageSize = useQueryStore((s) => s.pageSize);
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      Swal.fire("Deleted!", "Your Message has been deleted.", "success");
      queryClient.invalidateQueries({
        queryKey: ["messagesSendbox", page, pageSize],
      });
      queryClient.invalidateQueries({
        queryKey: ["messagesInbox", page, pageSize],
      });
    },
  });
};

// export default useUser;
