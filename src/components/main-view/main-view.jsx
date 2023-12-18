import {useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { useState, useEffect } from "react";
import {SignupView} from "../signup-view/signup-view";
import {LoginView} from "../login-view/login-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = userState(storedToken? storedToken : null)
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser : null);

    useEffect(() => {
        if (!token) return;

        fetch("https://moviedbapi-2a92d1561762.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((movies) => {
            setMovies(movies);

          });
      }, [token]);

    if (!user) {
        return (
        <div>
            <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
                }} />
                or
                <SignupView />
        </div>
        );
    }

    if (selectedMovie) {
        return (
            <div>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>

            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            </div>
        )
    }

    if (movies.length === 0) {
        return <div>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>

            <div>The List is empty!</div>;
               </div>
    }

    return (
        <div>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>

            {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
            />
            ))}
        </div>
    );
};