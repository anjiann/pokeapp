
import { dbApi } from "./httpService";

const apiEndpoint = "/auth";
//const userKey = "user";

export async function login(userName: string, userPassword: string) {
try{

  let res = await dbApi.post(apiEndpoint, { userName, userPassword });
  localStorage.setItem("userKey", JSON.stringify(res.data));
 //localStorage.setItem(userKey,res.data); 
 
 console.log(localStorage.getItem("userKey"));
  return res.data
}
catch(e){
  console.log(e);
  if(e.response){
      throw new Error(e.response.data)
  } else {
      throw new Error("OOps Something went wrong?")
  }
}
}

export function logout() {
  localStorage.removeItem("userKey");
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem("userKey");
    return user;
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
};
