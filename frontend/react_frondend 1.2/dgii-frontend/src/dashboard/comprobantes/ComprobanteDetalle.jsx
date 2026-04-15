import { useEffect, useState } from "react";
import { getContribuyenteById } from "../../api/contribuyentesApi";

export default function ComprobanteDetalle({
  comprobante,
  onVolver,
  onEditar,
  onEliminar,
  onVerContribuyente, // <-- agregado (opcional)
}) {
  const [contribuyente, setContribuyente] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function cargarContribuyente() {
      if (!comprobante?.contribuyenteId) return;

      setIsLoading(true);
      try {
        const res = await getContribuyenteById(comprobante.contribuyenteId);
        const c = res.data;
        if (c && c.id) setContribuyente(c);
      } catch (error) {
        console.error("Error cargando contribuyente:", error);
      } finally {
        setIsLoading(false);
      }
    }

    cargarContribuyente();
  }, [comprobante]);

  return (
    <div className="card card-full detalle-card" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
      <h3>Detalle del Comprobante</h3>

      {/* SECCIÓN DATOS - 30% altura máxima, 2 columnas */}
      <div className="detalle-seccion-datos">
        <div className="detalle-grid-2col">
          <div><strong>NCF:</strong> {comprobante.ncf}</div>
          <div><strong>Fecha emisión:</strong> {new Date(comprobante.fechaEmision).toLocaleDateString()}</div>
          <div><strong>Descripción:</strong> {comprobante.descripcion}</div>
          <div><strong>Monto:</strong> ${comprobante.monto.toLocaleString()}</div>
          <div><strong>ITBIS 18%:</strong> ${comprobante.itbis18.toLocaleString()}</div>
        </div>
      </div>

      {/* SECCIÓN CONTRIBUYENTE - Ocupa espacio restante */}
      <div className="detalle-seccion-contribuyente">
        <h4>Contribuyente</h4>
        {isLoading ? (
          <div className="detalle-loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : contribuyente ? (
          <div
            className={`card contribuyente-item ${contribuyente.status === "Activo" ? "activo" : "inactivo"}`}
            style={{
              cursor: onVerContribuyente ? "pointer" : "default",
              transition: "all 0.3s ease",
            }}
            onClick={() =>
              onVerContribuyente && onVerContribuyente(contribuyente)
            }
          >
            <div style={{ flex: 1 }}>
              <h4>{contribuyente.fistName} {contribuyente.lastName}</h4>
              <p><strong>RNC:</strong> {contribuyente.rncCedula}</p>
              <p><strong>Tipo:</strong> {contribuyente.tipoContribuyenteId === 1 ? "Persona Física" : "Persona Jurídica"}</p>
              <p><strong>Email:</strong> {contribuyente.email}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <strong style={{ fontSize: "1.1rem" }}>{contribuyente.status}</strong>
            </div>
          </div>
        ) : (
          <p>No hay contribuyente disponible.</p>
        )}
      </div>

      {/* SECCIÓN ACCIONES - Fija en la parte inferior */}
      <div className="detalle-seccion-acciones">
        <div></div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="btn-danger" onClick={onEliminar}>Eliminar</button>
          <button className="btn-secondary" onClick={onEditar}>Actualizar</button>
          <button onClick={onVolver}>Volver</button>
        </div>
      </div>
    </div>
  );
}



