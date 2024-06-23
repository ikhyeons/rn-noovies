import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  Dimensions,
  Linking,
  StyleSheet,
  TouchableOpacity,
  Share,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { useIsMutating, useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Column = styled.View`
  flex-direction: row;
`;
const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  width: 80%;
  margin-left: 15px;
  font-weight: 500;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 30px;
  padding: 20px 00px;
`;

const Data = styled.View`
  padding: 0px 20px;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 5px;
  line-height: 24px;
  margin-left: 10px;
`;

const Background = styled.Image``;
type RootStackParamList = {
  Detail: { data: IMovie };
};

type detailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<detailScreenProps> = ({
  navigation: { setOptions },
  route: {
    params: { data },
  },
}) => {
  const isMovie = "original_title" in data;

  const shareMedia = async () => {
    await Share.share({
      url: isMovie
        ? `https://www.imdb.com/title/${data.imdb_id}`
        : data.homepage,
      message: data.overview,
      title: data.original_title ? data.original_title : data.original_name,
    });
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color={"white"} size={24}></Ionicons>
    </TouchableOpacity>
  );

  const { isLoading, data: fullData } = useQuery(
    [isMovie ? "movies" : "tv", data.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  const openYTLink = async (videoID: string) => {
    //const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    const baseUrl = `https://blog.ikhyeons.net`;
    await Linking.openURL(baseUrl);
  };

  useEffect(() => {
    setOptions({
      title: `${isMovie ? "Movie" : "Tv Show"}`,
      headerRight: () => <ShareButton />,
    });
  }, []);

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(data.backdrop_path || "") }}
        />

        <Column>
          <Poster path={data.poster_path || ""} />
          <Title>
            {data.original_title ? data.original_title : data.original_name}
          </Title>
        </Column>
      </Header>

      <Data>
        <Overview>{data.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {fullData?.videos?.results?.map((data: any, i: number) => (
          <VideoBtn key={data.id} onPress={() => openYTLink(data.key)}>
            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{data.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
