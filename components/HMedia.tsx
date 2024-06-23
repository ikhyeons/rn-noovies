import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import Release from "./Release";
import { FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 0;
  margin-left: 0;
`;

const HSeperator = styled.View`
  height: 20px;
`;

const HMedia = (props: { data: IMovie[] | undefined; tov: "t" | "v" }) => {
  const { data, tov } = props;
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
      <ListTitle>Comming soon</ListTitle>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.id}`}
        ItemSeparatorComponent={HSeperator}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              goToDetail(item);
            }}
          >
            <HMovie key={item.id}>
              <Poster path={item.poster_path || ""} />
              <HColumn>
                <ComingSoonTitle>{item.original_title}</ComingSoonTitle>
                {tov == "t" ? (
                  <Release movie={item} />
                ) : (
                  <Votes movieData={item} />
                )}

                <Overview>
                  {item.overview !== "" && item.overview.length > 140
                    ? `${item.overview.slice(0, 140)}...`
                    : item.overview}
                </Overview>
              </HColumn>
            </HMovie>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default HMedia;
