import { MoviePage, LandingPage, NotFoundPage } from "src/pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PATHS } from "./paths";
import { Header } from "src/widgets/ui";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={PATHS.HOME} element={<LandingPage />} />
        <Route path={PATHS.FILM + "/:movieId"} element={<MoviePage />} />

        <Route path={PATHS.NOTFOUND} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={PATHS.NOTFOUND} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
