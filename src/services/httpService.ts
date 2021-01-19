import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  ({ data }: AxiosResponse) => data,
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.log(error);
      toast.error("An unexpected error occurrred.");
    }

    return Promise.reject(error);
  }
);

export const dbApi = axios.create({ baseURL: "http://localhost:10000" });
export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});
