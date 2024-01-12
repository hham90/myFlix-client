import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {Card} from "react-bootstrap";
import {Form} from "react-bootstrap";
import { Link } from "react-router-dom";


export const ProfileView = ({ user, token, setUser, movies }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id))

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://moviedbapi-2a92d1561762.herokuapp.com/users/${user.Username}", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then( async(response) => {
            if (response.ok) {
                response.json();
                alert("Updated");
                window.location.reload();
            } else {
                alert("Update Failed");
            }
        });
    }
        const handleDelete = () => {
            fetch("https://moviedbapi-2a92d1561762.herokuapp.com/users/${user.Username}", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
            }
        }).then( async (response) => {
            if (response.ok) {
                setUser(null);
                alert("Your account has been successfully deleted");
            } else {
                alert("Error")
            }
        });
    }

    return (
        <Container>
            <Row>
                <Col md={5}>
                    <Card>
                        <Card.Body>
                            <Card.Title>My Profile</Card.Title>
                            <Card.Img variant="top" src="https://via.placeholder.com/250" />
                            <Card.Text>Username: {user.Username}</Card.Text>
                            <Card.Text>Email: {user.Email}</Card.Text>
                            <Card.Text>Birthday: {user.Birthday}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            minLength="3"
                            placeholder={user.Username}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="*****"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={user.Email}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            placeholder={user.Birthday}
                            />
                        </Form.Group>
                        <Button type="submit" onClick={handleUpdate}>Update</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
