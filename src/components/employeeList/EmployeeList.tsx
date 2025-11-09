import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeList.scss";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contractType: string;
  contractStart: string;
  contractEnd?: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";

  useEffect(() => {
    axios
      .get<Employee[]>(`${API}/employees`)
      .then((res) => setEmployees(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    console.log("API base URL:", API);
  }, []);

  if (loading) return <div className="employee-list__status">Loading…</div>;
  if (error) return <div className="employee-list__status">Error: {error}</div>;

  return (
    <div>
      <div className="employee-list__toolbar" data-testid="employees-toolbar">
        <button
          className="employee-list__add-btn"
          data-testid="add-employee"
          onClick={() => navigate("/employees/new")}
        >
          + Add New Employee
        </button>
      </div>

      <ul className="employee-list" data-testid="employees-list">
        {employees.map((emp) => (
          <li
            key={emp.id}
            className="employee-list__item"
            data-testid="employee-row"
          >
            <div className="employee-list__name">
              {emp.firstName} {emp.lastName}
            </div>
            <div className="employee-list__email">{emp.email}</div>
            <div className="employee-list__contract">
              {emp.contractType === "permanent"
                ? "Permanent"
                : `Contract (until ${emp.contractEnd?.slice(0, 10)})`}
            </div>
            <button
              className="employee-list__button"
              data-testid="view-edit"
              onClick={() => navigate(`/employees/${emp.id}`)}
            >
              View / Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
