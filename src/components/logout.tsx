import React from "react";
import auth from "../services/authService";
import { useHistory } from "react-router-dom";

const Logout: React.FunctionComponent<any> = () => {
  auth.logout();
  const history = useHistory();

  history.push("/");

  return null;
};

export default Logout;
