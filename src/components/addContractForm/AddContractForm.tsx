import { useState } from "react";
import axios from "axios";
import "./AddContractForm.scss";

interface Props {
  employeeId: number;
  onCreated: () => void;
  onCancel: () => void;
}

const AddContractForm = ({ employeeId, onCreated, onCancel }: Props) => {
  const [contractStart, setContractStart] = useState("");
  const [contractEnd, setContractEnd] = useState("");
  const [contractType, setContractType] = useState("permanent");
  const [contractTime, setContractTime] = useState("full_time");
  const [hoursPerWeek, setHoursPerWeek] = useState<number | "">("");
  const [salary, setSalary] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractStart) {
      setErr("Contract start date is required.");
      return;
    }
    try {
      setLoading(true);
      setErr(null);

      await axios.post(
        `http://localhost:9000/employees/${employeeId}/contracts`,
        {
          contractStart,
          contractEnd: contractEnd || null,
          contractType,
          contractTime,
          hoursPerWeek: hoursPerWeek === "" ? null : hoursPerWeek,
          salary: salary === "" ? null : salary,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      onCreated();
    } catch (e: any) {
      setErr(
        e?.response?.data?.error ||
          e?.response?.data?.message ||
          e.message ||
          "Failed to create contract"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contract-form" onSubmit={handleSubmit}>
      <h5 className="contract-form__title">Add Contract</h5>
      {err && <div className="contract-form__error">{err}</div>}

      <label className="contract-form__label">Contract Type</label>
      <select
        value={contractType}
        onChange={(e) => setContractType(e.target.value)}
        className="contract-form__input"
      >
        <option value="permanent">Permanent</option>
        <option value="contract">Contract</option>
      </select>

      <label className="contract-form__label">Contract Time</label>
      <select
        value={contractTime}
        onChange={(e) => setContractTime(e.target.value)}
        className="contract-form__input"
      >
        <option value="full_time">Full-time</option>
        <option value="part_time">Part-time</option>
      </select>

      <label className="contract-form__label">Start Date</label>
      <input
        type="date"
        value={contractStart}
        onChange={(e) => setContractStart(e.target.value)}
        className="contract-form__input"
        required
      />

      {contractType === "contract" && (
        <>
          <label className="contract-form__label">End Date</label>
          <input
            type="date"
            value={contractEnd}
            onChange={(e) => setContractEnd(e.target.value)}
            className="contract-form__input"
          />
        </>
      )}

      <label className="contract-form__label">Hours per Week</label>
      <input
        type="number"
        value={hoursPerWeek}
        onChange={(e) =>
          setHoursPerWeek(e.target.value ? Number(e.target.value) : "")
        }
        className="contract-form__input"
        min={1}
        max={80}
      />

      <label className="contract-form__label">Salary (€)</label>
      <input
        type="number"
        value={salary}
        onChange={(e) =>
          setSalary(e.target.value ? Number(e.target.value) : "")
        }
        className="contract-form__input"
      />

      <div className="contract-form__actions">
        <button
          type="submit"
          className="contract-form__save-btn"
          disabled={loading}
        >
          Save
        </button>
        <button
          type="button"
          className="contract-form__cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddContractForm;
