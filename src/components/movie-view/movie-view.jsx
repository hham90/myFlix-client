import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const book = books.find((b) = b.id === bookId);
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
            <span>Description:</span>
            <span>{movie.description}</span>
            </div>
            <div>
            <span>Director:</span>
            <span>{movie.director}</span>
            <div>
            <span>Genre:</span>
            <span>{movie.genre}</span>
            </div>
            </div>
            <Link to={`/`}>
            <button className="back-button">Back</button>
            </Link>
        </div>
    );
};