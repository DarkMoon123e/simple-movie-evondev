import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../config";
import { useEffect, useState } from "react";
//

const MovieList = ({ api }) => {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(api, fetcher);
  useEffect(() => {
    if (data && data.results) setMovies(data?.results);
    console.log(data);
  }, [data]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movies.id}>
              <MovieCard
                vote={movie.vote_average}
                title={movie.title}
                date={movie.release_date}
                poster={movie.poster_path}
              ></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
