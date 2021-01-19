import { User } from "../models/User";
import { dbApi } from "./httpService";
export class UserR {
  userName: string;
  userPassword: string;
  userFirstName: string;
  userLastName: string;
}
const apiEndpoint = "/user";
export function register(user: UserR) {
  return dbApi.post(apiEndpoint, {
    // userId:user.userId,
    userName: user.userName,
    userPassword: user.userPassword,
    userFirstname: user.userFirstName,
    userLastname: user.userLastName,
  });
}

export const getUserById = async (id: number): Promise<User> => {
  try {
    let res = await dbApi.get(`/user/${id}`);
    let user = new User();
    user.userId = res.data.userId;
    user.userName = res.data.userName;
    user.userPassword = res.data.userPassword;
    user.userFirstName = res.data.userFirstname;
    user.userLastName = res.data.userLastname;
    user.userFavorites = res.data.favlist;
    user.userTeams = res.data.teams;
    return user;
  } catch (e) {
    throw new Error();
  }
};
