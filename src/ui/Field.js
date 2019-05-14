import React from "react";

export default function Field({
  datatype,
  variable_name,
  label,
  required,
  value,
  setField
}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        className="form-control"
        value={value || ""}
        type={datatype}
        onChange={e => setField({ [variable_name]: e.target.value })}
      />
    </div>
  );
}
