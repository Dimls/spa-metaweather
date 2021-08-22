import React, { useState } from "react";
import { Search } from "semantic-ui-react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";

const initialState = { isLoading: false };

const SearchBar = (props) => {
  const [state, setState] = useState(initialState);
  const { isLoading } = state;

  const handleSearchChange = (e, { value }) => {
    let url = `${process.env.REACT_APP_PROXY_HOST}${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_LOCATION_DATA_PATH}`;

    if (value !== "") {
      setState({ isLoading: true });
      axios.get(`${url}search/?query=${value}`).then((res) => {
        props.results(res.data);
        setState({ isLoading: false });
      });
    }
    else{
      props.results([])
    }
  };

  return (
    <Search
      open={false}
      loading={isLoading}
      onSearchChange={handleSearchChange}
    />
  );
};

export default SearchBar;
