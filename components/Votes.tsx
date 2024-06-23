import React from "react";
import styled from "styled-components/native";

const Vote = styled.Text`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  font-size: 10px;
  margin-top: 2px;
  margin-bottom: 5px;
`;
const Votes = (props: { movieData: Movie }) => {
  const movie = props.movieData;
  return (
    <Vote>
      {movie.vote_average > 0
        ? `⭐ ${movie.vote_average.toFixed(1)}`
        : `comming soon`}
    </Vote>
  );
};

export default Votes;
