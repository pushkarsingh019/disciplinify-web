export default function DayBox({ day, date, ifClicked, id, style }) {
	const clickHandler = () => {
		ifClicked(id);
	};
	return (
		<div className={style} onClick={clickHandler}>
			<span>{day}</span>
			<br />
			{date}
		</div>
	);
}
