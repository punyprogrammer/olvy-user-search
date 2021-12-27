import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./search.css";
import Loader from "react-loader-spinner";

import Single from "../../components/Single/Single";
const Search = () => {
  const [loading, isLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const searchRef = useRef();
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchQuery(searchRef.current.value);
  };
  const fetchUsers = async () => {
    try {
      setFetching(true);

      const response = await axios.get(
        `https://olvyusers.herokuapp.com/api/search?searchQuery=${searchQuery}&limit=${30}&page=${page}`
      );
      if (users) {
        setUsers((prev) => {
          return [...prev, ...response.data];
        });
      } else {
        setUsers(response.data);
      }
      setFetching(false);
      console.log(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [page]);
  //useEffect to reset the page to one
  useEffect(() => {
    setUsers([]);
    setPage(1);
    fetchUsers();
  }, [searchQuery]);

  //useEffect for fetching users
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!fetching && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 10
      ) {
        setPage((curr) => {
          return curr + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <div className="search">
      <div className="search__heading">
        Search For Thousands of Users Online
      </div>
      <div className="search__bar">
        <input
          placeholder=" Search For Users by Id,Name"
          type="text"
          className="search__bar__input"
          ref={searchRef}
        />
        <button className="search__input__button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="search__results__wrapper">
        <div className="search__results__header">
          <span className="search__results__counter">
            SEARCH RESULTS...{searchQuery && `For Your Query ${searchQuery}`}
          </span>
        </div>
          <hr className="search__results__hr" />
        <div className="search__results__container">
          {users.map((item, index) => {
            return <Single user={item} key={item.restaurantId} index={index} />;
          })}
        </div>
        {fetching && (
          <div className="loader__container">
            <div className="fetching__users">Fetching Users</div>
            <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
