import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, editingEmployee, onCancel }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    } else {
      setEmployee({ name: "", email: "", position: "" });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employee);
    setEmployee({ name: "", email: "", position: "" });
  };

  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* 👇 Dynamic heading here */}
      <h2 style={{ marginBottom: "15px", color: "#1976d2" }}>
        {editingEmployee ? "Edit Employee" : "Employee Details"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          required
          style={{ padding: "10px", margin: "5px", width: "30%" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          required
          style={{ padding: "10px", margin: "5px", width: "30%" }}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleChange}
          required
          style={{ padding: "10px", margin: "5px", width: "30%" }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#1976d2",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          {editingEmployee ? "Update" : "Save"}
        </button>

        {editingEmployee && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              backgroundColor: "#ccc",
              color: "#000",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default EmployeeForm;
