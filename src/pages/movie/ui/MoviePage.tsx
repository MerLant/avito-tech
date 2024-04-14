import { Box } from "@chakra-ui/react";
import { BackButton } from "src/shared/ui";
import { MovieInfo } from "src/widgets/ui";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "src/app/router/paths";
import { useEffect } from "react";

const MoviePage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId || isNaN(Number(movieId))) {
      navigate(PATHS.NOTFOUND);
    }
  }, [movieId, navigate]);

  if (!movieId || isNaN(Number(movieId))) {
    return null;
  }

  return (
    <Box marginY="8px" marginX="4%" padding="4px">
      <BackButton />
      <MovieInfo movieId={+movieId} />
    </Box>
  );
};

export default MoviePage;
