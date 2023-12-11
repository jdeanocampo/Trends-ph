import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

const Signup = () => {
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const [errors, setErrors] = useState({});

 const navigate = useNavigate();

 const validateInputs = () => {
    let validationErrors = {};
    let isValid = true;

    if (username.trim() === "") {
      validationErrors.username = "Username is required.";
      isValid = false;
    }
    if (username.trim() <= 3) {
      validationErrors.username = "Username minimum of 4 characters";
      isValid = false;
    }

    if (email.trim() === "") {
      validationErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid.";
      isValid = false;
    }

    if (password.trim() === "") {
      validationErrors.password = "Password is required.";
      isValid = false;
    }
    
    if (password.trim() <= 7) {
      validationErrors.password = "Minimum of 8 characters.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
 };

 const signup = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setLoading(true);

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: username,
          email,
        });

        setLoading(false);
        toast.success("Account created");
        navigate("/login");
      } catch (error) {
        setLoading(false);
        toast.error("Error! Please enter a valid information");
      }
    }
 };

 return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12">
                <span className="d-flex align-items-center justify-content-center">
                 <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="black"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                 />
                </span>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Signup</h3>
                <Form className="auth__form" onSubmit={signup}>
                 <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p className="error-message">{errors.username}</p>}
                 </FormGroup>

                 <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                 </FormGroup>

                 <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                 </FormGroup>

                 <button className="shop__btn auth__btn">Signup</button>
                </Form>
                <p className="mt-3">
                 Already have an account? <Link to="/login">Login</Link>
                </p>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
 );
};

export default Signup;