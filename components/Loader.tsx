import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = () => {
  return (
    <Wrapper>
      <ActivityIndicator />
    </Wrapper>
  );
};

export default Loader;
