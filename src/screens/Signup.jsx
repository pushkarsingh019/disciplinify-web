import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupUser = useStoreActions((actions) => actions.signupUser);
  const navigate = useNavigate();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const userDetails = { name, email, password };
    signupUser(userDetails);
    navigate("/home");
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
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <br />
        <button type="submit" className="cta">
          Sign up
        </button>
      </form>
      <br />
      <br />
      <small>
        Already have an account ? <Link to={`/login`}>Login</Link>
      </small>
    </div>
  );
}
