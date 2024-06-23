import React, { useEffect, useState } from "react";

import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const onChangeText = (text: string) => setQuery(text);
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, { enabled: false });

  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, { enabled: false });

  const onSubmit = () => {
    if (query == "") {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor={"grey"}
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <VMedia title="Movie Results" type="m" data={moviesData.results} />
      ) : null}
      {tvData ? (
        <VMedia title="TV Results" type="t" data={tvData.results} />
      ) : null}
    </Container>
  );
};

export default Search;
