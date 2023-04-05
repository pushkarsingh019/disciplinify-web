import { useNavigate } from "react-router-dom";

export default function SuggestionCard({ header, subtitle, redirect }) {
  const navigate = useNavigate();

  const clickHandler = (event) => {
    navigate(`/${redirect}`);
  };

  return (
    <div className="suggestion-card" onClick={clickHandler}>
      <h3>{header}</h3>
      <p>{subtitle}</p>
    </div>
  );
}
