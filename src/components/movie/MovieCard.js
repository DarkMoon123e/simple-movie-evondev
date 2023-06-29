import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const MovieCard = (props) => {
  const { vote, title, date, poster, id } = props;
  const navigate = useNavigate();

  return (
    <div className="movie-card rounded-lg p-3 bg-slate-800 text-white h-full flex flex-col">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{date}</span>
          <span>{vote}</span>
        </div>
      </div>
      <Button onClick={() => navigate(`/movie/${id}`)}>xem ngay</Button>
    </div>
  );
};

export default MovieCard;
