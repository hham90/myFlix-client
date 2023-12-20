import { useState } from "react";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
          access: username,
          secret: password
        };

        fetch("https://moviedbapi-2a92d1561762.herokuapp.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then ((data) => {
            console.log("Login response: ", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
              } else {alert("No such user");
        }
          })
          .catch((e) => {
            alert("Something went wrong");
          });
    };

      return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Username">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.vaule)}
                   required
                    />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password"
                   value={password}
                   oncChange={(e) => setPassword(e.target.value)}
                   required />
          </Form.Group>
          <Button variant="Primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    };