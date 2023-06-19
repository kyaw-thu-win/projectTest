import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import useAppStore from "../appStore";

const useTotal = () => {
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/total", token);
  return useQuery<any, Error>({
    queryKey: ["total"],
    queryFn: () => apiClient.getAll({}),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    // initialData: { count: genres.length, results: genres, next: null },
    // initialData: genres,
  });
};

export default useTotal;
