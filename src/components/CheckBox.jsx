export default function CheckBox({ task, status }) {
	return (
		<div className="checkbox-container">
			<input
				type="checkbox"
				name=""
				id=""
				checked={status}
				className="checkbox"
			/>
			<label className="checkbox-label">{task}</label>
			<br />
			<br />
		</div>
	);
}
