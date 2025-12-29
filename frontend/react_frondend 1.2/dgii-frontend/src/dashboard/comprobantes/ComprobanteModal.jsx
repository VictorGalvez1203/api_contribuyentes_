import { useEffect, useState } from "react";

export default function ComprobanteModal({ modo, data, onClose, onSave }) {
  const [form, setForm] = useState({
    ncf: "",
    fechaEmision: "",
    descripcion: "",
    monto: 0,
    itbis18: 0,
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  return (
    <div className="modal" style={{ display: "flex" }} onClick={e => e.target.className === "modal" && onClose()}>
      <div className="modal-card">
        <h3>{modo === "nuevo" ? "Nuevo Comprobante" : "Actualizar Comprobante"}</h3>

        <div className="modal-body">
          <input
            placeholder="NCF"
            value={form.ncf}
            onChange={e => setForm({ ...form, ncf: e.target.value })}
          />
          <input
            type="date"
            placeholder="Fecha Emisión"
            value={form.fechaEmision?.substring(0,10) || ""}
            onChange={e => setForm({ ...form, fechaEmision: e.target.value })}
          />
          <input
            placeholder="Descripción"
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
          />
          <input
            type="number"
            placeholder="Monto"
            value={form.monto}
            onChange={e => setForm({ ...form, monto: parseFloat(e.target.value) || 0 })}
          />
          <input
            type="number"
            placeholder="ITBIS 18%"
            value={form.itbis18}
            onChange={e => setForm({ ...form, itbis18: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-save" onClick={() => onSave(form)}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
