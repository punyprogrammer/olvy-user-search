import React from "react";
import Topbar from "./components/Topbar/Topbar";
import Search from "./components/SearchForm/Search";
import "./app.css";

const App = () => {
  return (
    <div className="app__container">
      <Topbar />
      <Search />
    </div>
  );
};

export default App;
