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

const API = import.meta.env.VITE_API_BASE_URL;

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get<Employee[]>("${API}/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="employee-list__status">Loading…</div>;
  if (error) return <div className="employee-list__status">Error: {error}</div>;

  return (
    <div>
      <div className="employee-list__toolbar">
        <button
          className="employee-list__add-btn"
          onClick={() => navigate("/employees/new")}
        >
          + Add New Employee
        </button>
      </div>
      <ul className="employee-list">
        {employees.map((emp) => (
          <li key={emp.id} className="employee-list__item">
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
