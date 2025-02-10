import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
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

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        setError("Failed to delete user. Please try again.");
      }
    }
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? userData : u)));
    } else {
      setUsers([...users, { ...userData, id: users.length + 1 }]);
    }
    setShowForm(false);
  };

  return (
    <div className="home-container">
      <h1>User Management</h1>
      {error && <p className="error">{error}</p>}
      {!showForm ? (
        <>
          <button className="add-user-btn" onClick={handleAddUser}>
            Add User
          </button>
          <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
        </>
      ) : (
        <UserForm user={selectedUser} onSave={handleSaveUser} onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Home;
