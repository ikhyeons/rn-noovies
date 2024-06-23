interface ISlideData {
  id: string;
  backdrop_path: string;
  original_title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  original_name: string;
  imdb_id: string;
  homepage: string;
}
interface BaseResponse {
  page: number;
  total_result: number;
  total_pages: number;
}

interface MovieResponse extends BaseResponse {
  results: IMovie[];
}
