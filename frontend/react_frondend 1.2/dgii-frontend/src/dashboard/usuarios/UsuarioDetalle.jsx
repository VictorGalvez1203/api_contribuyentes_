import { useEffect, useState } from "react";
import { getRolPorId } from "../../api/rolesApi";

export default function UsuarioDetalle({
    usuario,
    onVolver,
    onEliminar,
    onEditar
}) {
    const [rolNombre, setRolNombre] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function cargarRol() {
            if (!usuario?.rol_Id) return;

            try {
                const res = await getRolPorId(usuario.rol_Id, token);
                setRolNombre(res.data?.data?.nombreRol || "—");
            } catch (error) {
                console.error("Error cargando rol:", error);
                setRolNombre("—");
            }
        }

        cargarRol();
    }, [usuario, token]);

    return (
        <div className="card card-full detalle-card" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
            <h3>Detalle del Usuario</h3>

            {/* SECCIÓN DATOS - 30% altura máxima, 2 columnas */}
            <div className="detalle-seccion-datos">
                <div className="detalle-grid-2col">
                    <div>
                        <strong>Username:</strong> {usuario.username}
                    </div>

                    <div>
                        <strong>Email:</strong> {usuario.email}
                    </div>

                    <div>
                        <strong>Rol:</strong>{" "}
                        {rolNombre ? rolNombre : "Cargando..."}
                    </div>

                    <div>
                        <strong>Estado:</strong> {usuario.estado}
                    </div>
                </div>
            </div>

            {/* SECCIÓN ACCIONES - Fija en la parte inferior */}
            <div className="detalle-seccion-acciones">
                <div></div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button className="btn-danger" onClick={onEliminar}>
                        Eliminar
                    </button>

                    <button className="btn-secondary" onClick={onEditar}>
                        Actualizar
                    </button>

                    <button onClick={onVolver}>
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
}




