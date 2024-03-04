import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {Button} from "react-bootstrap"

export const MovieView = ({user, setUser, token}) => {
    const { movieId } = useParams();
    const movies = useSelector((state) => state.movies.list);
    const movie = movies.find((b) => b.id === movieId);
    const favorite = user.FavoriteMovies.includes(movieId)



    const toFavorite = () => {
        fetch(`https://moviedbapi-2a92d1561762.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {

            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          })
            .then((response) => response.json())
            .then ((data) => setUser(data))
      }

      const toUnFavorite = () => {
        fetch(`https://moviedbapi-2a92d1561762.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {

            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          })
            .then((response) => response.json())
            .then ((data) => setUser(data))
      }
      let text;
      if (favorite === true) {
        text = "Unfavorite"
    } else {
        text = "Favorite"}

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
            <Button variant="primary" onClick={() => {
            if (favorite === true) {
                toUnFavorite()
            } else {
                toFavorite()}}}>
             {text}
            </Button>
        </div>
    );
};

