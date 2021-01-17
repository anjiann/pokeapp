import React, { useEffect, useState } from "react";
import PokemonsGrid from "./pokemonsGrid";
import SideBar from "./sideBar";
import ListGroup from "./common/listGroup";

import { getPokemons } from "../services/pokeServices/pokemonService";
import { getGenerations } from "../services/pokeServices/generationService";
import { getTypes } from "../services/pokeServices/typeService";
import { Pokemon, PokemonType } from "../models/Pokemon";
import SearchBox from "./common/searchBox";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import Pagination from "./common/pagination";

interface IPokedex {
  pokemons: Pokemon[];
}
const Pokedex: React.FunctionComponent<IPokedex> = ({ pokemons }) => {
  const [categories, setCategories] = useState<any[]>([
    { name: "generation" },
    { name: "type" },
  ]);
  const [filters, setFilters] = useState<any[]>([]);
  const [generations, setGenerations] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState<any>({
    name: "type",
  });
  const [selectedFilter, setSelectedFilter] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>(null);

  useEffect(() => {
    const initializeData = async () => {
      let data = await getGenerations();
      const generations = [{ _id: "", name: "All Generations" }, ...data];

      data = await getTypes();
      const types = [{ _id: "", name: "All Types" }, ...data];

      setGenerations(generations);
      setTypes(types);

      setFilters(types);
    };
    initializeData();
  }, []);

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    switch (category.name) {
      case "generation":
        setFilters(generations);
        break;
      case "type":
        setFilters(types);
        break;
    }
  };

  const handleFilterSelect = (filter: any) => {
    setSelectedFilter(filter);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedFilter(null);
    setCurrentPage(1);
  };

  const getPageData = (): any => {
    let filtered = pokemons;
    if (searchQuery) {
      filtered = pokemons.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedCategory && selectedFilter && selectedFilter._id) {
      switch (selectedCategory.name) {
        case "generation":
          break;
        case "type":
          filtered = pokemons.filter(
            (p) =>
              p.type[0] == selectedFilter.name ||
              p.type[1] == selectedFilter.name
          );
          break;
      }
    }

    const currPagePokemons = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, currPagePokemons };
  };
  const { totalCount, currPagePokemons } = getPageData();

  return (
    <div className="row" style={{ margin: 0 }}>
      <div className="col-2">
        <SideBar />
      </div>
      <div className="col-2" style={{marginTop:"2vw", marginLeft:"-3vw"}}>
        {/* <ListGroup
          items={categories}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
          textProperty="name"
          valueProperty="name"
          isHorizontal={true}
        /> */}
        <ListGroup
          items={filters}
          selectedItem={selectedFilter}
          onItemSelect={handleFilterSelect}
        />
      </div>
      <div className="col-8" style={{marginTop:"1vw"}}>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <PokemonsGrid pokemons={currPagePokemons} />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Pokedex;
