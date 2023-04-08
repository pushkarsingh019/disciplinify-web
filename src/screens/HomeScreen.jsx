import TimeAndGreetings from "../components/TimeAndGreeting";
import ProgressRings from "../components/ProgressRings";
import { Link } from "react-router-dom";
import SuggestionCard from "../components/SuggestionCard";
import NavBar from "../components/NavBar";
import { useState } from "react";
import { useEffect } from "react";

export default function HomeScreen({ userData, tasks }) {
	// variables
	const [dailyTasks, setDailyTasks] = useState(
		tasks.filter(
			(task) =>
				task.category === "dailyTask" ||
				task.category === "dailyReflection"
		)
	);
	const [brainTraining, setBrainTraining] = useState(
		tasks.filter(
			(task) =>
				task.category === "brainTraining" ||
				task.category === "mindfullness"
		)
	);
	const [reflectionTask, setReflectionTask] = useState(
		tasks.filter((task) => task.category === "dailyReflection")
	);
	// external state
	useEffect(() => {
		setDailyTasks(tasks.filter((task) => task.category === "dailyTask"));
		setBrainTraining(
			tasks.filter(
				(task) =>
					task.category === "brainTraining" ||
					task.category === "mindfullness"
			)
		);
		setReflectionTask(
			tasks.filter((task) => task.category === "dailyReflection")
		);
	}, [tasks]);

	useEffect(() => {});

	// functions
	const computeTaskRatio = (tasks) =>
		tasks.filter((task) => task.completed === true).length / tasks.length;

	if (userData == null) {
		return (
			<div className="center-form">
				<p className="subtitle">Your session has expired</p>
				<p>
					<Link to={"/signup"}>Signup</Link> or{" "}
					<Link to={"/login"}>Login</Link>{" "}
				</p>
			</div>
		);
	}
	return (
		<div className="screen">
			<TimeAndGreetings name={userData.name} />
			<section className="progress-section">
				<div className="label">
					<small>Tasks</small>
					<br />
					<strong>
						{
							dailyTasks.filter((task) => task.completed === true)
								.length
						}
						/{dailyTasks.length} Completed
					</strong>
					<br />
					<br />
					<small>Training</small>
					<br />
					<strong>
						{
							brainTraining.filter(
								(task) => task.completed === true
							).length
						}
						/{brainTraining.length} Completed
					</strong>
					<br />
					<br />
					<small>Reflection</small>
					<br />
					<strong>
						{
							reflectionTask.filter(
								(task) => task.completed === true
							).length
						}
						/{reflectionTask.length} Completed
					</strong>
					<br />
				</div>
				<div>
					<ProgressRings
						taskProgress={computeTaskRatio(dailyTasks)}
						mindfullnessProgress={computeTaskRatio(reflectionTask)}
						trainingProgress={computeTaskRatio(brainTraining)}
					/>
				</div>
			</section>
			<br />
			<br />
			<br />
			<SuggestionCard
				header={`Morning Reflection`}
				subtitle={`start you day on the right foot`}
				redirect={`morning`}
			/>
			<br />
			<SuggestionCard
				header={`Evening Journal`}
				subtitle={`Wind down and reflect on your day.`}
				redirect={`evening`}
			/>
			<NavBar active={`Home`} />
		</div>
	);
}
