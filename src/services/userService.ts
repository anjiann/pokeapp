import { dbApi } from "./httpService";
import { User } from "../models/User";

const apiEndpoint = "/users";

export function register(user: User) {
  return dbApi.post(apiEndpoint, {
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
  });
}
