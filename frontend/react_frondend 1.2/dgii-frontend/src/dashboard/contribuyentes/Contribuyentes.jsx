import { useEffect, useState, useRef } from "react";
import ContribuyenteDetalle from "./ContribuyenteDetalle";
import ContribuyenteModal from "./ContribuyenteModal";
import ComprobanteDetalle from "../comprobantes/ComprobanteDetalle";
import ComprobanteModal from "../comprobantes/ComprobanteModal"; // Modal solo para actualizar
import {
  getContribuyentes,
  createContribuyente,
  updateContribuyente,
  deleteContribuyente,
} from "../../api/contribuyentesApi";
import {
  updateComprobante,
  deleteComprobante,
} from "../../api/comprobantesApi";

export default function Contribuyentes() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    fistName: "",
    lastName: "",
    rncCedula: "",
    tipoContribuyenteId: "",
    status: "",
  });

  const [seleccionado, setSeleccionado] = useState(null); // contribuyente seleccionado
  const [selectedComprobante, setSelectedComprobante] = useState(null); // comprobante seleccionado
  const [panel, setPanel] = useState("listaContribuyentes");
  const [modal, setModal] = useState({ open: false, modo: "editar", tipo: "contribuyente" }); 

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const listaRef = useRef(null);

  function handleFilterChange(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  }

  async function cargar() {
    const params = { PageNumber: page, PageSize: pageSize, ...filters };
    Object.keys(params).forEach(
      (key) => (params[key] === "" || params[key] == null) && delete params[key]
    );

    const res = await getContribuyentes(params);
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

  // ========================
  // Contribuyentes
  // ========================
  async function handleEliminarContribuyente(id) {
    if (!window.confirm("¿Seguro que desea eliminar este contribuyente?")) return;
    try {
      await deleteContribuyente(id);
      alert("Contribuyente eliminado con éxito.");
      setData((prev) => prev.filter((x) => x.id !== id));
      setSeleccionado(null);
      await cargar();
      setPanel("listaContribuyentes");
    } catch (error) {
      alert("Error eliminando contribuyente: " + (error.message || "Error desconocido"));
      console.error(error.response?.data || error);
    }
  }

  // ========================
  // Comprobantes
  // ========================
  async function handleEliminarComprobante(id) {
    if (!window.confirm("¿Seguro que desea eliminar este comprobante?")) return;
    try {
      await deleteComprobante(id);
      alert("Comprobante eliminado con éxito.");
      setSelectedComprobante(null);
      setPanel("detalleContribuyente");
    } catch (error) {
      alert("Error eliminando comprobante: " + (error.message || "Error desconocido"));
      console.error(error.response?.data || error);
    }
  }

  function handleEditarComprobante(comprobante) {
    setSelectedComprobante(comprobante);
    setModal({ open: true, modo: "editar", tipo: "comprobante" });
  }

  return (
    <>
      {/* LISTA DE CONTRIBUYENTES */}
      {panel === "listaContribuyentes" && (
        <div className="card card-full contribuyentes-panel">
          <h3>Contribuyentes</h3>
          <div className="contribuyentes-toolbar">
            <input placeholder="Nombre" value={filters.fistName} onChange={(e) => handleFilterChange("fistName", e.target.value)} disabled={modal.open} />
            <input placeholder="Apellido" value={filters.lastName} onChange={(e) => handleFilterChange("lastName", e.target.value)} disabled={modal.open} />
            <input placeholder="RNC / Cédula" value={filters.rncCedula} onChange={(e) => handleFilterChange("rncCedula", e.target.value)} disabled={modal.open} />
            <select value={filters.tipoContribuyenteId} onChange={(e) => handleFilterChange("tipoContribuyenteId", e.target.value ? Number(e.target.value) : "")} disabled={modal.open}>
              <option value="">Tipo de contribuyente</option>
              <option value="1">Tipo 1</option>
              <option value="2">Tipo 2</option>
            </select>
            <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)} disabled={modal.open}>
              <option value="">Estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <button onClick={() => setModal({ open: true, modo: "nuevo", tipo: "contribuyente" })}>+ Agregar</button>
          </div>

          <div id="listaContribuyentes" ref={listaRef} className="contribuyentes-lista">
            {data.map((c) => (
              <div key={c.id} className={`card contribuyente-item ${c.status === "Activo" ? "activo" : "inactivo"}`} onClick={() => { setSeleccionado(c); setPanel("detalleContribuyente"); }}>
                <div>
                  <h4>{c.fistName} {c.lastName}</h4>
                  <p><strong>RNC:</strong> {c.rncCedula}</p>
                </div>
                <strong>{c.status}</strong>
              </div>
            ))}
          </div>

          <div className="contribuyentes-footer">
            <span>Mostrando {(page - 1) * pageSize + 1} – {Math.min(page * pageSize, totalRecords)} de {totalRecords}</span>
            <div className="paginacion">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>◀ Anterior</button>
              <strong>{page} / {totalPages}</strong>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Siguiente ▶</button>
            </div>
          </div>
        </div>
      )}

      {/* DETALLE CONTRIBUYENTE */}
      {seleccionado && panel === "detalleContribuyente" && (
        <ContribuyenteDetalle
          contribuyente={seleccionado}
          onVolver={() => setPanel("listaContribuyentes")}
          onEditar={() => setModal({ open: true, modo: "editar", tipo: "contribuyente" })}
          onEliminar={() => handleEliminarContribuyente(seleccionado.id)}
          onVerComprobante={(c) => { setSelectedComprobante(c); setPanel("detalleComprobante"); }}
        />
      )}

      {/* DETALLE COMPROBANTE */}
      {selectedComprobante && panel === "detalleComprobante" && (
        <ComprobanteDetalle
          comprobante={selectedComprobante}
          onVolver={() => setPanel("detalleContribuyente")}
          onEditar={() => handleEditarComprobante(selectedComprobante)}
          onEliminar={() => handleEliminarComprobante(selectedComprobante.id)}
        />
      )}

      {/* MODALES */}
      {modal.open && modal.tipo === "contribuyente" && (
        <ContribuyenteModal
          modo={modal.modo}
          data={modal.modo === "editar" ? seleccionado : null}
          onClose={() => setModal({ open: false })}
          onSave={async (nuevo) => {
            try {
              if (modal.modo === "nuevo") await createContribuyente(nuevo);
              else await updateContribuyente(nuevo.id, nuevo);
              setModal({ open: false });
              await cargar();
              if (modal.modo === "editar") setSeleccionado(null);
            } catch (error) {
              alert("Error guardando contribuyente: " + (error.message || "Error desconocido"));
              console.error(error);
            }
          }}
        />
      )}

      {modal.open && modal.tipo === "comprobante" && (
        <ComprobanteModal
          modo={modal.modo} // solo "editar" porque no crearás comprobantes
          data={selectedComprobante}
          onClose={() => setModal({ open: false })}
          onSave={async (nuevo) => {
            try {
              await updateComprobante(nuevo.id, nuevo);
              setModal({ open: false });
              setSelectedComprobante(null);
              setPanel("detalleContribuyente");
            } catch (error) {
              alert("Error actualizando comprobante: " + (error.message || "Error desconocido"));
              console.error(error);
            }
          }}
        />
      )}
    </>
  );
}










