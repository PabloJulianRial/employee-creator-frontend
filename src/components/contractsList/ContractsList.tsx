import { useEffect, useState } from "react";
import axios from "axios";
import "./ContractsList.scss";
import ContractsCard from "../contractsCard/ContractsCard";

interface Contract {
  id: number;
  employeeId: number;
  contractStart: string;
}

interface Props {
  employeeId: number;
}

const ContractsList = ({ employeeId }: Props) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get<Contract[]>(
        `http://localhost:9000/employees/${employeeId}/contracts`
      )
      .then((res) => setContracts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [employeeId]);

  if (loading)
    return <div className="contracts-list__status">Loading contracts…</div>;
  if (error)
    return <div className="contracts-list__status">Error: {error}</div>;

  if (activeId !== null) {
    return (
      <div className="contracts-list__card">
        <ContractsCard
          contractId={activeId}
          employeeId={employeeId}
          onClose={() => setActiveId(null)}
          onCreated={async () => {
            setLoading(true);
            setError(null);
            try {
              const res = await axios.get<Contract[]>(
                `http://localhost:9000/employees/${employeeId}/contracts`
              );
              setContracts(res.data);
            } catch (e: any) {
              setError(e.message);
            } finally {
              setLoading(false);
              setActiveId(null);
            }
          }}
          onDeleted={async () => {
            try {
              const res = await axios.get<Contract[]>(
                `http://localhost:9000/employees/${employeeId}/contracts`
              );
              setContracts(res.data);
            } catch (e: any) {
              setError(e.message);
            } finally {
              setActiveId(null);
            }
          }}
        />
      </div>
    );
  }

  if (!contracts.length) {
    return <div className="contracts-list__empty">No contracts yet.</div>;
  }

  return (
    <ul className="contracts-list">
      {[...contracts]
        .sort(
          (a, b) =>
            new Date(b.contractStart).getTime() -
            new Date(a.contractStart).getTime()
        )
        .map((c) => (
          <li
            key={c.id}
            className="contracts-list__row"
            onClick={() => setActiveId(c.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" ? setActiveId(c.id) : undefined
            }
            aria-label={`Open contract starting ${c.contractStart}`}
          >
            <span className="contracts-list__start">
              {new Date(c.contractStart).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default ContractsList;
