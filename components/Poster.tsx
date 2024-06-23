import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const Poster: React.FC<{ path: string }> = ({ path }) => {
  return (
    <Image source={{ uri: makeImgPath(path) }} style={{ borderRadius: 10 }} />
  );
};

export default Poster;
