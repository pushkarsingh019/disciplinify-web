const TimeAndGreetings = ({ name }) => {
	const today = new Date().toLocaleString("en-US", {
		weekday: "long",
		day: "numeric",
		month: "long",
	});
	const hour = new Date().getHours();
	const greeting =
		hour >= 5 && hour < 12
			? "Good morning"
			: hour < 18
			? "Good afternoon"
			: hour < 22
			? "Good evening"
			: "Good night";
	return (
		<section className="greetings">
			<small className="small">{today}</small>
			<h4 className="h4">
				{greeting} {name}
			</h4>
		</section>
	);
};

export default TimeAndGreetings;
