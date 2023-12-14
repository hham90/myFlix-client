import {useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { useState, useEffect } from "react";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch ("https://moviedbapi-2a92d1561762.herokuapp.com/")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.docs.map((doc) => {
                return {
                    id: doc.key,
                    title: doc.title,
                    director: doc.director
                };
            });
            setMovies(moviesFromApi)
        })
    })

    const [selectedMovie, setSelectedMovie] = useState(null);
    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        )
    }

    if (movies.length === 0) {
        return <div>The List is empty!</div>;
    }

    return (
        <div>
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