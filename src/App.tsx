import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";

import { User } from "./models/User";
import Pokedex from "./components/pokedex";
import Navbar from "./components/navbar";

export const UserContext = React.createContext<any>(undefined);

function App() {
  const [user, changeUser] = useState<User>();
  return (
    <UserContext.Provider value={user}>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/pokemons" component={Pokedex} />
          <Redirect exact from="/" to="/pokemons" />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
