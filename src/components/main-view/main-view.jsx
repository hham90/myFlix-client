import { useState, useEffect } from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import {SignupView} from "../signup-view/signup-view";
import {LoginView} from "../login-view/login-view";
import {NavigationBar} from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {ProfileView} from "../profile-view/profile-view";
import { setMovies }from "../../redux/reducers/movies";
import {MoviesList} from "../movies-list/movies-list"
import {store} from "../../redux/store";
import { useSelector} from "react-redux";

export const MainView = () =>
{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken? storedToken : null);
    const movies = useSelector((state) => state.movies.list);
    const [user, setUser] = useState(storedUser? storedUser : null);

    useEffect(() => {
        if (!token) return;

        fetch("https://moviedbapi-2a92d1561762.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => {
            const moviesFromApi = data.map((doc) => {
              return {
                id: doc._id,
                title: doc.Title,
                author: doc.Director.Name
              };
            });
            store.dispatch(setMovies(moviesFromApi))
          }).catch((error) => {
            console.log({error})
          })
          // .then((movies) => {
          //   setMovies(movies);

          // });
      }, [token]);

    return (
      <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }}
          />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
                </>
              }
              />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  )}
                    </>
              }
              />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView /* movies={movies} */ />
                    </Col>
                  )}
                </>
              }
              />

              <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <ProfileView user={user} token={token} setUser={setUser} movies={movies} />
                    </Col>
                  )}
                </>
              }
              />

            <Route
            path="/"
            element={
              <>
                {!user || !token ?
                  <Navigate to="/login" replace /> : <MoviesList />
                }
              </>
            }
            />
           </Routes>
        </Row>
      </BrowserRouter>
      );
};

// {/* <Row className="justify-content-md-center">
// {!user ? (
//   <Col md={5}>
//     <LoginView onLoggedIn={(user, token) => {
//       setUser(user);
//       setToken(token);
//       }} />
//       or
//       <SignupView />
//   </Col>
// ) : selectedMovie ? (
//   <Col md={8} style={{ border: "1px solid black" }}>
//     <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//     <MovieView
//       movie={selectedMovie}
//       onBackClick={() => setSelectedMovie(null)}
//     />
//   </Col>
// ) : movies.length === 0 ? (
//   <div>
//       <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//       <div>The List is empty!</div>
//   </div>
// ) : (
//   <>
//     <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//       {movies.map((movie) => (
//         <Col className="mb-5" key={movie.id} md={3}>
//         <MovieCard
//           movie={movie}
//           onMovieClick={(newSelectedMovie) => {
//               setSelectedMovie(newSelectedMovie);
//           }}
//         />
//       </Col>
//     ))}
//   </>
// )}
// </Row> */}