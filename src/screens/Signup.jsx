import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { backendUrl } from "../utils/config";

export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (userData) => {
      return axios.post(`${backendUrl}/auth/newUser`, userData);
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.data.user.accessToken);
      onSignup(data.data.user);
      navigate("/home");
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const userDetails = { name, email, password };
    mutation.mutate(userDetails);
  };

  return (
    <div className="center-form">
      <form className="form" onSubmit={formSubmitHandler}>
        <h2>Create an account</h2>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          autoComplete="username"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          autoComplete={"new-password"}
        />
        <br />
        <button type="submit" className="cta">
          Sign up
        </button>
      </form>
      <br />
      <div>
        {mutation.isLoading
          ? "creating the account"
          : mutation.isError
          ? `${mutation.error.response.data.message}`
          : null}
      </div>
      <div>{mutation.isSuccess ? "account created" : null}</div>
      <small>
        Already have an account ? <Link to={`/login`}>Login</Link>
      </small>
    </div>
  );
}
