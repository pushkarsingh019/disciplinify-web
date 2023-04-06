export default function DayBox({ day, date, ifClicked, id }) {
	const clickHandler = () => {
		ifClicked(id);
	};
	return (
		<div className="day-box" onClick={clickHandler}>
			<span>{day}</span>
			<br />
			{date}
		</div>
	);
}
