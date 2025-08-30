import { useEffect, useState } from "react";
import axios from "axios";
import "./ContractsCard.scss";
import AddContractForm from "../addContractForm/addContractForm";

interface Contract {
  id: number;
  employeeId: number;
  contractType?: string;
  contractTime?: string;
  contractStart: string;
  contractEnd?: string | null;
  hoursPerWeek?: number | null;
  salary?: number | null;
}

interface Props {
  contractId: number;
  employeeId: number;
  onClose: () => void;
  onCreated: () => void;
}

const ContractsCard = ({
  contractId,
  employeeId,
  onClose,
  onCreated,
}: Props) => {
  const [data, setData] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    axios
      .get<Contract>(
        `http://localhost:9000/employees/${employeeId}/contracts/${contractId}`
      )
      .then((res) => setData(res.data))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [employeeId, contractId]);

  if (loading) return <div className="contract-card__status">Loading…</div>;
  if (err || !data)
    return (
      <div className="contract-card__status">Error: {err || "Not found"}</div>
    );

  return (
    <div className="contract-card">
      <div className="contract-card__header">
        <h4 className="contract-card__title" aria-live="polite">
          {new Date(data.contractStart).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </h4>
        <button
          className="contract-card__close"
          onClick={onClose}
          aria-label="Close and return to contracts list"
        >
          ×
        </button>
      </div>

      <div className="contract-card__grid">
        <div className="contract-card__field">
          <div className="contract-card__label">Type</div>
          <div className="contract-card__value">{data.contractType || "—"}</div>
        </div>
        <div className="contract-card__field">
          <div className="contract-card__label">Time</div>
          <div className="contract-card__value">{data.contractTime || "—"}</div>
        </div>
        <div className="contract-card__field">
          <div className="contract-card__label">End</div>
          <div className="contract-card__value">{data.contractEnd || "—"}</div>
        </div>
        <div className="contract-card__field">
          <div className="contract-card__label">Hours / Week</div>
          <div className="contract-card__value">
            {typeof data.hoursPerWeek === "number" ? data.hoursPerWeek : "—"}
          </div>
        </div>
        <div className="contract-card__field">
          <div className="contract-card__label">Salary</div>
          <div className="contract-card__value">
            {typeof data.salary === "number"
              ? `€${data.salary.toLocaleString()}`
              : "—"}
          </div>
        </div>
      </div>

      <div className="contract-card__actions">
        <button
          className="contract-card__back-btn"
          type="button"
          onClick={onClose}
        >
          ← Back to list
        </button>
        <button
          className="contract-card__add-btn"
          type="button"
          onClick={() => setShowForm(true)}
        >
          + Add Contract
        </button>
      </div>

      {showForm && (
        <div className="contract-card__add-contract">
          <AddContractForm
            employeeId={employeeId}
            onCreated={onCreated}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ContractsCard;
