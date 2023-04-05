export default function DayBox({ day, date }) {
	return (
		<div className="day-box">
			<span>{day}</span>
			<br />
			{date}
		</div>
	);
}
