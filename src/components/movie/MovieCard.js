const MovieCard = (props) => {
  const { vote, title, date, poster } = props;

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
      <button className="py-3 px-6 rounded-lg capitalize bg-primary w-full">
        Watch now
      </button>
    </div>
  );
};

export default MovieCard;
