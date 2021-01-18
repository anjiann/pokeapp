
import React, { useState, useEffect } from "react";
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
import { getPokemons } from "./services/pokeServices/pokemonService";
import ProtectedRoute from "./components/protectedRoute";
import Login from "./components/loginComponent/login";
import Register from "./components/registerComponent/register";
import FavoritesList from "./components/favoriteslist";
import Team from "./components/team";
import TeamCard from "./components/teamCard";
import { Pokemon } from "./models/Pokemon";

library.add(fas, faPlus, faHeart);
export const PokemonContext=React.createContext<any>(undefined);
export const UserContext = React.createContext<any>(undefined);
function App() {
  const [user, changeUser] = useState<User>();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    const initializeData = async () => {
      let pokemons = await getPokemons();

      setPokemons(pokemons);
    };
    initializeData();
  }, []);

  return (
    <UserContext.Provider value={user}>
 <PokemonContext.Provider value={pokemons}>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>

          <Route path="/fav"
            render={() => <FavoritesList pokemons={pokemons} />}
          ></Route>
          <Route path="/teams" component={Team}></Route>
          <Route path="/register" component={Register} />
          {/* <ProtectedRoute
            path="users/:userId/favourites"
            component={Favourites}
          />
          <ProtectedRoute
            path="users/:userId/teams/:teamId"
            component={Teams}
          /> */}
          <Route
            path="/pokemons"
            render={() => <Pokedex pokemons={pokemons} />}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/pokemons" />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
      </PokemonContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
