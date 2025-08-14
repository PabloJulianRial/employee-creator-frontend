import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeCard.scss";

interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string | null;
  address?: string | null;
  contractType: "permanent" | "contract";
  contractTime: string;
  contractStart: string;
  contractEnd?: string | null;
  hoursPerWeek: number;
}

const EmployeeCard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    contractType: "permanent",
    contractTime: "full-time",
    contractStart: new Date().toISOString().slice(0, 10),
    contractEnd: null,
    hoursPerWeek: 40,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === "new") {
      setLoading(false);
      return;
    }

    axios
      .get<Employee>(`http://localhost:9000/employees/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field: keyof Employee, value: string | number) => {
    setEmployee((prev) => ({ ...prev, [field]: value }));
  };
  const validate = (emp: {
    firstName: string;
    lastName: string;
    email: string;
    contractType: string;
    contractStart: string;
    contractEnd?: string | null;
    hoursPerWeek: number;
  }) => {
    if (!emp.firstName) return "First name is required.";
    if (!emp.lastName) return "Last name is required.";
    if (!emp.email) return "Email is required.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emp.email))
      return "Please enter a valid email.";

    if (!emp.contractStart) return "Contract start date is required.";

    if (emp.contractType === "contract") {
      if (!emp.contractEnd)
        return "Contract end date is required for contract type.";

      if (emp.contractEnd <= emp.contractStart)
        return "End date must be after start date.";
    }

    if (emp.hoursPerWeek < 1 || emp.hoursPerWeek > 80) {
      return "Hours per week should be between 1 and 80.";
    }

    return "";
  };

  const handleSave = async () => {
    const msg = validate(employee);
    if (msg) {
      alert(msg);
      return;
    }

    const nowIso = new Date().toISOString();

    const payload = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      mobileNumber: employee.mobileNumber || null,
      address: employee.address || null,
      contractType: employee.contractType,
      contractTime: employee.contractTime,
      contractStart: employee.contractStart,
      contractEnd:
        employee.contractType === "contract" && employee.contractEnd
          ? employee.contractEnd
          : null,
      hoursPerWeek: employee.hoursPerWeek,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    try {
      if (id === "new") {
        await axios.post("http://localhost:9000/employees", payload, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await axios.patch(
          `http://localhost:9000/employees/${employee.id}`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      }
      navigate("/");
    } catch (err: any) {
      const data = err?.response?.data;
      const status = err?.response?.status;
      const serverMsg =
        typeof data === "string"
          ? data
          : data?.message || data?.error || JSON.stringify(data);
      alert(`Error ${status || ""}: ${serverMsg || err.message}`);
      console.error("Save failed:", { status, serverMsg, payload });
    }
  };

  if (loading) return <div className="employee-card__title">Loading…</div>;
  if (error) return <div className="employee-card__title">Error: {error}</div>;

  return (
    <div className="employee-card">
      <h2 className="employee-card__title">
        {id === "new"
          ? "Add New Employee"
          : `Edit Employee - ID: ${employee.id}`}
      </h2>

      <div className="employee-card__field">
        <label className="employee-card__field-label">First Name</label>
        <input
          className="employee-card__field-input"
          type="text"
          value={employee.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Last Name</label>
        <input
          className="employee-card__field-input"
          type="text"
          value={employee.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Email</label>
        <input
          className="employee-card__field-input"
          type="email"
          value={employee.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Mobile Number</label>
        <input
          className="employee-card__field-input"
          type="text"
          value={employee.mobileNumber || ""}
          onChange={(e) => handleChange("mobileNumber", e.target.value)}
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Address</label>
        <input
          className="employee-card__field-input"
          type="text"
          value={employee.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Contract Type</label>
        <select
          className="employee-card__field-select"
          value={employee.contractType}
          onChange={(e) => handleChange("contractType", e.target.value)}
        >
          <option value="permanent">Permanent</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Contract Time</label>
        <select
          className="employee-card__field-select"
          value={employee.contractTime}
          onChange={(e) => handleChange("contractTime", e.target.value)}
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </select>
      </div>

      {employee.contractType === "contract" && (
        <div className="employee-card__field">
          <label className="employee-card__field-label">
            Contract End Date
          </label>
          <input
            className="employee-card__field-input"
            type="date"
            value={employee.contractEnd || ""}
            onChange={(e) => handleChange("contractEnd", e.target.value)}
          />
        </div>
      )}
      <div className="employee-card__field">
        <label className="employee-card__field-label">
          Contract Start Date
        </label>
        <input
          className="employee-card__field-input"
          type="date"
          value={employee.contractStart}
          onChange={(e) => handleChange("contractStart", e.target.value)}
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Hours per Week</label>
        <input
          className="employee-card__field-input"
          type="number"
          value={employee.hoursPerWeek}
          onChange={(e) => handleChange("hoursPerWeek", Number(e.target.value))}
        />
      </div>

      <div className="employee-card__buttons">
        <button className="employee-card__buttons-save" onClick={handleSave}>
          Save
        </button>
        <button
          className="employee-card__buttons-cancel"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
