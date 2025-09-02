import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeCard.scss";
import ContractsList from "../contractsList/ContractsList";
import AddContractForm from "../addContractForm/AddContractForm";

interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string | null;
  address?: string | null;
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
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showContracts, setShowContracts] = useState(false);
  const [showAddContract, setShowAddContract] = useState(false);
  const [contractsVersion, setContractsVersion] = useState(0);

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
  }) => {
    if (!emp.firstName) return "First name is required.";
    if (!emp.lastName) return "Last name is required.";
    if (!emp.email) return "Email is required.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emp.email))
      return "Please enter a valid email.";

    return "";
  };

  const handleSave = async () => {
    const msg = validate(employee);
    if (msg) {
      alert(msg);
      return;
    }

    const payload = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      mobileNumber: employee.mobileNumber || null,
      address: employee.address || null,
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
          {
            headers: { "Content-Type": "application/json" },
          }
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

  const handleDelete = async () => {
    const ok = window.confirm("Delete this employee? ");
    if (!ok) return;

    await axios.delete(`http://localhost:9000/employees/${employee.id}`);
    navigate("/");
  };

  if (loading) return <div className="employee-card__title">Loading…</div>;
  if (error) return <div className="employee-card__title">Error: {error}</div>;

  return (
    <div className="employee-card">
      <h2 className="employee-card__title" data-testid="employee-form-title">
        {id === "new"
          ? "Add New Employee"
          : `Edit Employee - ID: ${employee.id}`}
      </h2>

      <div className="employee-card__field">
        <label className="employee-card__field-label">First Name</label>
        <input
          className="employee-card__field-input"
          data-testid="firstName"
          type="text"
          value={employee.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Last Name</label>
        <input
          className="employee-card__field-input"
          data-testid="lastName"
          type="text"
          value={employee.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Email</label>
        <input
          className="employee-card__field-input"
          data-testid="email"
          type="email"
          value={employee.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Mobile Number</label>
        <input
          className="employee-card__field-input"
          data-testid="mobileNumber"
          type="text"
          value={employee.mobileNumber || ""}
          onChange={(e) => handleChange("mobileNumber", e.target.value)}
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Address</label>
        <input
          className="employee-card__field-input"
          data-testid="address"
          type="text"
          value={employee.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>

      <div className="employee-card__buttons">
        <button
          className="employee-card__buttons-save"
          data-testid="save-employee"
          onClick={handleSave}
        >
          Save
        </button>

        {id !== "new" && (
          <button
            className="employee-card__buttons-delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}

        <button
          className="employee-card__buttons-cancel"
          data-testid="cancel"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>

        {employee.id && (
          <button
            className="employee-card__buttons-save"
            data-testid="toggle-contracts"
            onClick={() => setShowContracts((prev) => !prev)}
          >
            {showContracts ? "Hide Contracts" : "View Contracts"}
          </button>
        )}

        {employee.id && (
          <button
            className="employee-card__buttons-save"
            data-testid="add-contract"
            onClick={() => {
              setShowContracts(true);
              setShowAddContract(true);
            }}
          >
            + Add Contract
          </button>
        )}
      </div>

      {showContracts && employee.id && (
        <section
          className="employee-card__section employee-card__contracts"
          data-testid="contracts-section"
        >
          <h3 className="employee-card__subtitle">Contracts</h3>

          <ContractsList key={contractsVersion} employeeId={employee.id} />

          {showAddContract && (
            <div className="employee-card__add-contract">
              <AddContractForm
                employeeId={employee.id}
                onCreated={() => {
                  setShowAddContract(false);
                  setContractsVersion((n) => n + 1);
                }}
                onCancel={() => setShowAddContract(false)}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default EmployeeCard;
