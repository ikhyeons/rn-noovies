import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
import Loader from "../components/Loader";
import Swipers from "../components/Swipers";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

const Movies: React.FC<BottomTabScreenProps<any, "Movie">> = ({
  navigation: { navigate },
}) => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<MovieResponse, unknown, { results: IMovie }>(
    ["movies", "upcoming"],
    ({ pageParam = 1 }) => {
      return moviesApi.upcoming(pageParam);
    },
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  async function onRefresh() {
    queryClient.refetchQueries(["movies"]);
  }
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingUpcoming || isRefetchingTrending || isRefetchingNowPlaying;

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  console.log(upcomingData);
  return loading ? (
    <Loader />
  ) : (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={[]}
      renderItem={() => <></>}
      ListHeaderComponent={
        <>
          <Swipers data={nowPlayingData?.results} />
          <VMedia title="Trending" type={"m"} data={trendingData?.results} />
          <HMedia
            data={upcomingData?.pages.map((page) => page.results).flat()}
            tov={"t"}
          />
        </>
      }
    />
  );
};

export default Movies;
