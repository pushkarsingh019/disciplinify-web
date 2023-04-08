import ActivityRings from "react-activity-rings";

const ProgressRings = ({
	taskProgress,
	mindfullnessProgress,
	trainingProgress,
}) => {
	const activityData = [
		{
			label: "Tasks",
			value: taskProgress || 0.001,
		},
		{
			label: "Mindfullness",
			value: mindfullnessProgress || 0.001,
		},
		{
			label: "Brain Training",
			value: trainingProgress || 0.001,
		},
	];

	const config = {
		width: 150,
		height: 150,
		ringSize: 14,
		radius: 32,
	};

	return <ActivityRings data={activityData} config={config} />;
};

export default ProgressRings;
