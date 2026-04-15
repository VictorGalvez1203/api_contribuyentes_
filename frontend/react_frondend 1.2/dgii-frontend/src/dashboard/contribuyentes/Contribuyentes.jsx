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
import { useToast } from "../../context/ToastContext";

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
  const [isAnimating, setIsAnimating] = useState(false);

  const listaRef = useRef(null);
  const { showToast } = useToast();

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

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [data]);

  // ========================
  // Contribuyentes
  // ========================
  async function handleEliminarContribuyente(id) {
    if (!window.confirm("¿Seguro que desea eliminar este contribuyente?")) return;
    try {
      await deleteContribuyente(id);
      showToast("success", "Contribuyente eliminado con éxito.");
      setData((prev) => prev.filter((x) => x.id !== id));
      setSeleccionado(null);
      await cargar();
      setPanel("listaContribuyentes");
    } catch (error) {
      showToast("error", "Error eliminando contribuyente: " + (error.message || "Error desconocido"));
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
      showToast("success", "Comprobante eliminado con éxito.");
      setSelectedComprobante(null);
      setPanel("detalleContribuyente");
    } catch (error) {
      showToast("error", "Error eliminando comprobante: " + (error.message || "Error desconocido"));
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

          <div id="listaContribuyentes" ref={listaRef} className={`contribuyentes-tabla-contenedor ${isAnimating ? 'animating' : ''}`}>
            <table className="contribuyentes-tabla">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>RNC / Cédula</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {data.map((c, index) => (
                  <tr key={c.id} className={`${c.status === "Activo" ? "activo" : "inactivo"}`}>
                    <td>{(page - 1) * pageSize + index + 1}</td>
                    <td>{c.fistName}</td>
                    <td>{c.lastName}</td>
                    <td>{c.rncCedula}</td>
                    <td>
                      <span className={`estado-badge ${c.status === "Activo" ? "activo" : "inactivo"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn-tabla-ver"
                        onClick={() => { setSeleccionado(c); setPanel("detalleContribuyente"); }}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              if (modal.modo === "nuevo") {
                await createContribuyente(nuevo);
                showToast("success", "Contribuyente creado con éxito.");
              } else {
                await updateContribuyente(nuevo.id, nuevo);
                showToast("success", "Contribuyente actualizado con éxito.");
              }
              setModal({ open: false });
              await cargar();
              if (modal.modo === "editar") setSeleccionado(null);
            } catch (error) {
              showToast("error", "Error guardando contribuyente: " + (error.message || "Error desconocido"));
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
              showToast("success", "Comprobante actualizado con éxito.");
              setModal({ open: false });
              setSelectedComprobante(null);
              setPanel("detalleContribuyente");
            } catch (error) {
              showToast("error", "Error actualizando comprobante: " + (error.message || "Error desconocido"));
              console.error(error);
            }
          }}
        />
      )}
    </>
  );
}










