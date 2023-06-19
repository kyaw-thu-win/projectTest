import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import useAppStore from "../appStore";
// import useUserQueryStore from "./userQueryStore";
// import Swal from "sweetalert2";

export const useAuth = () => {
  // const queryClient = useQueryClient();
  const token = useAppStore((s) => s.token);
  const apiClient = new APIClient<any>("/auth", token);
  return useMutation<any, Error, any>({
    mutationFn: apiClient.auth,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["users"],
    //   });
    // },
  });
};
export default useAuth;
