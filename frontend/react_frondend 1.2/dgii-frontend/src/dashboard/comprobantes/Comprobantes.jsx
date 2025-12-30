import { useEffect, useState, useRef } from "react";
import ComprobanteDetalle from "./ComprobanteDetalle";
import ComprobanteModal from "./ComprobanteModal";
import ContribuyenteDetalle from "../contribuyentes/ContribuyenteDetalle"; // ✅ NUEVO
import ContribuyenteModal from "../contribuyentes/ContribuyenteModal";
import {
  getComprobantes,
  createComprobante,
  updateComprobante,
  deleteComprobante,
} from "../../api/comprobantesApi";

import { 
  getContribuyentes,
  deleteContribuyente,
  updateContribuyente 
} from "../../api/contribuyentesApi";

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

  const [seleccionado, setSeleccionado] = useState(null); // comprobante
  const [selectedContribuyente, setSelectedContribuyente] = useState(null); // ✅ NUEVO

  const [modal, setModal] = useState({ open: false, modo: "editar", tipo: null });
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
    const params = { PageNumber: page, PageSize: pageSize, ...filters };
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

  useEffect(() => { cargar(); }, [page, pageSize, filters]);

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

  // ✅ NUEVO: ver contribuyente desde el detalle
  const handleVerContribuyente = (contrib) => {
    setSelectedContribuyente(contrib);
  };

 async function handleEliminarContribuyente(id) {
  if (!window.confirm("¿Seguro que desea eliminar este contribuyente?")) return;

  try {
    await deleteContribuyente(id);
    alert("Contribuyente eliminado con éxito.");

    // 1️⃣ cerrar vista de contribuyente
    setSelectedContribuyente(null);

    // 2️⃣ limpiar búsqueda y filtro
    setSeleccionadoContribuyente(null);
    setSearchContribuyente("");
    setFilters(prev => ({ ...prev, ContribuyenteId: null }));

    // 3️⃣ volver a la lista de comprobantes
    setSeleccionado(null);
    setPage(1);

    // 4️⃣ recargar comprobantes
    await cargar();
  } catch (error) {
    alert(
      "Error eliminando contribuyente: " +
      (error.message || "Error desconocido")
    );
    console.error(error.response?.data || error);
  }
}


  function handleEditarContribuyente() {
    setModal({ open: true, modo: "editar", tipo: "contribuyente" });
  }


  return (
    <>
      {/* =========================
         LISTA DE COMPROBANTES
      ========================= */}
      {!seleccionado && !selectedContribuyente && (
        <div className="card card-full contribuyentes-panel">
          <h3>Comprobantes</h3>

          <div className="contribuyentes-toolbar">
            <input
              className="filter-input"
              placeholder="NCF"
              value={filters.ncf}
              onChange={(e) => handleFilterChange("ncf", e.target.value)}
              disabled={modal.open}
            />

            <input
              className="filter-input"
              type="date"
              placeholder="Fecha emisión"
              value={filters.FechaEmision}
              onChange={(e) => handleFilterChange("FechaEmision", e.target.value)}
              disabled={modal.open}
            />

            <div className="autocomplete-wrapper">
              <input
                className="filter-input"
                placeholder="Buscar contribuyente..."
                value={searchContribuyente}
                onChange={(e) => {
                  setSearchContribuyente(e.target.value);
                  setSeleccionadoContribuyente(null);
                  setFilters(prev => ({ ...prev, ContribuyenteId: null }));
                }}
                disabled={modal.open}
                autoComplete="off"
              />
              {seleccionadoContribuyente && (
                <button
                  onClick={onClearContribuyente}
                  className="clear-btn"
                  title="Limpiar"
                  type="button"
                >
                  ×
                </button>
              )}
              {contribuyentes.length > 0 && (
                <ul className="autocomplete">
                  {contribuyentes.map((c) => (
                    <li key={c.id} onClick={() => onSelectContribuyente(c)}>
                      {c.fistName} {c.lastName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              className="btn-agregar"
              onClick={() => setModal({ open: true, modo: "nuevo" })}
              disabled={modal.open}
            >
              + Agregar
            </button>
          </div>

          <div
            id="listaComprobantes"
            ref={listaRef}
            className="contribuyentes-lista listaComprobantes"
          >
            {data.length === 0 && <p>No hay comprobantes.</p>}
            {data.map((c) => (
              <div
                key={c.id}
                className="card contribuyente-item"
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

          <div className="contribuyentes-footer">
            <span>
              Mostrando {(page - 1) * pageSize + 1} –{" "}
              {Math.min(page * pageSize, totalRecords)} de {totalRecords}
            </span>

            <div className="paginacion">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                ◀ Anterior
              </button>
              <strong>{page} / {totalPages}</strong>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                Siguiente ▶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================
         DETALLE COMPROBANTE
      ========================= */}
      {seleccionado && !selectedContribuyente && (
        <ComprobanteDetalle
          comprobante={seleccionado}
          onVolver={() => setSeleccionado(null)}
          onEditar={() => setModal({ open: true, modo: "editar" })}
          onEliminar={() => handleEliminarComprobante(seleccionado.id)}
          onVerContribuyente={handleVerContribuyente} // ✅ NUEVO
        />
      )}

      {/* =========================
   DETALLE CONTRIBUYENTE
========================= */}
      {selectedContribuyente && (
        <ContribuyenteDetalle
          contribuyente={selectedContribuyente}
          onVolver={() => setSelectedContribuyente(null)}
          onEditar={handleEditarContribuyente}   // ✅ REAL
          onEliminar={() => handleEliminarContribuyente(selectedContribuyente.id)} // ✅ REAL
        />
      )}


      {/* =========================
         MODAL
      ========================= */}
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

      {/* =========================
   MODAL CONTRIBUYENTE
========================= */}
      {modal.open && modal.tipo === "contribuyente" && (
        <ContribuyenteModal
          modo={modal.modo}
          data={modal.modo === "editar" ? selectedContribuyente : null}
          onClose={() => setModal({ open: false, modo: "editar", tipo: null })}
          onSave={async (contribuyenteActualizado) => {
            try {
              await updateContribuyente(
                contribuyenteActualizado.id,
                contribuyenteActualizado
              );
              alert("Contribuyente actualizado con éxito.");
              setModal({ open: false, modo: "editar", tipo: null });
              setSelectedContribuyente(contribuyenteActualizado);
              await cargar();
            } catch (error) {
              const apiErrors = error.response?.data?.Errors;
              if (apiErrors?.length) {
                alert("Errores de validación:\n" + apiErrors.join("\n"));
              } else {
                alert(
                  "Error actualizando contribuyente: " +
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






