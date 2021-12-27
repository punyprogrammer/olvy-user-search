import React, { useRef } from "react";
import "./results.css";
import Single from "../Single/Single";
import axios from "axios";
import { useState, useEffect } from "react";
import MultipleValueTextInput from "react-multivalue-text-input";
import Loader from "react-loader-spinner";

const Results = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [cuisineFilter, setcuisineFilter] = useState("");
  const [sortedFilter, setSortedFilter] = useState("");
  const [sortedQuery, setSortedQuery] = useState("");
  const searchInput = useRef();
  //options for dropdown
  const options = [
    {
      label: "None",
      value: "",
    },
    {
      label: "Price For Two(Low to High)",
      value: "averageCostTwo",
    },
    {
      label: "Price For Two(High to Two)",
      value: "-averageCostTwo",
    },
    {
      label: "Rating(Low to High)",
      value: "aggregateRating",
    },
    {
      label: "Rating(High to Low)",
      value: "aggregateRating",
    },
    {
      label: "Votes(Low to High)",
      value: "votes",
    },
    {
      label: "Votes(High to Low)",
      value: "-votes",
    },
  ];
  //handlerfunction to additems to category filter
  const addCategory = (item) => {
    setCategoryFilter([...categoryFilter, item]);
    console.log(categoryFilter);
  };
  const removeCategory = (item) => {
    const newList = categoryFilter.filter((t) => t !== item);
    setCategoryFilter(newList);
    console.log(categoryFilter);
  };
  //handler function to search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.current.value);
  };
  //handle function to filter
  const handleFilter = (e) => {
    e.preventDefault();
    setcuisineFilter(categoryFilter.toString());
  };
  //handle function to sort
  const handleSort = (e) => {
    setSortedQuery(sortedFilter);
  };
  //function to
  //function to fetch all restaurantts
  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `https://findmydinnerapi.herokuapp.com/api/restaurants?nameQuery=${searchQuery}&cuisines=${cuisineFilter}&sortedBy=${sortedQuery}`
      );

      setRestaurants(response.data);
      setIsLoading(false);
      console.log(response);
    };
    fetchRestaurants();
  }, [searchQuery, cuisineFilter, sortedQuery]);
  return (
    <>
      <div className="results">
        <div className="search__container">
          <div className="search__heading">
            Search For Your Favourite Restaurants Online
          </div>
          <div className="search__bar">
            <input
              placeholder="Enter the name of restaurant"
              type="text"
              ref={searchInput}
              className="search__bar__input"
            />
            <button className="search__input__button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="searchfilters">
            <div className="cuisine__filters__container">
              <MultipleValueTextInput
                style={{ width: "100%" }}
                className="cuisine__input"
                onItemAdded={(item, allItems) => addCategory(item)}
                onItemDeleted={(item, allItems) => removeCategory(item)}
                label=""
                name="item-input"
                placeholder="Enter cuisines with comma seperated values"
              />
              <button className="filter__button" onClick={handleFilter}>
                Filter
              </button>
            </div>
          </div>
          <div className="sort__filter">
            <span className="sort__filter__text">Sort By:</span>
            <select
              className="sort__filter__select"
              onChange={(e) => setSortedFilter(e.target.value)}
            >
              {options.map((option) => (
                <option className="sort__filter__item" value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button className="sort__filter__button" onClick={handleSort}>
              Sort
            </button>
          </div>
        </div>
        <div className="search__results__wrapper">
          <div className="search__results__header">
            <span className="search__results__counter">
              {restaurants.length} Restaurants Found{" "}
              {searchQuery && `For Your Query "${searchQuery}"`}
            </span>
            <hr className="search__results__hr" />
          </div>
          <div className="search__results__container">
            {isLoading ? (
              <div className="loader__container">
                <h3 className="loader__text">Fetching Restaurants</h3>
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  className="loader__spinner"
                />
              </div>
            ) : (
              restaurants.map((item) => {
                return <Single restaurant={item} key={item.restaurantId} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;