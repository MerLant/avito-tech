import { useUnit } from "effector-react";
import { $moviesStore } from "src/widgets/store/movie";
import { MovieList } from "src/features/ui";
import { useEffect } from "react";
import { getMoviesFx } from "src/widgets/api/movie";

const MovieBlock = () => {
  const movies = useUnit($moviesStore);

  useEffect(() => {
    getMoviesFx({
      page: 1,
      limit: 10,
    });
  }, []);

  return (
    <div>
      <h1>MovieBlock</h1>
      <MovieList movieList={movies.docs} />
    </div>
  );
};

export default MovieBlock;
