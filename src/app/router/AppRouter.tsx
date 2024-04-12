import { FilmPage, LandingPage, NotFoundPage } from "src/pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PATHS } from "./paths";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<LandingPage />} />
        <Route path={PATHS.FILM + "/:filmId"} element={<FilmPage />} />

        <Route path={PATHS.NOTFOUND} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={PATHS.NOTFOUND} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
