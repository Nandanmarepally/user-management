import React, { createContext, useState, useEffect } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userData = await getUsers();
      setUsers(userData);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const addNewUser = async (userData) => {
    try {
      const newUser = await addUser(userData);
      setUsers([...users, newUser]); // JSONPlaceholder adds with a fake ID
    } catch (err) {
      setError("Failed to add user.");
    }
  };

  const editUser = async (id, updatedData) => {
    try {
      const updatedUser = await updateUser(id, updatedData);
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    } catch (err) {
      setError("Failed to update user.");
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  return (
    <UserContext.Provider value={{ users, loading, error, addNewUser, editUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};
