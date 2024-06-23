import React from "react";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import Slide from "./Slide";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Swipers = (props: { data: IMovie[] | undefined }) => {
  const nowPlaying = props.data;
  return (
    <Swiper
      loop
      horizontal
      showsButtons={false}
      autoplay
      autoplayTimeout={3.5}
      showsPagination={false}
      containerStyle={{
        width: "100%",
        height: SCREEN_HEIGHT / 4,
        marginBottom: 30,
      }}
    >
      {nowPlaying
        ? nowPlaying.map((movieData: IMovie, i) => (
            <Slide key={i} movieData={movieData} />
          ))
        : null}
    </Swiper>
  );
};

export default Swipers;
