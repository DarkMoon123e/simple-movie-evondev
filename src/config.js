export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "2a660acf57ccf68e13434b6e40b0adc0";
const tmdbEndPoint = "https://api.themoviedb.org/3/movie";
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEndPoint}/${type}?api_key=${apiKey}`,
};
