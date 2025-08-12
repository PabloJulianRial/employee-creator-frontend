import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeeCard.scss";

const EmployeeCard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="employee-card">
      <h2 className="employee-card__title">Employee Details - ID: {id}</h2>

      <div className="employee-card__field">
        <label className="employee-card__field-label">First Name</label>
        <input
          className="employee-card__field-input"
          type="text"
          value="John"
          readOnly
        />
      </div>

      <div className="employee-card__field">
        <label className="employee-card__field-label">Last Name</label>
        <input
          className="employee-card__field-input"
          type="text"
          value="Doe"
          readOnly
        />
      </div>

      <div className="employee-card__buttons">
        <button className="employee-card__buttons-save">Save</button>
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
