import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { tvApi } from "../api";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import styled from "styled-components/native";

const View = styled.ScrollView`
  margin-top: 10px;
`;
const Tv: React.FC<BottomTabScreenProps<any>> = () => {
  const queryClient = useQueryClient();
  const { isLoading: topLoading, data: topData } = useQuery(
    ["tv", "top"],
    tvApi.topRated
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvApi.trending
  );
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ["tv", "today"],
    tvApi.airingToday
  );

  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };

  const loading = todayLoading || trendingLoading || topLoading;
  const refreshing = false;
  return loading ? (
    <Loader />
  ) : (
    <View
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <VMedia title="인기 TV" type="t" data={trendingData.results} />
      <VMedia title="오늘 TV" type="t" data={todayData.results} />
      <VMedia title="평점순" type="t" data={topData.results} />
    </View>
  );
};

export default Tv;
