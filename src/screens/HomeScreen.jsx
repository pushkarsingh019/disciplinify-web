import TimeAndGreetings from "../components/TimeAndGreeting";
import ProgressRings from "../components/ProgressRings";
import { Link } from "react-router-dom";

export default function HomeScreen({ userData }) {
  if (userData == null) {
    return (
      <div className="center-form">
        <p className="subtitle">Your session has expired</p>
        <p>
          <Link to={"/signup"}>Signup</Link> or <Link to={"/login"}>Login</Link>{" "}
        </p>
      </div>
    );
  }
  return (
    <div className="screen">
      <TimeAndGreetings name={userData.name} />
      <section className="progress-section">
        <div className="label">
          <small>Tasks</small>
          <br />
          <strong>1/3 Completed</strong>
          <br />
          <br />
          <small>Mindfull Minutes</small>
          <br />
          <strong>10/10 Completed</strong>
          <br />
          <br />
          <small>Brain Training</small>
          <br />
          <strong>1/2 Completed</strong>
        </div>
        <div>
          <ProgressRings
            taskProgress={0.9}
            mindfullnessProgress={0.7}
            trainingProgress={0.8}
          />
        </div>
      </section>
      <br />
      complete your <Link to={`/morning`}>morning journal</Link>
    </div>
  );
}
