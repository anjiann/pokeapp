import React from "react";
import SearchBar from "./searchbar";
import PokemonsGrid from "./pokemonsGrid";
import SideBar from "./sideBar";
import ListGroup from "./common/listGroup";

import { getGenerations } from "../services/pokeServices/generationService";
class Pokedex extends React.Component<any, any> {
  state = {
    categories: [{ name: "generation" }, { name: "version" }, { name: "type" }],
    filters: [],
    generations: [],
    versions: [],
    types: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedCategory: null,
    selectedFilter: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const data = await getGenerations();
    const generations = [{ _id: "", name: "All Generations" }, ...data];

    this.setState({ generations });
    this.setState({ filters: generations });
  }

  handleCategorySelect = (category: string) => {
    this.setState({ selectedCategory: category });
  };

  handleFilterSelect = (filter: string) => {
    this.setState({ selectedFilter: filter, searchQuery: "", currentPage: 1 });
  };

  render() {
    return (
      <div className="row">
        <div className="col-3">
          <SideBar />
        </div>
        <div className="col-3">
          <ListGroup
            items={this.state.categories}
            selectedItem={this.state.selectedCategory}
            onItemSelect={this.handleCategorySelect}
            textProperty="name"
            valueProperty="name"
            isHorizontal={true}
          />
          <ListGroup
            items={this.state.filters}
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
