import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";


const Signup = props => {
    const [response, setResponse] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (response.success && response.token) {
            console.log(`User successfully logged in: ${response.username}`);
            localStorage.setItem("token", response.token);
        }
    }, [response]);
    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const requestData = {
                username: e.target.username.value,
                password: e.target.password.value,
            };
            const response = await axios.post(
                `http://localhost:8080/auth/signup`,
                requestData
            );
            console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
            setResponse(response.data);
        } catch (err) {
            setErrorMessage(
                "The username or password you entered are not valid.  Try harder! "
            );
        }
    };

    if (!response.success)
        return (
            <div className="Signup">
                <h1>Sign up</h1>
                <p>Register an account to access protected content!</p>
                {errorMessage ? <p className="error">{errorMessage}</p> : ""}
                <section className="main-content">
                    <form onSubmit={handleSubmit}>
                        {
                        }
                        <label>Username: </label>
                        <input type="text" name="username" placeholder="username" />
                        <br />
                        <br />
                        <label>Password: </label>
                        <input type="password" name="password" placeholder="password" />
                        <br />
                        <br />
                        <input type="submit" value="Create account" />
                    </form>
                    <p>
                        Already have an account? <Link to="/auth/login">Log in</Link>!
                    </p>
                </section>
            </div>
        );

    else return <Navigate to="/" />;
};

export default Signup;