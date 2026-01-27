import { useEffect, useState, useRef } from "react";
import { getComprobantes } from "../../api/comprobantesApi";

export default function ContribuyenteDetalle({ contribuyente, onVolver, onEditar, onEliminar, onVerComprobante }) {
  const [comprobantes, setComprobantes] = useState([]);
  const [pageComprobantes, setPageComprobantes] = useState(1);
  const [pageSizeComprobantes, setPageSizeComprobantes] = useState(3);
  const [totalRecordsComprobantes, setTotalRecordsComprobantes] = useState(0);
  const [totalPagesComprobantes, setTotalPagesComprobantes] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const listaRef = useRef(null);

  useEffect(() => {
    async function cargarComprobantes() {
      setIsLoading(true);
      try {
        const params = {
          ContribuyenteId: contribuyente.id,
          PageNumber: pageComprobantes,
          PageSize: pageSizeComprobantes,
        };
        const res = await getComprobantes(params);
        setComprobantes(res.data || []);
        setPageComprobantes(res.pageNumber);
        setPageSizeComprobantes(res.pageSize);
        setTotalRecordsComprobantes(res.totalRecords);
        setTotalPagesComprobantes(res.totalPages);
      } catch (error) {
        console.error("Error cargando comprobantes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (contribuyente?.id) {
      cargarComprobantes();
    }
  }, [contribuyente, pageComprobantes, pageSizeComprobantes]);

  // Calcular el rango mostrado en paginación
  const desde = (pageComprobantes - 1) * pageSizeComprobantes + 1;
  const hasta = Math.min(pageComprobantes * pageSizeComprobantes, totalRecordsComprobantes);

  return (
    <div className="card card-full detalle-card" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
      <h3>Detalle del Contribuyente</h3>

      {/* SECCIÓN DATOS - 30% altura máxima, 2 columnas */}
      <div className="detalle-seccion-datos">
        <div className="detalle-grid-2col">
          <div><strong>Nombre:</strong> {contribuyente.fistName} {contribuyente.lastName}</div>
          <div><strong>RNC:</strong> {contribuyente.rncCedula}</div>
          <div><strong>Tipo:</strong> {contribuyente.tipoContribuyenteId === 1 ? "Persona Física" : "Persona Jurídica"}</div>
          <div><strong>Estado:</strong> {contribuyente.status}</div>
          <div><strong>Teléfono:</strong> {contribuyente.numberphone}</div>
          <div><strong>Email:</strong> {contribuyente.email}</div>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <strong>Dirección:</strong> {contribuyente.address}
        </div>
      </div>

      {/* SECCIÓN COMPROBANTES - Ocupa espacio restante */}
      <div className="detalle-seccion-comprobantes">
        <h4>Comprobantes</h4>
        <div
          id="listaComprobantes"
          ref={listaRef}
          className="listaComprobantes-detalle"
        >
          {isLoading ? (
            <div className="detalle-loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : comprobantes.length === 0 ? (
            <p>No hay comprobantes para este contribuyente.</p>
          ) : (
            comprobantes.map((c, index) => (
              <div
                key={`${pageComprobantes}-${c.id}`}
                className="card contribuyente-item"
                style={{ cursor: "pointer" }}
                onClick={() => onVerComprobante && onVerComprobante(c)}
              >
                <div>
                  <h4>#{(pageComprobantes - 1) * pageSizeComprobantes + index + 1} - {c.ncf}</h4>
                  <p><strong>Fecha emisión:</strong> {new Date(c.fechaEmision).toLocaleDateString()}</p>
                  <p><strong>Descripción:</strong> {c.descripcion}</p>
                </div>
                <div>
                  <p><strong>Monto:</strong> ${c.monto.toLocaleString()}</p>
                  <p><strong>ITBIS 18%:</strong> ${c.itbis18.toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECCIÓN ACCIONES Y PAGINACIÓN - Fija en la parte inferior */}
      <div className="detalle-seccion-acciones">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
          <span className="paginacion-info">
            Mostrando {desde} – {hasta} de {totalRecordsComprobantes}
          </span>

          <div className="paginacion-botones" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button
              onClick={() => setPageComprobantes(p => Math.max(1, p - 1))}
              disabled={pageComprobantes === 1}
            >
              ◀ Anterior
            </button>

            <strong>{pageComprobantes} / {totalPagesComprobantes}</strong>

            <button
              onClick={() => setPageComprobantes(p => Math.min(totalPagesComprobantes, p + 1))}
              disabled={pageComprobantes === totalPagesComprobantes}
            >
              Siguiente ▶
            </button>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="btn-danger" onClick={onEliminar}>Eliminar</button>
          <button className="btn-secondary" onClick={onEditar}>Actualizar</button>
          <button onClick={onVolver}>Volver</button>
        </div>
      </div>
    </div>
  );
}




