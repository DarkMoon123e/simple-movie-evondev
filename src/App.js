import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";

import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <Banner></Banner>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route
            path="/movies"
            element={
              <>
                <MoviePage></MoviePage>
              </>
            }
          ></Route>
          <Route
            path="/movie/:movieId"
            element={
              <>
                <MovieDetailPage></MovieDetailPage>
              </>
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
