import axios, { AxiosRequestConfig } from "axios";
import useAppStore from "../appStore";

export interface FetchResponse<T> {
  count: number;
  result: T[];
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/api",
  // params: {
  //   key: "3fd660604e0547428c9efd18ee8e9933",
  // },
});

class APIClient<T> {
  endpoint: string;
  token: string;
  constructor(endpoint: string, token: string) {
    this.endpoint = endpoint;
    this.token = token;
  }

  getAll = async (config: AxiosRequestConfig) => {
    const headerFormat = {
      headers: {
        "content-type": "multipart/form-data",
        "x-auth-token": this.token,
      },
    };
    const newConfig = Object.assign(config, headerFormat);
    const res = await axiosInstance.get<FetchResponse<T>>(
      this.endpoint,
      newConfig
    );
    return res.data;
  };

  getDB = async () => {
    const res = await axiosInstance.get(this.endpoint);
    return res.data;
  };

  postDB = async (data: any) => {
    // const token = "ABCDE";
    const token = useAppStore((s) => s.token);
    const headerFormat = {
      "content-type": "multipart/form-data",
      "x-auth-token": token,
    };
    const res = await axiosInstance.post(this.endpoint, data, {
      headers: headerFormat,
    });
    // const res = await axiosInstance.get(this.endpoint);
    return res.data;
  };

  get = async (id: number | string) => {
    const res = await axiosInstance.get<T>(this.endpoint + "/" + id);
    return res.data;
  };

  post = async (data: any) => {
    let headerFormat;
    if (data.imageFile) {
      headerFormat = {
        "content-type": "multipart/form-data",
        // "x-auth-token": this.token,
      };
    } else {
      headerFormat = {
        // "x-auth-token": this.token,
      };
    }
    const res = await axiosInstance.post<T>(this.endpoint, data, {
      headers: headerFormat,
    });
    return res.data;
  };

  auth = async (data: T) => {
    const res = await axiosInstance.post<T>(this.endpoint, data);
    return res.data;
  };

  put = async (data: any) => {
    // const token = useAppStore((s: any) => s.token);
    const token = "AGBCDDS";
    let headerFormat;
    if (data.data.imageFile) {
      headerFormat = {
        "content-type": "multipart/form-data",
        "x-auth-token": token,
      };
    } else {
      headerFormat = {
        "x-auth-token": token,
      };
    }
    const res = await axiosInstance.put<T>(
      this.endpoint + "/" + data._id,
      data.data,
      {
        headers: headerFormat,
      }
    );
    return res.data;
  };

  putRead = async (data: any) => {
    const res = await axiosInstance.put<T>(this.endpoint, data, {
      headers: {
        "x-auth-token": this.token,
      },
    });
    return res.data;
  };

  delete = async (id: number | string) => {
    const token = "AGBCDDS";
    const res = await axiosInstance.delete<T>(this.endpoint + "/" + id, {
      headers: {
        "x-auth-token": token,
      },
    });
    return res.data;
  };
}

export default APIClient;

// getAllb = (config: AxiosRequestConfig) => {
//   return axiosInstance
//     .get<FetchResponse<T>>(this.endpoint, config)
//     .then((res) => res.data);
// };

// get = (id: number | string) => {
//   return axiosInstance
//     .get<T>(this.endpoint + "/" + id)
//     .then((res) => res.data);
// };
