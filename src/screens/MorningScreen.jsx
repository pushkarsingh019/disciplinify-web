// importing sleep icons
import fullSleep from "../assets/icons/full-sleep.svg";
import goodSleep from "../assets/icons/good-sleep.svg";
import badSleep from "../assets/icons/bad-sleep.svg";
import noSleep from "../assets/icons/no-sleep.svg";

export default function MorningScreen() {
  const onTouch = (feeling) => console.log(`so you had a ${feeling}`);

  const Feeling = () => {
    return (
      <section className="center-content">
        <h2
          style={{ textAlign: "left", fontSize: "3.5vh", marginBottom: "5vh" }}
        >
          How well did you sleep today?
        </h2>
        <div className="feeling-flex">
          <img src={fullSleep} onClick={() => onTouch("Full sleep")} />
          <img src={goodSleep} onClick={() => onTouch("Good sleep")} />
          <img src={badSleep} onClick={() => onTouch("Bad sleep")} />
          <img src={noSleep} onClick={() => onTouch("No sleep")} />
        </div>
      </section>
    );
  };

  return (
    <div className="screen">
      <Feeling />
    </div>
  );
}
