import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import Poster from "./Poster";
import Votes from "./Votes";
import { FlatList } from "react-native/Libraries/Lists/FlatList";
import { useNavigation } from "@react-navigation/native";
const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
` as unknown as typeof FlatList;

const Movie = styled.View`
  margin-right: 10px;
`;

const ListContainer = styled.View``;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
`;

const VSeperator = styled.View`
  width: 10px;
`;
const VMedia = (props: {
  title: string;
  data: IMovie[] | undefined;
  type: "t" | "m";
}) => {
  const { title, data, type } = props;
  const navigation = useNavigation();
  function goToDetail(data: IMovie) {
    navigation.navigate("Stacks", {
      screen: "Detail",
      params: {
        data: data,
      },
    });
  }
  return (
    <>
      <ListTitle>{title}</ListTitle>
      <ListContainer>
        <TrendingScroll
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          data={data}
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={VSeperator}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                type == "t" ? goToDetail(item) : goToDetail(item);
              }}
            >
              <Movie>
                <Poster path={item.poster_path || ""} />
                <Title>
                  {type == "t"
                    ? `${
                        item.original_name.slice(0, 12) +
                        (item.original_name.length > 12 ? "..." : "")
                      }`
                    : `${
                        item.original_title.slice(0, 12) +
                        (item.original_title.length > 12 ? "..." : "")
                      }`}
                </Title>
                <Votes movieData={item} />
              </Movie>
            </TouchableOpacity>
          )}
        />
      </ListContainer>
    </>
  );
};

export default VMedia;
