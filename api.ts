import { QueryFunctionContext } from "react-query";

const BASE_URL = "https://api.themoviedb.org/3";
const OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGM5MmUxMjJjODUyYWM1YzE0OWExYmMzMzIxYjg4ZiIsInN1YiI6IjY0NGY3ZTRlYzBhMzA4MDJmMzcwNGU2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Imoh-IwEu85mKh286U69U35m9cmuUPhnwcqsVUr3Ph0",
  },
};

export const moviesApi = {
  trending: () =>
    fetch(
      `${BASE_URL}/trending/movie/week?language=en-US&page=1&region=KR`,
      OPTION
    ).then((res) => res.json()),
  upcoming: (param: QueryFunctionContext) => {
    return fetch(
      `${BASE_URL}/movie/upcoming?language=en-US&page=${param.pageParam}&region=KR`,
      OPTION
    ).then((res) => res.json());
  },
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?language=en-US&page=1&region=KR`,
      OPTION
    ).then((res) => res.json()),
  search: ({ queryKey }: { queryKey: any[] }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?language=en-US&page=1&region=KR&query=${query}`,
      OPTION
    ).then((res) => res.json());
  },
  detail: ({ queryKey }: { queryKey: any[] }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=28c92e122c852ac5c149a1bc3321b88f&append_to_response=videos,images`,
      OPTION
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(
      `${BASE_URL}/trending/tv/week?language=en-US&page=1&region=KR`,
      OPTION
    ).then((res) => res.json()),
  airingToday: () =>
    fetch(
      `${BASE_URL}/tv/airing_today?language=en-US&page=1&region=KR`,
      OPTION
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?language=en-US&page=1&region=KR`,
      OPTION
    ).then((res) => res.json()),
  search: ({ queryKey }: { queryKey: any[] }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?language=en-US&page=1&region=KR&query=${query}`,
      OPTION
    ).then((res) => res.json());
  },
  detail: ({ queryKey }: { queryKey: any[] }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=28c92e122c852ac5c149a1bc3321b88f&append_to_response=videos,images`,
      OPTION
    ).then((res) => res.json());
  },
};
