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
        <div className="card card-full" style={{ position: "relative" }}>
            <h3>Detalle del Usuario</h3>

            <div className="detalle-grid">
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
    );
}




