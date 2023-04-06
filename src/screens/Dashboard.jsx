import NavBar from "../components/NavBar";
import TimeAndGreetings from "../components/TimeAndGreeting";
import { generateDateStrings, getDayString } from "../utils/scripts";
import DayBox from "../components/DayBox";
import { useMutation } from "@tanstack/react-query";
import { backendUrl } from "../utils/config";
import axios from "axios";
import { useState } from "react";
import CheckBox from "../components/CheckBox";

export default function Dashboard() {
	const dateList = generateDateStrings(new Date(), 2);
	const token = localStorage.getItem("access_token");
	const [tasks, setTasks] = useState([]);
	const [answer, setAnswer] = useState("");
	const [aBetterToday, setABetterToday] = useState("");

	const mutation = useMutation({
		mutationFn: async (date) => {
			setAnswer("");
			const res = await axios.get(`${backendUrl}/daily/newDay/${date}`, {
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		},
		onSuccess: (data) => {
			const { status } = data;
			setTasks([]);
			if (status.morningReflectionCompleted) {
				const { morningReflection } = data;
				const { tasks, sleepMetric, dailyAnswer, reflectionAnswer } =
					morningReflection;
				setAnswer(dailyAnswer);
				setTasks(tasks);
			}
			if (status.eveningReflectionCompleted) {
				const { eveningReflection } = data;
				const { aBetterToday, threeThings } = eveningReflection;
				setABetterToday(aBetterToday);
			}
		},
	});

	// functions
	const onDateChoice = (date) => mutation.mutate(date);

	// components
	const DailyData = () => {
		if (mutation.isLoading) return <p>Loading...</p>;
		if (mutation.isError) return <p>error occured, please refresh...</p>;
		if (mutation.isSuccess)
			return (
				<section>
					{tasks.map((task) => {
						return <CheckBox key={task.task} task={task.task} />;
					})}
				</section>
			);
	};

	return (
		<section style={{ textAlign: "center" }} className="screen">
			<TimeAndGreetings />
			<NavBar />
			<section className="day-strings">
				{dateList.map((date) => {
					const dayString = getDayString(new Date(date));
					return (
						<DayBox
							key={date}
							ifClicked={onDateChoice}
							id={date}
							day={dayString.dayOfWeekAbbreviation}
							date={dayString.dayOfMonth}
						/>
					);
				})}
			</section>
			<DailyData />
		</section>
	);
}
