
import { User } from "../models/User";
import { dbApi } from "./httpService";
export class UserR {
  userName: string;
  userPassword: string;
  userFirstName: string;
  userLastName: string;
}
const apiEndpoint = "/user";
export function register(user:UserR) {
  return dbApi.post(apiEndpoint, {
    userName: user.userName,
    userPassword: user.userPassword,
    userFirstname: user.userFirstName,
    userLastname: user.userLastName,
  });
}

