import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { backendUrl } from "../utils/config";

export default function LoginScreen({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (user) => {
      return axios.post(`${backendUrl}/auth/loginUser`, user);
    },
    onSuccess: (data) => {
      const accessToken = data.data.accessToken;
      const userData = data.data.user;
      localStorage.setItem("access_token", accessToken);
      const user = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      };
      onLogin(user);
      navigate("/home");
    },
    onError: (data) => {
      setErrorMessage(data.response.data);
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const user = { email, password };
    mutation.mutateAsync(user);
    // if (loginMutation.isSuccess) {
    //   localStorage.setItem("access_token", loginMutation.data.accessToken);
    //   const user = loginMutation.data.user;
    //   onLogin({ id: user._id, name: user.name, email: user.email });
    // }
    // if (loginMutation.isError) {
    //   console.log(loginMutation.data.response.data);
    // }
  };

  return (
    <div className="center-form">
      <h1>Welcome Back!</h1>
      <h3>Login to continue</h3>
      <br />
      <br />
      <form className="form" onSubmit={formSubmitHandler}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <button type="submit" className="cta">
          Login
        </button>
        <br />
        <br />
        <p>{mutation.isLoading ? "logging you in..." : `${errorMessage}`}</p>
        <br />
        <small>
          Dont have an account ? <Link to={`/signup`}>Create Account</Link>
        </small>
      </form>
    </div>
  );
}
