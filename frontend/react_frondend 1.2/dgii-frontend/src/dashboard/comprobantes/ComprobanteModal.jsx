import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { getContribuyentes } from "../../api/contribuyentesApi";

export default function ComprobanteModal({ modo, data, onClose, onSave }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    id: null,
    contribuyenteId: null,
    ncf: "",
    fechaEmision: "",
    descripcion: "",
    monto: 0
  });

  const [search, setSearch] = useState("");
  const [contribuyentes, setContribuyentes] = useState([]);
  const [contribuyenteSeleccionado, setContribuyenteSeleccionado] = useState(null);
  const [montoInput, setMontoInput] = useState("");

  /* =========================
     CARGA AL EDITAR / NUEVO
  ========================= */
  useEffect(() => {
    if (data) {
      setForm({
        id: data.id,
        contribuyenteId: data.contribuyenteId,
        ncf: data.ncf,
        fechaEmision: data.fechaEmision,
        descripcion: data.descripcion,
        monto: data.monto
      });

      // 👉 mostrar el nombre del contribuyente del comprobante
      setSearch(data.contribuyenteNombre || "");
      setContribuyenteSeleccionado({
        id: data.contribuyenteId,
        nombre: data.contribuyenteNombre
      });

      setMontoInput(String(data.monto));
    } else {
      // NUEVO
      setForm({
        id: null,
        contribuyenteId: null,
        ncf: "",
        fechaEmision: "",
        descripcion: "",
        monto: 0
      });
      setSearch("");
      setContribuyenteSeleccionado(null);
      setMontoInput("");
    }
  }, [data]);

  /* =========================
     AUTOCOMPLETE (solo al escribir)
  ========================= */
  useEffect(() => {
    async function fetch() {
      if (search.length < 1 || contribuyenteSeleccionado) {
        setContribuyentes([]);
        return;
      }

      try {
        const res = await getContribuyentes({ fistName: search });
        setContribuyentes(res.data || []);
      } catch {
        setContribuyentes([]);
      }
    }

    fetch();
  }, [search, contribuyenteSeleccionado]);

  return (
    <div
      className="modal"
      style={{ display: "flex" }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <h3>{modo === "nuevo" ? "Nuevo Comprobante" : "Actualizar Comprobante"}</h3>

        <div className="modal-body">

          {/* =========================
              CONTRIBUYENTE
          ========================= */}
          <div className="autocomplete-wrapper">
            <input
              placeholder="Buscar contribuyente..."
              value={search}
              onFocus={() => {
                // si quiere cambiar, borra el actual
                if (contribuyenteSeleccionado) {
                  setContribuyenteSeleccionado(null);
                  setForm(prev => ({ ...prev, contribuyenteId: null }));
                  setSearch("");
                }
              }}
              onChange={e => setSearch(e.target.value)}
              autoComplete="off"
            />

            {contribuyentes.length > 0 && (
              <ul className="autocomplete">
                {contribuyentes.map(c => (
                  <li
                    key={c.id}
                    onClick={() => {
                      const nombre = `${c.fistName} ${c.lastName}`;
                      setContribuyenteSeleccionado({ id: c.id, nombre });
                      setSearch(nombre);
                      setForm(prev => ({ ...prev, contribuyenteId: c.id }));
                      setContribuyentes([]);
                    }}
                  >
                    {c.fistName} {c.lastName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            placeholder="NCF"
            value={form.ncf}
            onChange={e => setForm({ ...form, ncf: e.target.value })}
          />

          <input
            type="date"
            value={form.fechaEmision?.substring(0, 10) || ""}
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
            value={montoInput}
            onFocus={() => montoInput === "0" && setMontoInput("")}
            onChange={e => {
              setMontoInput(e.target.value);
              setForm(prev => ({
                ...prev,
                monto: e.target.value === "" ? 0 : Number(e.target.value)
              }));
            }}
          />
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-save"
            onClick={() => {
              if (!form.contribuyenteId) {
                showToast("error", "Debe seleccionar un contribuyente");
                return;
              }
              onSave(form);
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}


