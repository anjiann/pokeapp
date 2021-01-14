import React from "react";
import SearchBar from "./searchbar";
import PokemonsGrid from "./pokemonsGrid";
import SideBar from "./sideBar";
import ListGroup from "./common/listGroup";

import { getGenerations } from "../services/pokeServices/generationService";
import { getTypes } from "../services/pokeServices/typeService";

class Pokedex extends React.Component<any, any> {
  state = {
    categories: [{ name: "generation" }, { name: "type" }],
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
    let data = await getGenerations();
    const generations = [{ _id: "", name: "All Generations" }, ...data];
    data = await getTypes();
    const types = [{ _id: "", name: "All Types" }, ...data];

    this.setState({ generations });
    this.setState({ filters: generations });
    this.setState({ types });
  }

  handleCategorySelect = (category: any) => {
    this.setState({ selectedCategory: category });
    switch (category.name) {
      case "generation":
        this.setState({ filters: this.state.generations });
        break;
      case "type":
        this.setState({ filters: this.state.types });
        break;
    }
  };

  handleFilterSelect = (filter: string) => {
    this.setState({ selectedFilter: filter, searchQuery: "", currentPage: 1 });
  };

  render() {
    return (
      <div className="row" style={{ margin: 0 }}>
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-2">
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
