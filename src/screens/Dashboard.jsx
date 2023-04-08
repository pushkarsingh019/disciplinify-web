import NavBar from "../components/NavBar";
import TimeAndGreetings from "../components/TimeAndGreeting";
import {
	generateDateStrings,
	getDayString,
	todaysDate,
} from "../utils/scripts";
import DayBox from "../components/DayBox";
import { useMutation } from "@tanstack/react-query";
import { backendUrl } from "../utils/config";
import axios from "axios";
import { useState } from "react";
import CheckBox from "../components/CheckBox";
import missionIcon from "../assets/icons/missionIcon.svg";
import trainingIcon from "../assets/icons/trainingIcon.svg";
import { useEffect } from "react";

export default function Dashboard({ onTasksUpdate }) {
	const dateList = generateDateStrings(new Date(), 2);
	const token = localStorage.getItem("access_token");
	const [tasks, setTasks] = useState([]);
	const [dailyTasks, setDailyTasks] = useState([]);
	const [trainingTasks, setTrainingTasks] = useState([]);
	const [answer, setAnswer] = useState("");
	const [aBetterToday, setABetterToday] = useState("");

	// syncing external states
	useEffect(() => {
		mutation.mutate(todaysDate());
	}, []);

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
			setDailyTasks([]);
			setTrainingTasks([]);
			onTasksUpdate([]);
			if (status.morningReflectionCompleted) {
				const { morningReflection } = data;
				const {
					tasks,
					sleepMetric,
					dailyAnswer,
					reflectionAnswer,
					trainingChecklist,
				} = morningReflection;
				setAnswer(dailyAnswer);
				setTasks(tasks);
				setDailyTasks(
					tasks.filter((task) => task.category === "dailyTask")
				);
				setTrainingTasks(
					tasks.filter(
						(task) =>
							task.category === "dailyReflection" ||
							task.category === "brainTraining" ||
							task.category === "mindfullness"
					)
				);
				onTasksUpdate(tasks);
			}
			if (status.eveningReflectionCompleted) {
				const { eveningReflection } = data;
				const { aBetterToday, threeThings } = eveningReflection;
				setABetterToday(aBetterToday);
			}
		},
	});

	const modifyTask = useMutation({
		mutationFn: async ({ taskId, status, date }) => {
			return axios
				.post(
					`${backendUrl}/daily/modifyTask`,
					{
						taskId,
						status,
						date,
					},
					{
						headers: { authorization: `Bearer ${token}` },
					}
				)
				.then((res) => res.data);
		},
		onSuccess: (data) => {
			setTasks(data);
			setDailyTasks(data.filter((task) => task.category === "dailyTask"));
			setTrainingTasks(
				data.filter(
					(task) =>
						task.category === "dailyReflection" ||
						task.category === "brainTraining" ||
						task.category === "mindfullness"
				)
			);
			onTasksUpdate(data);
		},
	});

	// functions
	const onDateChoice = (date) => mutation.mutate(date);

	const handleTaskCompletion = (data) => {
		const date = todaysDate();
		let dataToSend = { taskId: data.taskId, status: data.status, date };
		modifyTask.mutate(dataToSend);
	};

	// components
	const DailyData = ({ tasksToShow, title, icon }) => {
		if (mutation.isLoading) return <p>Loading...</p>;
		if (mutation.isError) return <p>error occured, please refresh...</p>;
		if (mutation.isSuccess)
			return (
				<section style={{ textAlign: "left" }}>
					<div className="checkbox-container">
						<img src={icon} alt="Todays Goals" />
						<span className="h2" style={{ marginLeft: "2vw" }}>
							{" "}
							{title}
						</span>
					</div>
					<hr />
					<br />
					{tasksToShow.map((task) => {
						return (
							<CheckBox
								key={task.id}
								task={task.task}
								status={task.completed}
								onTaskComplete={handleTaskCompletion}
								id={task.id}
							/>
						);
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
			<DailyData
				tasksToShow={dailyTasks}
				title={`Today's Mission`}
				icon={missionIcon}
			/>
			<br />
			<DailyData
				tasksToShow={trainingTasks}
				title={`Today's Training`}
				icon={trainingIcon}
			/>
		</section>
	);
}
