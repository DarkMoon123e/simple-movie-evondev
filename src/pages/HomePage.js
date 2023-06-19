import MovieList from "../components/movie/MovieList";
const movieApiList = {
  nowPlaying:
    "https://api.themoviedb.org/3/movie/now_playing?api_key=2a660acf57ccf68e13434b6e40b0adc0",
  topRated:
    "https://api.themoviedb.org/3/movie/top_rated?api_key=2a660acf57ccf68e13434b6e40b0adc0",
  trending:
    "https://api.themoviedb.org/3/movie/popular?api_key=2a660acf57ccf68e13434b6e40b0adc0",
};
const HomePage = () => {
  return (
    <>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Now playing
        </h2>
        <MovieList api={movieApiList.nowPlaying}></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top rated
        </h2>
        <MovieList api={movieApiList.topRated}></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Trending
        </h2>
        <MovieList api={movieApiList.trending}></MovieList>
      </section>
    </>
  );
};

export default HomePage;
