import React, { useState, useEffect } from "react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeApi";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    const data = await getEmployees();
    setEmployees(data);
  }

  // ✅ Check duplicate email
  function emailExists(email, excludeId = null) {
    return employees.some(
      (emp) => emp.email === email && emp.id !== excludeId
    );
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.position)
      return alert("Fill all fields");

    if (emailExists(form.email)) {
      return alert("Email already exists!");
    }

    await addEmployee(form);
    setForm({ name: "", email: "", position: "" });
    loadEmployees();
  }

  async function handleUpdate(id) {
    if (!form.name || !form.email || !form.position)
      return alert("Fill all fields");

    if (emailExists(form.email, id)) {
      return alert("Email already exists!");
    }

    await updateEmployee(id, form);
    setEditingId(null);
    setForm({ name: "", email: "", position: "" });
    loadEmployees();
  }

  function startEdit(emp) {
    setEditingId(emp.id);
    setForm({ name: emp.name, email: emp.email, position: emp.position });
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
      loadEmployees();
    }
  }

  // ✅ Filter employees
  const filtered = employees.filter((emp) =>
    [emp.name, emp.email, emp.position].some((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center", color: "#100c0cff" }}>
        Employee Manager
      </h2>

      {/* Add Employee Form */}
      <form
        onSubmit={(e) =>
          editingId ? (e.preventDefault(), handleUpdate(editingId)) : handleAdd(e)
        }
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ flex: 1, padding: "8px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ flex: 1, padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          style={{ flex: 1, padding: "8px" }}
        />
        <button
          type="submit"
          style={{
            background: "#54bcd1ff",
            color: "white",
            padding: "8px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Search Bar on top-right */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "250px",
            padding: "8px",
            marginBottom: "20px",
            border: "1px solid #e7d2d2ff",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Employee Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          background: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#8283d1ff", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>S.No</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>
              Position
            </th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((emp, index) => (
              <tr key={emp.id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {index + 1}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {emp.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {emp.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {emp.position}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #bb9a9aff",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => startEdit(emp)}
                    style={{
                      background: "#8275aea8",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    style={{
                      background: "#2c212194",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{ textAlign: "center", padding: "20px", color: "#3455" }}
              >
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
