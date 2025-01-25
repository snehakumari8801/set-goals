

import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GoalForm = () => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  //let BASE_URL = 'http://localhost:3000/api';
  let BASE_URL = 'https://set-goals.onrender.com';


  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false); 

    if (!title || !deadline || !status) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/goal/${id}/goals`,
        { title, deadline, status }
      );

      setTitle("");
      setDeadline("");
      setStatus("In Progress");
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Error adding goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:w-[60vw] p-3 m-3 bg-gray-500 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-white mb-6">Add New Goal</h3>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-1 lg:gap-4">
        <div className="">
          <label className="block text-white font-medium mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 h-12 w-[160px] rounded-md text-white mt-2 sm:mt-8"
        >
          {loading ? "Adding Goal...." : "Add Goal"}
        </button>
      </form>
      {error && <p className="text-red-500 font-medium">{error}</p>}
      {success && (
        <p className="text-gray-200 font-medium">Goal added successfully!</p>
      )}
    </div>
  );
};

export default GoalForm;

