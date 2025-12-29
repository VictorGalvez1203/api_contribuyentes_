import { useEffect, useState, useRef } from "react";
import ComprobanteDetalle from "./ComprobanteDetalle";
import ComprobanteModal from "./ComprobanteModal";
import {
  getComprobantes,
  createComprobante,
  updateComprobante,
  deleteComprobante,
} from "../../api/comprobantesApi";

import { getContribuyentes } from "../../api/contribuyentesApi";

export default function Comprobantes() {
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    ncf: "",
    FechaEmision: "",
    ContribuyenteId: null,
  });

  const [searchContribuyente, setSearchContribuyente] = useState("");
  const [contribuyentes, setContribuyentes] = useState([]);
  const [seleccionadoContribuyente, setSeleccionadoContribuyente] = useState(null);

  const [seleccionado, setSeleccionado] = useState(null);
  const [modal, setModal] = useState({ open: false, modo: "editar" });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const listaRef = useRef(null);

  function handleFilterChange(field, value) {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPage(1);
  }

  useEffect(() => {
    async function fetchContribuyentes() {
      if (searchContribuyente.length < 1) {
        setContribuyentes([]);
        return;
      }
      try {
        const res = await getContribuyentes({ fistName: searchContribuyente });
        setContribuyentes(res.data || []);
      } catch (error) {
        console.error("Error buscando contribuyentes:", error);
        setContribuyentes([]);
      }
    }
    fetchContribuyentes();
  }, [searchContribuyente]);

  async function cargar() {
    const params = {
      PageNumber: page,
      PageSize: pageSize,
      ...filters,
    };

    // Elimina filtros vacíos o nulos
    Object.keys(params).forEach(
      key => (params[key] === "" || params[key] == null) && delete params[key]
    );

    const res = await getComprobantes(params);

    setData(res.data || []);
    setPage(res.pageNumber);
    setPageSize(res.pageSize);
    setTotalRecords(res.totalRecords);
    setTotalPages(res.totalPages);

    setTimeout(() => {
      listaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  useEffect(() => {
    cargar();
  }, [page, pageSize, filters]);

  async function handleEliminarComprobante(id) {
    if (!window.confirm("¿Seguro que desea eliminar?")) return;

    try {
      await deleteComprobante(id);
      alert("Comprobante eliminado con éxito.");
      setData(prev => prev.filter(x => x.id !== id));
      setSeleccionado(null);
      await cargar();
    } catch (error) {
      alert("Error eliminando comprobante: " + (error.message || "Error desconocido"));
      console.error(error.response?.data || error);
    }
  }

  function onSelectContribuyente(contrib) {
    setSeleccionadoContribuyente(contrib);
    setSearchContribuyente(contrib.fistName + " " + contrib.lastName);
    setFilters(prev => ({ ...prev, ContribuyenteId: contrib.id }));
    setContribuyentes([]);
    setPage(1);
  }

  function onClearContribuyente() {
    setSeleccionadoContribuyente(null);
    setSearchContribuyente("");
    setFilters(prev => ({ ...prev, ContribuyenteId: null }));
    setContribuyentes([]);
    setPage(1);
  }

  return (
    <>
      {!seleccionado && (
        <div className="card card-full contribuyentes-panel">
          <h3>Comprobantes</h3>

          <div
            className="contribuyentes-toolbar"
            style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
          >
            <input
              placeholder="NCF"
              value={filters.ncf}
              onChange={(e) => handleFilterChange("ncf", e.target.value)}
              disabled={modal.open}
              style={{ flex: "1 1 150px" }}
            />

            {/* Input tipo fecha para FechaEmision */}
            <input
              type="date"
              placeholder="Fecha emisión"
              value={filters.FechaEmision}
              onChange={(e) => handleFilterChange("FechaEmision", e.target.value)}
              disabled={modal.open}
              style={{ flex: "1 1 150px" }}
            />

            {/* Filtro contribuyente con autocompletado */}
            <div style={{ position: "relative", flex: "2 1 300px" }}>
              <input
                placeholder="Buscar contribuyente..."
                value={searchContribuyente}
                onChange={(e) => {
                  setSearchContribuyente(e.target.value);
                  setSeleccionadoContribuyente(null);
                  setFilters(prev => ({ ...prev, ContribuyenteId: null }));
                }}
                disabled={modal.open}
                style={{ width: "100%" }}
                autoComplete="off"
              />
              {seleccionadoContribuyente && (
                <button
                  onClick={onClearContribuyente}
                  style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#666",
                  }}
                  title="Limpiar"
                  type="button"
                >
                  ×
                </button>
              )}
              {contribuyentes.length > 0 && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    maxHeight: 180,
                    overflowY: "auto",
                    zIndex: 10,
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    borderRadius: 4,
                  }}
                >
                  {contribuyentes.map((c) => (
                    <li
                      key={c.id}
                      onClick={() => onSelectContribuyente(c)}
                      style={{
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {c.fistName} {c.lastName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => setModal({ open: true, modo: "nuevo" })}
              disabled={modal.open}
            >
              + Agregar
            </button>
          </div>

          <div
            id="listaComprobantes"
            ref={listaRef}
            className="contribuyentes-lista"
            style={{ marginTop: "1rem" }}
          >
            {data.length === 0 && <p>No hay comprobantes.</p>}
            {data.map((c) => (
              <div
                key={c.id}
                className="card contribuyente-item"
                style={{ cursor: "pointer" }}
                onClick={() => setSeleccionado(c)}
              >
                <div>
                  <h4>{c.ncf}</h4>
                  <p>
                    <strong>Fecha emisión:</strong>{" "}
                    {new Date(c.fechaEmision).toLocaleDateString()}
                  </p>
                </div>
                <strong>${c.monto.toLocaleString()}</strong>
              </div>
            ))}
          </div>

          <div className="contribuyentes-footer" style={{ marginTop: "1rem" }}>
            <span>
              Mostrando {(page - 1) * pageSize + 1} –{" "}
              {Math.min(page * pageSize, totalRecords)} de {totalRecords}
            </span>

            <div className="paginacion" style={{ marginTop: "0.5rem" }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ◀ Anterior
              </button>

              <strong>
                {page} / {totalPages}
              </strong>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Siguiente ▶
              </button>
            </div>
          </div>
        </div>
      )}

      {seleccionado && (
        <ComprobanteDetalle
          comprobante={seleccionado}
          onVolver={() => setSeleccionado(null)}
          onEditar={() => setModal({ open: true, modo: "editar" })}
          onEliminar={() => handleEliminarComprobante(seleccionado.id)}
        />
      )}

      {modal.open && (
        <ComprobanteModal
          modo={modal.modo}
          data={modal.modo === "editar" ? seleccionado : null}
          onClose={() => setModal({ open: false })}
          onSave={async (nuevo) => {
            try {
              if (modal.modo === "nuevo") {
                await createComprobante(nuevo);
                alert("Comprobante creado con éxito.");
              } else {
                await updateComprobante(nuevo.id, nuevo);
                alert("Comprobante actualizado con éxito.");
              }
              setModal({ open: false });
              await cargar();
              if (modal.modo === "editar") setSeleccionado(null);
            } catch (error) {
              const apiErrors = error.response?.data?.Errors;
              if (apiErrors && Array.isArray(apiErrors) && apiErrors.length > 0) {
                alert("Errores de validación:\n" + apiErrors.join("\n"));
              } else {
                alert(
                  "Error guardando comprobante: " +
                    (error.message || "Error desconocido")
                );
              }
              console.error(error.response?.data || error);
            }
          }}
        />
      )}
    </>
  );
}




