import { useState } from "react";
import forwardSVG from "../assets/icons/forward.svg";
import backSVG from "../assets/icons/back.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { backendUrl } from "../utils/config";
import axios from "axios";

export default function EveningJournal() {
  const [journey, setJourney] = useState(0);
  const [eveningJournal, setEveningJournal] = useState({
    threeThings: [],
    aBetterToday: "",
  });
  const [betterToday, setBetterToday] = useState("");
  const [goodThing1, setGoodThings1] = useState("");
  const [goodThing2, setGoodThings2] = useState("");
  const [goodThing3, setGoodThings3] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const mutation = useMutation({
    mutationFn: (journalEntry) => {
      return axios.post(`${backendUrl}/journal/evening`, journalEntry, {
        headers: { authorization: `Bearer ${token}` },
      });
    },
  });

  // functions
  const formHandler = (event) => {
    event.preventDefault();
    setEveningJournal({
      ...eveningJournal,
      threeThings: [goodThing1, goodThing2, goodThing3],
    });
    setJourney(journey + 1);
  };

  const completeEveningReflection = () => {
    setEveningJournal({ ...eveningJournal, aBetterToday: betterToday });
    mutation.mutateAsync(eveningJournal);
  };

  switch (journey) {
    case 0:
      return (
        <section>
          <img
            src={forwardSVG}
            className="forward"
            onClick={() => setJourney(journey + 1)}
          />
          <form onSubmit={formHandler} className="center-form">
            <h3>Three amazing things that happened today?</h3>
            <br />
            <br />
            <input
              type="text"
              required
              placeholder="got praised by my manager"
              className="task-input"
              value={goodThing1}
              onChange={(event) => setGoodThings1(event.target.value)}
            />
            <br />
            <input
              type="text"
              required
              placeholder="called my mom"
              className="task-input"
              value={goodThing2}
              onChange={(event) => setGoodThings2(event.target.value)}
            />
            <br />
            <input
              type="text"
              required
              placeholder="completed my assignment"
              className="task-input"
              value={goodThing3}
              onChange={(event) => setGoodThings3(event.target.value)}
            />
            <br />
            <br />
            <button type="submit" className="cta">
              next
            </button>
          </form>
        </section>
      );
      break;
    case 1:
      return (
        <section className="screen">
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
          <h3 style={{ marginTop: "15vh" }}>
            How could have today been better?
          </h3>
          <br />
          <br />
          <ReactQuill
            className="editor"
            theme="bubble"
            value={betterToday}
            onChange={setBetterToday}
          />
          <br />
          <button className="cta" onClick={completeEveningReflection}>
            complete evening reflection
          </button>
        </section>
      );
      break;
    default:
      navigate("/home");
  }
}
