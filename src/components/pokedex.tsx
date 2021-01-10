import React from "react";
import SearchBar from "./searchbar";
import PokemonsGrid from "./pokemonsGrid";
import SideBar from "./sideBar";
import VerticalListGroup from "./common/verticalListGroup";

import { getGenerations } from "../services/pokeServices/generationService";
class Pokedex extends React.Component<any, any> {
  state = {
    filters: [],
    generations: [],
    versions: [],
    types: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedFilter: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const data = await getGenerations();
    const generations = [{ _id: "", name: "All Generations" }, ...data];
    console.log(data);

    this.setState({ generations });
  }

  handleFilterSelect = (genre: string) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  render() {
    return (
      <div className="row">
        <div className="col-3">
          <SideBar />
        </div>
        <div className="col-3">
          <VerticalListGroup
            items={this.state.generations}
            selectedItem={this.state.selectedFilter}
            onItemSelect={this.handleFilterSelect}
          />
        </div>
        <div className="col">
          <SearchBar />
          <PokemonsGrid />
        </div>
      </div>
    );
  }
}

export default Pokedex;
