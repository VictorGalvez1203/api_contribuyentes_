import { useEffect, useState, useRef } from "react";
import UsuarioDetalle from "./UsuarioDetalle";
import UsuarioModal from "./UsuarioModal";
import { getRoles } from "../../api/rolesApi";

import {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} from "../../api/usuariosApi";
import { useToast } from "../../context/ToastContext";

export default function Usuarios() {
    const [data, setData] = useState([]);
    const [roles, setRoles] = useState([]);
    const [filters, setFilters] = useState({
        Username: "",
        Rol_Id: "",
        Estado: "",
    });

    const [seleccionado, setSeleccionado] = useState(null);
    const [panel, setPanel] = useState("lista");
    const [modal, setModal] = useState({ open: false, modo: "nuevo" });

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);

    const listaRef = useRef(null);
    const token = localStorage.getItem("token");
    const { showToast } = useToast();

    function handleFilterChange(field, value) {
        setFilters(prev => ({ ...prev, [field]: value }));
        setPage(1);
    }

    async function cargarRoles() {
        try {
            const res = await getRoles(token);
            setRoles(res.data?.data || []);
        } catch (error) {
            console.error("Error cargando roles", error);
        }
    }


    async function cargar() {
        const params = {
            PageNumber: page,
            PageSize: pageSize,
            ...filters,
        };

        Object.keys(params).forEach(
            k => (params[k] === "" || params[k] == null) && delete params[k]
        );

        const res = await getUsuarios(params, token);

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
        cargarRoles();
        cargar();
    }, [page, pageSize, filters]);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timer);
    }, [data]);

    async function handleEliminar(id) {
        if (!window.confirm("¿Eliminar usuario?")) return;

        try {
            await deleteUsuario(id, token);

            // ✅ ALERTA AL ELIMINAR
            showToast("success", "Usuario eliminado correctamente");

            setSeleccionado(null);
            setPanel("lista");
            await cargar();
        } catch (error) {
            showToast("error", "Error eliminando usuario");
            console.error(error);
        }
    }


    return (
        <>
            {/* ================= LISTA ================= */}
            {panel === "lista" && (
                <div className="card card-full usuarios-panel">
                    <h3>Usuarios</h3>

                    <div className="usuarios-toolbar">
                        <input
                            placeholder="Username"
                            value={filters.Username}
                            onChange={e => handleFilterChange("Username", e.target.value)}
                        />

                        <select
                            value={filters.Rol_Id}
                            onChange={e =>
                                handleFilterChange(
                                    "Rol_Id",
                                    e.target.value ? Number(e.target.value) : ""
                                )
                            }
                        >
                            <option value="">Rol</option>

                            {roles.map(rol => (
                                <option key={rol.id} value={rol.id}>
                                    {rol.nombreRol}
                                </option>
                            ))}
                        </select>


                        <select
                            value={filters.Estado}
                            onChange={e => handleFilterChange("Estado", e.target.value)}
                        >
                            <option value="">Estado</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>

                        <button onClick={() => setModal({ open: true, modo: "nuevo" })}>
                            + Agregar
                        </button>
                    </div>

                    <div
                        id="listaUsuarios"
                        ref={listaRef}
                        className={`usuarios-tabla-contenedor ${isAnimating ? 'animating' : ''}`}
                    >
                        <table className="usuarios-tabla">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((u, index) => (
                                    <tr key={u.id} className={`${u.estado === "Activo" ? "activo" : "inactivo"}`}>
                                        <td>{(page - 1) * pageSize + index + 1}</td>
                                        <td>{u.username}</td>
                                        <td>{u.email}</td>
                                        <td>{u.nombreRol || 'N/A'}</td>
                                        <td>
                                            <span className={`estado-badge ${u.estado === "Activo" ? "activo" : "inactivo"}`}>
                                                {u.estado}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn-tabla-ver"
                                                onClick={() => {
                                                    setSeleccionado(u);
                                                    setPanel("detalle");
                                                }}
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
                        <span>
                            Mostrando {(page - 1) * pageSize + 1} –{" "}
                            {Math.min(page * pageSize, totalRecords)} de {totalRecords}
                        </span>

                        <div className="paginacion">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                ◀
                            </button>
                            <strong>{page} / {totalPages}</strong>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                ▶
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= DETALLE ================= */}
            {panel === "detalle" && seleccionado && (
                <UsuarioDetalle
                    usuario={seleccionado}
                    onVolver={() => setPanel("lista")}
                    onEditar={() => setModal({ open: true, modo: "editar" })}
                    onEliminar={() => handleEliminar(seleccionado.id)}
                />
            )}

            {/* ================= MODAL ================= */}
            {modal.open && (
                <UsuarioModal
                    modo={modal.modo}
                    data={modal.modo === "editar" ? seleccionado : null}
                    roles={roles}
                    onClose={() => setModal({ open: false, modo: "nuevo" })}
                    onSave={async usuario => {
                        try {
                            if (modal.modo === "nuevo") {
                                await createUsuario(usuario, token);

                                // ✅ ALERTA AL CREAR USUARIO
                                showToast("success", "Usuario creado correctamente");
                            } else {
                                await updateUsuario(usuario.id, usuario, token);

                                // ✅ ALERTA AL ACTUALIZAR USUARIO
                                showToast("success", "Usuario actualizado correctamente");
                            }

                            setModal({ open: false, modo: "nuevo" });
                            setSeleccionado(null);
                            setPanel("lista");
                            await cargar();
                        } catch (error) {
                            showToast("error", "Error guardando usuario");
                            console.error(error);
                        }
                    }}
                />
            )}

        </>
    );
}


