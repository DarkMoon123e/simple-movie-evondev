import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(1);

  const pageTotal = 5;
  const [pageListCurrent, setPageListCurrent] = useState([1, 2, 3, 4, 5]);

  const handleFilterChange = (e) => {
    setUrl(e.target.value);
  };
  const { data, error } = useSWR(
    url
      ? `https://api.themoviedb.org/3/search/movie?api_key=2a660acf57ccf68e13434b6e40b0adc0&query=${url}&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=2a660acf57ccf68e13434b6e40b0adc0&page=${page}`,
    fetcher
  );
  const isLoading = !data;
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (data && data?.results) setMovies(data?.results);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [data]);

  const handleNextPage = (index) => {
    setPage(index);
    setPageListCurrent(
      pageListCurrent.map((item, index) => (item = page + index))
    );
  };
  const handlePrevPage = (index) => {
    page <= 1 || setPage(index);
    setPageListCurrent(
      pageListCurrent.map((item, index) => (item = page + index))
    );
  };

  return (
    <>
      <div className="py-10 page-container">
        <div className="w-[500px] mx-auto mb-8 flex justify-between">
          <input
            type="text"
            placeholder="Find your movie ..."
            className="p-3 outline-none bg-slate-800 flex-1 text-white"
            onChange={(e) => handleFilterChange(e)}
          />

          <button className="bg-primary p-4 text-white">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              ariaHidden="true"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </button>
        </div>
        {isLoading && (
          <div className="h-5 w-5 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
        )}
        {!isLoading && (
          <>
            <div className="grid grid-cols-4 gap-10">
              {movies &&
                movies.length > 0 &&
                movies.map((movie) => (
                  <MovieCard
                    vote={movie.vote_average}
                    title={movie.title}
                    date={movie.release_date}
                    poster={movie.poster_path}
                    id={movie.id}
                  ></MovieCard>
                ))}
            </div>
            <div className="flex items-center justify-center mt-10 mb-10 gap-4">
              <span
                className="cursor-pointer h-full w-[30px]"
                onClick={() => handlePrevPage(page - 1)}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
              </span>
              {pageListCurrent.map((item, index) => (
                <span
                  className={`cursor-pointer inline-block py-2 px-4 rounded leading-none text-slate-900 ${
                    item === page ? "bg-primary" : "bg-white"
                  }`}
                  onClick={() => handleNextPage(item)}
                >
                  {item}
                </span>
              ))}
              <span
                className="cursor-pointer h-full w-[30px]"
                onClick={() => handleNextPage(page + 1)}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MoviePage;
