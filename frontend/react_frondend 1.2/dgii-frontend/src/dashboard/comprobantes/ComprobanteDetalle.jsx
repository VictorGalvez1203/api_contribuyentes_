import { useEffect, useState } from "react";
import { getContribuyenteById } from "../../api/contribuyentesApi";

export default function ComprobanteDetalle({ comprobante, onVolver, onEditar, onEliminar }) {
  const [contribuyente, setContribuyente] = useState(null);

  useEffect(() => {
    async function cargarContribuyente() {
      if (!comprobante?.contribuyenteId) return;

      try {
        // Llamada al API para obtener el contribuyente por ID
        const res = await getContribuyenteById(comprobante.contribuyenteId);

        // Extraemos el objeto real
        const c = res.data; 

        if (c && c.id) setContribuyente(c);
      } catch (error) {
        console.error("Error cargando contribuyente:", error);
      }
    }

    cargarContribuyente();
  }, [comprobante]);

  return (
    <div className="card card-full" style={{ position: "relative" }}>
      <h3>Detalle del Comprobante</h3>

      <div className="detalle-grid">
        <div><strong>NCF:</strong> {comprobante.ncf}</div>
        <div><strong>Fecha emisión:</strong> {new Date(comprobante.fechaEmision).toLocaleDateString()}</div>
        <div><strong>Descripción:</strong> {comprobante.descripcion}</div>
        <div><strong>Monto:</strong> ${comprobante.monto.toLocaleString()}</div>
        <div><strong>ITBIS 18%:</strong> ${comprobante.itbis18.toLocaleString()}</div>
      </div>

      {/* =========================
          CARTA DEL CONTRIBUYENTE
      ========================= */}
      {contribuyente && (
        <div
          className={`card card-full card contribuyente-item ${contribuyente.status === "Activo" ? "activo" : "inactivo"}`}
          style={{ marginTop: "1.5rem", padding: "1rem" }}
        >
          <div>
            <h4>{contribuyente.fistName} {contribuyente.lastName}</h4>
            <p><strong>RNC:</strong> {contribuyente.rncCedula}</p>
          </div>
          <strong>{contribuyente.status}</strong>
        </div>
      )}

      <div
        className="acciones"
        style={{
          marginTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button className="btn-danger" onClick={onEliminar}>Eliminar</button>
        <button className="btn-secondary" onClick={onEditar}>Actualizar</button>
        <button onClick={onVolver}>Volver</button>
      </div>
    </div>
  );
}


