import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
    return (
        <Card className="h-100" onClick={() => onMovieClick(movie)}>
        <Card.Img variant="top" src={movie.img} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director}</Card.Text>
         <Button onClick={() => onMovieClick(movie)} variant="link">
          OPEN
         </Button>
         </Card.Body>
         </Card>
    );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};