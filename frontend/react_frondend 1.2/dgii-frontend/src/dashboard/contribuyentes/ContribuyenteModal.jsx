import { useEffect, useState } from "react";

export default function ContribuyenteModal({ modo, data, onClose, onSave }) {
  const [form, setForm] = useState({
    fistName: "",
    lastName: "",
    rncCedula: "",
    tipoContribuyenteId: 1,
    status: "Activo",
    numberphone: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  return (
    <div className="modal" style={{ display: "flex" }} onClick={e => e.target.className === "modal" && onClose()}>
      <div className="modal-card">
        <h3>{modo === "nuevo" ? "Nuevo Contribuyente" : "Actualizar Contribuyente"}</h3>

        <div className="modal-body">
          {["fistName","lastName","rncCedula","numberphone","email","address"].map(f => (
            <input
              key={f}
              placeholder={f}
              value={form[f] || ""}
              onChange={e => setForm({ ...form, [f]: e.target.value })}
            />
          ))}

          <select
            value={form.tipoContribuyenteId}
            onChange={e => setForm({ ...form, tipoContribuyenteId: Number(e.target.value) })}
          >
            <option value={1}>Persona Física</option>
            <option value={2}>Persona Jurídica</option>
          </select>

          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-save" onClick={() => onSave(form)}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

