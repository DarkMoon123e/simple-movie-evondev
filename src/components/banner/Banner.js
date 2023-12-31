import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import Button from "src/components/button/Button";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
  useEffect(() => {
    if (data && data.results) setMovies(data?.results);
  }, [data]);

  return (
    <>
      <section className="banner h-[600px] page-container mb-20">
        <Swiper
          grabCursor={"true"}
          spaceBetween={40}
          slidesPerView={"auto"}
          className="swiper"
        >
          {movies &&
            movies.length > 0 &&
            movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <BannerItem movie={movie}></BannerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </>
  );
};

const BannerItem = (props) => {
  const { poster_path, title, id } = props.movie;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        className="w-full h-full object-cover rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt=""
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Action
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
        </div>
        {/* <button
          className="py-3 px-6 rounded-lg bg-primary text-white font-medium"
          onClick={() => navigate(`/movie/${id}`)}
        >
          Watch now
        </button> */}
        <Button onClick={() => navigate(`/movie/${id}`)} className={`w-auto`}>
          Xem ngay
        </Button>
      </div>
    </div>
  );
};

export default Banner;
