import NavBar from "../components/NavBar";
import TimeAndGreetings from "../components/TimeAndGreeting";
import { generateDateStrings, getDayString } from "../utils/scripts";
import DayBox from "../components/DayBox";

export default function Dashboard() {
	const dateList = generateDateStrings(new Date(), 2);
	return (
		<section style={{ textAlign: "center" }} className="screen">
			<TimeAndGreetings />
			<NavBar />
			<section className="day-strings">
				{dateList.map((date) => {
					const dayString = getDayString(new Date(date));
					return (
						<DayBox
							day={dayString.dayOfWeekAbbreviation}
							date={dayString.dayOfMonth}
						/>
					);
				})}
			</section>
			<p>we will fetch things here</p>
		</section>
	);
}
