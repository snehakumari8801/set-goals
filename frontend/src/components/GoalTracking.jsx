import React, { useState, useEffect } from "react";
import axios from "axios";

const GoalTracking = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/goaltracking")
      .then((response) => {
        console.log(response);
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching goal tracking data:", err);
        setLoading(false);
      });
  }, []);

  const getGoalTrackingData = () => {
    let totalGoals = 0;
    let completedGoals = 0;

    users.forEach((user) => {
      totalGoals += user.goals.length;
      completedGoals += user.goals.filter(
        (goal) => goal.status === "Completed"
      ).length;
    });

    const completionPercentage =
      totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);
    return { totalGoals, completedGoals, completionPercentage };
  };

  const { totalGoals, completedGoals, completionPercentage } =
    getGoalTrackingData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Goal Tracking Dashboard</h3>
      <p>Total Goals: {totalGoals}</p>
      <p>Completed Goals: {completedGoals}</p>
      <p>Completion Percentage: {completionPercentage}%</p>

      <h4>Users & Their Goals:</h4>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <h5>{user.name}</h5>
            <ul>
              {user.goals.map((goal) => (
                <li key={goal._id}>
                  <p>Title: {goal.title}</p>
                  <p>Status: {goal.status}</p>
                  <p>
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalTracking;
