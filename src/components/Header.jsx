import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import search from "../assets/search.svg";
import Select from "./Select";
import { OPTIONS_DATE_ORDER, OPTIONS_CATEGORY } from "../components/data";

// import {
//   selectSearchResults,
//   selectInputValue,
//   selectFilterIsFetching,
// } from "../redux/filters/filterSelectors";
import {
  // changeFilterInputValue,
  // clearFilterInputValue,
  fetchFilterResultsAsync,
  fetchFilterResultsAsync2,
} from "../redux/filters/filterActions";

import { debounce } from "../utils";

const Header = () => {
  const dispatch = useDispatch();
  const [searchInputValue, setSearchInputValue] = useState("");

  const [filterValue, setFilterValue] = useState({
    category: "",
    order: "",
    date: "",
  });

  const handleSearch = () => {
    if (searchInputValue.trim().length <= 0) return;
    const getSearch = fetchFilterResultsAsync(searchInputValue.trim());
    dispatch(debounce(getSearch, 3000));
  };

  const handleFilter = (value) => {
    setFilterValue(value);
    dispatch(fetchFilterResultsAsync2(value));
  };

  return (
    <HeaderWrapper className="py-8 px-12">
      <div>
        <div className="all-box flex flex-row justify-between">
          <div className="search-box">
            <input
              type="search"
              onKeyUp={() => handleSearch()}
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder="Search Templates"
            />
            <img src={search} alt="search" className="search-img" />
          </div>

          <div className="select-box flex-row flex gap-x-4">
            <Select
              options={OPTIONS_CATEGORY}
              title={"Category"}
              onChange={handleSearch}
              single={filterValue.category}
              placeholder={"Select Category"}
              onChangeCustom={handleFilter}
            />
            <Select
              options={OPTIONS_DATE_ORDER}
              title={"Order"}
              onChange={handleSearch}
              single={filterValue.order}
              placeholder={"Select Order"}
              onChangeCustom={handleFilter}
            />
            <Select
              options={OPTIONS_DATE_ORDER}
              title={"Date"}
              onChangeCustom={handleFilter}
              single={filterValue.date}
              placeholder={"Select Date"}
            />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  .allbox {
    position: relative;
  }
  .search-box {
    background: #fff;
    height: 100%;
    width: 300px;
    position: relative;
  }
  .search-img {
    top: 0.7rem;
    right: 0.6rem;
    position: absolute;
  }

  input[type="search"] {
    padding: 0.5rem 1rem;
    background: #fff;
    border: 0.5px solid #bdbdbd;
    outline: none;
    width: 100%;
    ::placeholder {
      padding-left: 0.5rem;
      font-weight: 400;
      color: #8f8b8b;
    }
  }

  @media screen and (max-width: 999px) {
    padding-bottom: 0.5rem;
    .all-box {
      flex-direction: column-reverse;
      align-items: center;
    }

    .search-box {
      margin: 1rem 0;
    }
    .select-box {
      flex-direction: column;
      gap: 1rem;
    }
  }
`;
