import React from "react";
import EmployeeList from "./components/EmployeeList.jsx";


function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <header
        style={{
          backgroundColor: "#8283d1ff",
          color: "#fff",
          padding: "20px",
          textAlign: "center",
          borderRadius: "8px",
          marginBottom: "25px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ margin: 0 }}>Employee Management</h1>
      </header>

      <main
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <EmployeeList />
      </main>
    </div>
  );
}

export default App;
