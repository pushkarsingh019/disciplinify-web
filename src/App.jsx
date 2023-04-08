import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

// importing screens
import LandingScreen from "./screens/LandingPage";
import Signup from "./screens/Signup";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/Login";
import MorningScreen from "./screens/MorningScreen";
import EveningJournal from "./screens/EveningJournal";
import Dashboard from "./screens/Dashboard";

// script functions
import { todaysDate } from "./utils/scripts";
import { useEffect } from "react";
import axios from "axios";
import { backendUrl } from "./utils/config";

export default function App() {
	const [userData, setUserData] = useState(
		JSON.parse(localStorage.getItem("userData"))
	);
	const [tasks, setTasks] = useState([]);
	const [haveTasksUpdated, setHaveTasksUpdated] = useState();
	const accessToken = localStorage.getItem("access_token");

	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await axios.get(
					`${backendUrl}/daily/tasks/${todaysDate()}`,
					{
						headers: { authorization: `Bearer ${accessToken}` },
					}
				);
				const { tasks } = data;
				setTasks(tasks);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, [haveTasksUpdated]);

	// handlers
	const authHandler = (user) => {
		const userInfo = { id: user.id, name: user.name, email: user.email };
		localStorage.setItem("userData", JSON.stringify(userInfo));
		setUserData(JSON.parse(localStorage.getItem("userData")));
	};

	const taskUpdateHandler = (tasks) => {
		setHaveTasksUpdated(tasks);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						userData == null ? (
							<LandingScreen />
						) : (
							<HomeScreen userData={userData} tasks={tasks} />
						)
					}
				/>
				<Route
					path="/signup"
					element={<Signup onSignup={authHandler} />}
				/>
				<Route
					path="/home"
					element={<HomeScreen userData={userData} tasks={tasks} />}
				/>
				<Route
					path="/login"
					element={<LoginScreen onLogin={authHandler} />}
				/>
				<Route path="/morning" element={<MorningScreen />} />
				<Route path="/evening" element={<EveningJournal />} />
				<Route
					path="/dashboard"
					element={<Dashboard onTasksUpdate={taskUpdateHandler} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
