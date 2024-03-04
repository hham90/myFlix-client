import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MovieView = () => {
    const { movieId } = useParams();
    const movies = useSelector((state) => state.movies.list);
    const movie = movies.find((b) => b.id === movieId);
    console.log(movie)

    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
            <span>Title: </span>
            <span>{movie.title}</span>
            </div>
            <div>
            <span>Description: </span>
            <span>{movie.description}</span>
            </div>
            <div>
            <span>Director: </span>
            <span>{movie.director}</span>
            <div>
            <span>Genre: </span>
            <span>{movie.genre.Name}</span>
            </div>
            </div>
            <Link to={`/`}>
            <button className="back-button">Back</button>
            </Link>
        </div>
    );
};