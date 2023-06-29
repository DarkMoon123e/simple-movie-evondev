import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../config";
import MovieList from "../components/movie/MovieList";
// https://api.themoviedb.org/3/movie/385687?api_key=2a660acf57ccf68e13434b6e40b0adc0
const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { belongs_to_collection, title, genres, overview } = data;
  return (
    <>
      <div className="w-full h-[600px] relative mb-10">
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${belongs_to_collection.backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 mb-10">
        <img
          src={`https://image.tmdb.org/t/p/original${belongs_to_collection.backdrop_path}`}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        {title}
      </h1>
      {genres && genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              key={item.id}
              className="py-2 px-4 border-primary text-primary border rounded"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[1000px] mx-auto">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </>
  );
};

const MovieCredits = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  return (
    <div className="mb-10">
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item flex flex-col items-center" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const MovieVideo = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  return (
    <div className="w-[1000px] aspect-video mx-auto mb-10">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${results[0].key}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        className="w-full h-full object-fill"
      ></iframe>
    </div>
  );
};

const MovieSimilar = () => {
  const { movieId } = useParams();
  return (
    <div className="mb-10">
      <MovieList
        api={`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`}
      ></MovieList>
    </div>
  );
};

export default MovieDetailPage;
