import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUserId, setSelectedUserId] = useState(null);

  let BASE_URL = "http://localhost:3000/api";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/users`)
      .then((response) => setUsers(response.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
    if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleUserDetails = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  return (
    <div className="bg-gray-300 p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded-lg shadow-md w-full md:w-1/3 text-gray-600"
        />
        <button
          onClick={handleSort}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full md:w-auto"
        >
          Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      <ul className="space-y-4">
        {sortedUsers.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center bg-gray-500 text-white p-4 rounded-lg shadow-md hover:shadow-lg"
          >
            <Link
              to={`/user/${user._id}`}
              className="text-lg font-semibold text-indigo"
            >
              {user.name} - {user.email} - {user.goals ? user.goals.length : 0}{" "}
              goals
            </Link>

            <Link to={`/user/${user._id}`}>
              <button
                onClick={() => toggleUserDetails(user._id)}
                className="ml-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
              >
                Show Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
