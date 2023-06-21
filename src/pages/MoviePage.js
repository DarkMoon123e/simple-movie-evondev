import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(
    "https://api.themoviedb.org/3/movie/popular?api_key=2a660acf57ccf68e13434b6e40b0adc0",
    fetcher
  );
  useEffect(() => {
    if (data && data?.results) setMovies(data?.results);
    console.log(data?.results);
  }, [data]);
  return (
    <>
      <div className="py-10 page-container">
        <div className="w-[500px] mx-auto mb-8 flex justify-between">
          <input
            type="text"
            placeholder="Find your movie ..."
            className="p-3 outline-none bg-slate-800 flex-1 text-white"
          />

          <button className="bg-primary p-4 text-white">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {movies &&
            movies.length > 0 &&
            movies.map((movie) => (
              <MovieCard
                vote={movie.vote_average}
                title={movie.title}
                date={movie.release_date}
                poster={movie.poster_path}
              ></MovieCard>
            ))}
        </div>
      </div>
    </>
  );
};

export default MoviePage;
