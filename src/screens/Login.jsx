import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const loginUser = useStoreActions((actions) => actions.loginUser);
  const errorMessage = useStoreState((state) => state.errorMessage);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    await loginUser({ email, password });
    navigate("/home");
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
        <small>{errorMessage ? errorMessage : ""}</small>
        <br />
        <br />
        <small>
          Dont have an account ? <Link to={`/signup`}>Create Account</Link>
        </small>
      </form>
    </div>
  );
}
