import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMediaData = async () => {
  const latestResponse = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: { api_key: API_KEY }
  });

  const recommendedResponse = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY }
  });

  const tvProgramsResponse = await axios.get(`${BASE_URL}/tv/popular`, {
    params: { api_key: API_KEY }
  });

  const moviesResponse = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: { api_key: API_KEY }
  });

  return {
    latest: latestResponse.data.results,
    recommended: recommendedResponse.data.results,
    tvPrograms: tvProgramsResponse.data.results,
    movies: moviesResponse.data.results
  };
};