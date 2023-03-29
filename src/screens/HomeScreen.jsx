import TimeAndGreetings from "../components/TimeAndGreeting";
import ProgressRings from "../components/ProgressRings";

export default function HomeScreen({ userData }) {
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
            trainingProgress={0.2}
          />
        </div>
      </section>
    </div>
  );
}
