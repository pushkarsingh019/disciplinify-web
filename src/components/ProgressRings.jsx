import ActivityRings from "react-activity-rings";

const ProgressRings = ({
  taskProgress,
  mindfullnessProgress,
  trainingProgress,
}) => {
  const activityData = [
    {
      label: "Tasks",
      value: taskProgress,
    },
    {
      label: "Mindfullness",
      value: mindfullnessProgress,
    },
    {
      label: "Brain Training",
      value: trainingProgress,
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
