import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css"; // Importing CSS

const UserList = ({ onEdit, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users. Please try again later.");
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {error && <p className="error">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const [firstName, lastName] = user.name.split(" "); // Splitting name for first & last name
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{firstName || "N/A"}</td>
                <td>{lastName || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.company?.name || "N/A"}</td> {/* Assuming company name as department */}
                <td>
                  <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(user.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
