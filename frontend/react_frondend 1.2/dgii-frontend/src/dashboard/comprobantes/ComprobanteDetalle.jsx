export default function ComprobanteDetalle({ comprobante, onVolver, onEditar, onEliminar }) {
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
