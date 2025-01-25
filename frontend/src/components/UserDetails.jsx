import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import GoalForm from "./GoalForm";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // let BASE_URL = "http://localhost:3000/api";
  let BASE_URL = 'https://set-goals.onrender.com';


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${id}`);
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user details with goal tracking:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userData]);

  const handleGoalAdded = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/${id}`);
      setUserData(response.data);
    } catch (err) {
      console.error("Error fetching updated user details:", err);
    }
  };

  if (loading) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-blue-50 rounded-lg shadow-md">
      {userData ? (
        <>
          <GoalForm userId={id} onGoalAdded={handleGoalAdded} />

          <h2 className="text-2xl font-semibold text-blue-900 mb-6">
            {userData.user.name}'s Goals
          </h2>

          <div className="mb-6">
            <p className="text-lg font-medium">Goal Tracking:</p>
            <ul>
              <li>Total Goals: {userData.totalGoals}</li>
              <li>Completed Goals: {userData.completedGoals}</li>
              <li>Completion Percentage: {userData.completionPercentage}%</li>
            </ul>
          </div>

          <div className="space-y-4">
            {userData.user.goals.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {userData.user.goals.map((goal, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-blue-700">
                        {goal.title}
                      </span>
                      <span className="text-sm text-gray-600">
                        Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-600">
                        Status: {goal.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No goals added yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default UserDetails;
