import React, { Fragment, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./Login.scss";
import { login, logout, authSelector } from "../../redux/auth.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const checkLogin = async (email: string, password: string) => {
    try {
      const res = await axios.post("https://localhost:7103/api/user/login", {
        email: email,
        password: password,
      });
      if(res.status === 200){
        await setError("");
        await setEmail("");
        await setPassword("");
        await dispatch(login());
        history.push("/");
      } else if (res.status === 404){
        setError("User not found !");
      }
    } catch(error) {
      console.log(error)
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email.");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else if (!password) {
      setError("Please enter your password.");
    } else if (password.length < 5) {
      setError("Password must be at least 5 characters long.");
    } else {
      checkLogin(email, password);
    }
  };

  const validateEmail = (value: string) => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <div className="login-page">
      <Container className="login-container">
        <div className="login-wrapper">
          <div className="logo-wrapper">
            <span className="logo-title">Mitra</span>
            <span className="logo-title">Nusantara</span>
          </div>

          <div className="login-form-wrapper">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="form-child">
                <Form.Label className="form-label">Email Address</Form.Label>
                <Form.Control
                  className="form-text-input"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!error}
                />
              </Form.Group>

              <Form.Group controlId="password" className="form-child">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  className="form-text-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!error}
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <div className="button-container">
                <Button className="login-btn" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default Login;
