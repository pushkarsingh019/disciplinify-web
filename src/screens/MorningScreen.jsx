// importing sleep icons
import fullSleep from "../assets/icons/full-sleep.svg";
import goodSleep from "../assets/icons/good-sleep.svg";
import badSleep from "../assets/icons/bad-sleep.svg";
import noSleep from "../assets/icons/no-sleep.svg";

// other imports
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import backSVG from "../assets/icons/back.svg";
import forwardSVG from "../assets/icons/forward.svg";

// data fetching
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { backendUrl } from "../utils/config";

export default function MorningScreen() {
	const [journey, setJourney] = useState(0);
	const [taskOne, setTaskOne] = useState({
		id: 1,
		category: "dailyTask",
		completed: false,
		task: "",
	});
	const [taskTwo, setTaskTwo] = useState({
		id: 2,
		category: "dailyTask",
		completed: false,
		task: "",
	});
	const [taskThree, setTaskThree] = useState({
		id: 3,
		category: "dailyTask",
		completed: false,
		task: "",
	});
	const [answer, setAnswer] = useState("");
	const [reflection, setReflection] = useState("");
	const [morningJournal, setMorningJournal] = useState({
		sleepMetric: 0,
		tasks: [],
		answer: "",
		reflectionQuestion:
			"How can I rekindle my principles and start living today?",
		reflection: "",
	});
	const navigate = useNavigate();
	const token = localStorage.getItem("access_token");
	const mutation = useMutation({
		mutationFn: (journalEntry) => {
			return axios.post(`${backendUrl}/journal/morning`, journalEntry, {
				headers: { authorization: `Bearer ${token}` },
			});
		},
	});

	// functions

	const onTouch = (sleepMetric) => {
		setMorningJournal({ ...morningJournal, sleepMetric: sleepMetric });
		setJourney(1);
	};

	const onTaskSubmit = (event) => {
		// defining the tasks for training plan
		const morningReflection = {
			id: 4,
			category: "dailyReflection",
			task: "Morning Reflection",
			completed: false,
		};
		const eveningReflection = {
			id: 5,
			category: "dailyReflection",
			task: "Evening Reflection",
			completed: false,
		};
		const lumosityTraining = {
			id: 6,
			category: "brainTraining",
			task: "lumosity brain training",
			completed: false,
			percentageCompleted: 0,
		};
		const mindfullnessActivity = {
			id: 7,
			category: "mindfullness",
			task: "mindfullness activity",
			completed: false,
			percentageCompleted: 0,
		};
		event.preventDefault();
		setMorningJournal({
			...morningJournal,
			tasks: [
				taskOne,
				taskTwo,
				taskThree,
				morningReflection,
				eveningReflection,
				lumosityTraining,
				mindfullnessActivity,
			],
		});
		setJourney(2);
	};

	const onAnswer = () => {
		setMorningJournal({
			...morningJournal,
			answer: answer,
		});
		setJourney(journey + 1);
	};

	const completeMorningReflection = () => {
		setMorningJournal({ ...morningJournal, reflection: reflection });
		mutation.mutateAsync(morningJournal);
		setJourney(journey + 1);
	};

	switch (journey) {
		case 0:
			return (
				<section className="center-content screen">
					<img
						src={forwardSVG}
						className="forward"
						onClick={() => setJourney(journey + 1)}
					/>
					<h2
						style={{
							textAlign: "left",
							fontSize: "3.5vh",
							marginBottom: "5vh",
						}}
					>
						How well did you sleep today?
					</h2>
					<div className="feeling-flex">
						<img src={fullSleep} onClick={() => onTouch(100)} />
						<img src={goodSleep} onClick={() => onTouch(75)} />
						<img src={badSleep} onClick={() => onTouch(50)} />
						<img src={noSleep} onClick={() => onTouch(25)} />
					</div>
				</section>
			);
		case 1:
			return (
				<section>
					<form onSubmit={onTaskSubmit} className="center-form  ">
						<img
							src={backSVG}
							className="back"
							onClick={() => setJourney(journey - 1)}
						/>
						<img
							src={forwardSVG}
							className="forward"
							onClick={() => setJourney(journey + 1)}
						/>
						<h2 style={{ textAlign: "left" }}>
							Three main tasks for today..
						</h2>
						<br />
						<br />
						<input
							required
							type="text"
							placeholder="Task One"
							onChange={(event) =>
								setTaskOne({
									...taskOne,
									task: event.target.value,
								})
							}
							value={taskOne.task}
							className="task-input"
						/>
						<br />
						<input
							required
							type="text"
							placeholder="Task Two"
							onChange={(event) =>
								setTaskTwo({
									...taskTwo,
									task: event.target.value,
								})
							}
							value={taskTwo.task}
							className="task-input"
						/>
						<br />
						<input
							required
							type="text"
							placeholder="Task Three"
							onChange={(event) =>
								setTaskThree({
									...taskThree,
									task: event.target.value,
								})
							}
							value={taskThree.task}
							className="task-input"
						/>
						<br />
						<br />
						<button type="submit" className="cta">
							Next
						</button>
					</form>
				</section>
			);
		case 2:
			return (
				<section className="screen">
					<img
						src={backSVG}
						className="back"
						onClick={() => setJourney(journey - 1)}
					/>
					<img
						src={forwardSVG}
						className="forward"
						onClick={() => setJourney(journey + 1)}
					/>
					<h3 style={{ marginTop: "15vh" }}>
						What would make today great?
					</h3>
					<br />
					<br />
					<textarea
						rows={20}
						cols={60}
						value={answer}
						onChange={(event) => setAnswer(event.target.value)}
					/>
					<br />
					<button className="cta" onClick={onAnswer}>
						Next
					</button>
				</section>
			);
		case 3:
			return (
				<section className="screen">
					<img
						src={backSVG}
						className="back"
						onClick={() => setJourney(journey - 1)}
					/>
					<h3 style={{ marginTop: "15vh" }}>
						How would you spend your life right now?
					</h3>
					<br />
					<br />
					<textarea
						rows={20}
						cols={60}
						value={reflection}
						onChange={(event) => setReflection(event.target.value)}
					/>
					<br />
					<button className="cta" onClick={completeMorningReflection}>
						complete morning reflection
					</button>
				</section>
			);
		default:
			navigate("/home");
	}
}
