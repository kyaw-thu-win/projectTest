import useAppStore from "../appStore";
import MgtUser from "../entities/mgtUser";
import APIClient from "./api-client";

// export default new APIClient<MgtUser>("/users");

const newTest = () => {
  const token = useAppStore((s) => s.token);
  return new APIClient<MgtUser>("/users", token);
};
export default newTest;
