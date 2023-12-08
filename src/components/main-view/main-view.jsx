import {useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id:1,
            title: "The Departed",
            director: "Martin Scorsce",
            genre: "Thriller"
        },
        {
            id:2,
            title: "Grand Budapest Hotel",
            director: "Wes Anderson",
            genre: "Comedy"
        },
        {
            id:3,
            title: "GoodFellas",
            director: "Martin Scorsce",
            genre: "Drama"
        },
    ]);

    const [selectedBook, setSelectedBook] = useState(null);
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
                  book={book}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
            />
            ))}
        </div>
    );
};