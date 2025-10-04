// Fake API using browser localStorage
const STORAGE_KEY = "employees_data";

function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ✅ Get all employees
export async function getEmployees() {
  return loadData();
}

// ✅ Add employee
export async function addEmployee(emp) {
  const employees = loadData();
  const newEmp = { id: Date.now(), ...emp };
  employees.push(newEmp);
  saveData(employees);
  return newEmp;
}

// ✅ Update employee
export async function updateEmployee(id, updated) {
  let employees = loadData();
  employees = employees.map((e) => (e.id === id ? { ...e, ...updated } : e));
  saveData(employees);
}

// ✅ Delete employee
export async function deleteEmployee(id) {
  let employees = loadData();
  employees = employees.filter((e) => e.id !== id);
  saveData(employees);
}
