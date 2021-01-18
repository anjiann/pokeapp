import { Grid, IconButton } from "@material-ui/core";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Pokemon, PokemonType } from "../models/Pokemon";
import { getCurrentUser } from "../services/authService";
import { deletePokeFromFavorite, getfavList, getOnePokemon } from "../services/pokemonServices";
import { PokemonDisplay } from "./pokemonDisplay";
import { Favorites, User } from "../models/User";
import { pokeApi } from "../services/httpService";
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from "./common/pagination";



interface IPokemonDisplayProps {
  pokemons: Pokemon[];

}



const FavoritesList: React.FunctionComponent<IPokemonDisplayProps> = ({ pokemons }) => {

  const [favotiteList, changeFavoriteList] = useState<Favorites[]>([])
  const [favListOfPoke, changeFavListOfPoke] = useState<Pokemon[]>([])
  const [pageSize, setPageSize] = useState<number>(9);
  const [currPage, setCurrPage] = useState<number>(1);
  const [newData, setNewData] = useState<Boolean>(false)
  var user = JSON.parse(localStorage.getItem('userKey')!);
  const userid = user.userId;


  useEffect(() => {
    let getFavList = async () => {

      changeFavoriteList(await getfavList(userid))
    }
    getFavList()


    setNewData(false)

  }, [newData])


  let chageState = () => {

    console.log("clocked ")
    setNewData(true)

  }


  console.log()


  let displayPokemon = pokemons.map((fpokemon) => {
    for (let i = 0; i < favotiteList.length; i++) {
      if (fpokemon.id === favotiteList[i].favPokeId) {
        let isfav = true
        return (
          <Grid key={fpokemon.id} xs={2} item>
            <PokemonDisplay pokemon={fpokemon} favorite={favotiteList[i]} isfavorite={isfav} trigger={chageState} />

          </Grid>
        )
      }
    }
  })

  return (
    <div >
      <Grid container spacing={2} >
        {displayPokemon}
      </Grid>
      <Pagination
        itemsCount={favotiteList.length}
        pageSize={pageSize}
        currentPage={currPage}
        onPageChange={setCurrPage}
      />
    </div>
  )
}
export default FavoritesList;