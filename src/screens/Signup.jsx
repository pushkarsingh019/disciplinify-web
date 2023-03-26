import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="signup-screen">
      <form className="form">
        <h2>Create an account</h2>
        <input type="text" placeholder="Name" required />
        <br />
        <input type="email" placeholder="Email" required />
        <br />
        <input type="password" placeholder="Password" required />
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
