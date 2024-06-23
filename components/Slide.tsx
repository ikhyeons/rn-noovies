import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Poster from "./Poster";
import Votes from "./Votes";
import { useNavigation } from "@react-navigation/native";

const View = styled.View`
  flex: 1;
`;

const BgImge = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text`
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.6);
`;

const VoteText = styled(Overview)`
  font-size: 12px;
  margin-left: 5px;
`;

const Slide: React.FC<{
  movieData: IMovie;
}> = (props) => {
  const movie = props.movieData;

  const navigation = useNavigation();
  function goToDetail(movie: IMovie) {
    navigation.navigate("Stacks", {
      screen: "Detail",
      params: {
        data: movie,
      },
    });
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        goToDetail(movie);
      }}
    >
      <View>
        <BgImge
          blurRadius={5}
          source={{ uri: makeImgPath(movie.backdrop_path || "") }}
        />
        <Wrapper>
          <Poster path={movie.poster_path || ""} />
          <Column>
            <Title>{movie.original_title}</Title>
            <Votes movieData={movie} />
            <Overview>{movie.overview.slice(0, 100)}...</Overview>
          </Column>
        </Wrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
