import { useState } from "react";

export default function CheckBox({ task, status, onTaskComplete, id }) {
	const [isCompleted, setIsCompleted] = useState(status);

	const handleCheckboxChange = async (event) => {
		await setIsCompleted(!isCompleted);
		await onTaskComplete({ taskId: id, status: !isCompleted });
	};

	return (
		<div className="checkbox-container">
			<input
				type="checkbox"
				className="checkbox"
				checked={isCompleted}
				onChange={handleCheckboxChange}
			/>
			<label className="checkbox-label">{task}</label>
			<br />
			<br />
		</div>
	);
}
