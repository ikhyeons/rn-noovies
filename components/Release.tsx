import React from "react";
import styled from "styled-components/native";

const Releases = styled.Text`
  color: white;
  font-size: 12px;
  margin: 10px 0;
`;

const Release = (props: { movie: Movie }) => {
  const movie = props.movie;

  return (
    <Releases>
      {new Date(movie.release_date).toLocaleDateString("ko", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </Releases>
  );
};

export default Release;
