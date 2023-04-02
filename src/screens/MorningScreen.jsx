// importing sleep icons
import fullSleep from "../assets/icons/full-sleep.svg";
import goodSleep from "../assets/icons/good-sleep.svg";
import badSleep from "../assets/icons/bad-sleep.svg";
import noSleep from "../assets/icons/no-sleep.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import backSVG from "../assets/icons/back.svg";
import forwardSVG from "../assets/icons/forward.svg";

export default function MorningScreen() {
  const [journey, setJourney] = useState(0);
  const [taskOne, setTaskOne] = useState("");
  const [taskTwo, setTaskTwo] = useState("");
  const [taskThree, setTaskThree] = useState("");
  const [morningJournal, setMorningJournal] = useState({
    sleepMetric: 0,
    tasks: [],
    answer: "",
    reflection: "",
  });

  // functions

  const onTouch = (sleepMetric) => {
    setMorningJournal({ ...morningJournal, sleepMetric: sleepMetric });
    setJourney(1);
  };

  const onTaskSubmit = (event) => {
    event.preventDefault();
    setMorningJournal({
      ...morningJournal,
      tasks: [taskOne, taskTwo, taskThree],
    });
    setJourney(2);
  };

  const SleepTracker = () => {
    return (
      <section className="center-content screen">
        <img
          src={forwardSVG}
          className="forward"
          onClick={() => setJourney(journey + 1)}
        />
        <h2
          style={{ textAlign: "left", fontSize: "3.5vh", marginBottom: "5vh" }}
        >
          How well did you sleep today?
        </h2>
        <div className="feeling-flex">
          <img src={fullSleep} onClick={() => onTouch(100)} />
          <img src={goodSleep} onClick={() => onTouch(75)} />
          <img src={badSleep} onClick={() => onTouch(50)} />
          <img src={noSleep} onClick={() => onTouch(25)} />
        </div>
      </section>
    );
  };

  const DailyHiglight = () => {
    return (
      <section>
        <form onSubmit={onTaskSubmit}>
          <input
            type="text"
            placeholder="task one"
            onChange={(event) => setTaskOne(event.target.value)}
            value={taskOne}
          />
          <br />
          <br />
          <button type="submit">next</button>
        </form>
      </section>
    );
  };

  const TodayGreatQuestion = () => {
    return (
      <section>
        <h2>What would make today great?</h2>
      </section>
    );
  };

  const ReflectionQuestion = () => {
    return (
      <section>
        <h3>How would you spend your life right now?</h3>
      </section>
    );
  };

  switch (journey) {
    case 0:
      return <SleepTracker />;
    case 1:
      return (
        <section>
          <form onSubmit={onTaskSubmit} className="center-form  ">
            <img
              src={backSVG}
              className="back"
              onClick={() => setJourney(journey - 1)}
            />
            <img
              src={forwardSVG}
              className="forward"
              onClick={() => setJourney(journey + 1)}
            />
            <h2 style={{ textAlign: "left" }}>Three main tasks for today..</h2>
            <br />
            <br />
            <input
              required
              type="text"
              placeholder="Task One"
              onChange={(event) => setTaskOne(event.target.value)}
              value={taskOne}
              className="task-input"
            />
            <br />
            <input
              required
              type="text"
              placeholder="Task Two"
              onChange={(event) => setTaskTwo(event.target.value)}
              value={taskTwo}
              className="task-input"
            />
            <br />
            <input
              required
              type="text"
              placeholder="Task Three"
              onChange={(event) => setTaskThree(event.target.value)}
              value={taskThree}
              className="task-input"
            />
            <br />
            <br />
            <button type="submit" className="cta">
              Next
            </button>
          </form>
        </section>
      );
    case 2:
      return <TodayGreatQuestion />;
    case 3:
      return <ReflectionQuestion />;
    default:
      return <h3>there is something very wrong</h3>;
  }
}
