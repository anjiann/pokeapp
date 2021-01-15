import React, { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import PokemonsGrid from "./pokemonsGrid";
import SideBar from "./sideBar";
import ListGroup from "./common/listGroup";

import { getPokemons } from "../services/pokeServices/pokemonService";
import { getGenerations } from "../services/pokeServices/generationService";
import { getTypes } from "../services/pokeServices/typeService";
import { Pokemon } from "../models/Pokemon";

const Pokedex: React.FunctionComponent<any> = () => {
  const [categories, setCategories] = useState<any[]>([
    { name: "generation" },
    { name: "type" },
  ]);
  const [filters, setFilters] = useState<any[]>([]);
  const [generations, setGenerations] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState<any>(null);

  useEffect(() => {
    const initializeData = async () => {
      let data = await getGenerations();
      const generations = [{ _id: "", name: "All Generations" }, ...data];

      data = await getTypes();
      const types = [{ _id: "", name: "All Types" }, ...data];

      let pokemons = await getPokemons();
      pokemons = pokemons.slice(0, 9); //temp test
      setGenerations(generations);
      setTypes(types);

      setFilters(generations);
      setPokemons(pokemons);
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

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="row" style={{ margin: 0 }}>
      <div className="col-2">
        <SideBar />
      </div>
      <div className="col-2">
        <ListGroup
          items={categories}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
          textProperty="name"
          valueProperty="name"
          isHorizontal={true}
        />
        <ListGroup
          items={filters}
          selectedItem={selectedFilter}
          onItemSelect={handleFilterSelect}
        />
      </div>
      <div className="col">
        <SearchBar />
        <PokemonsGrid pokemons={pokemons} />
      </div>
    </div>
  );
};

export default Pokedex;
