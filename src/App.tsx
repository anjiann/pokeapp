import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import { User } from "./models/User";
import Pokedex from "./components/pokedex";
import Navbar from "./components/navbar";
import { NotFound } from "./components/notFound";

import ProtectedRoute from "./components/protectedRoute";

library.add(fas, faPlus, faHeart);

export const UserContext = React.createContext<any>(undefined);

function App() {
  const [user, changeUser] = useState<User>();
  return (
    <UserContext.Provider value={user}>
      <Navbar />
      <Router>
        <Switch>
          {/* <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute
            path="users/:userId/favourites"
            component={Favourites}
          />
          <ProtectedRoute
            path="users/:userId/teams/:teamId"
            component={Teams}
          /> */}
          <Route path="/pokemons" component={Pokedex} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/pokemons" />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
