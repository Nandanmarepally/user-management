import React, { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.name ? user.name.split(" ") : ["", ""];
      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        email: user.email || "",
        department: user.company?.name || "",
      });
    }
  }, [user]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First Name is required.";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!formData.department) tempErrors.department = "Department is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...user,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        company: { name: formData.department },
      });
    }
  };

  return (
    <div className="user-form-container">
      <h2>{user ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          {errors.department && <p className="error">{errors.department}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
