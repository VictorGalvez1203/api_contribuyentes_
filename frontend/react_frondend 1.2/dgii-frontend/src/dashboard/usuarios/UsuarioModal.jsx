import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";

export default function UsuarioModal({ modo, data, roles = [], onClose, onSave }) {
    const { showToast } = useToast();
    const [form, setForm] = useState({
        id: null,
        username: "",
        password: "",
        email: "",
        rol_Id: "",
        estado: "Activo",
    });

    /* =========================
       CARGA AL EDITAR / NUEVO
    ========================= */
    useEffect(() => {
        if (data && modo === "editar") {
            setForm({
                id: data.id,
                username: data.username || "",
                password: "",
                email: data.email || "",
                rol_Id: data.rol_Id || "",
                estado: data.estado || "Activo",
            });
        } else {
            setForm({
                id: null,
                username: "",
                password: "",
                email: "",
                rol_Id: "",
                estado: "Activo",
            });
        }
    }, [data, modo]);

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    function handleSave() {
        if (!form.username || !form.email || !form.rol_Id) {
            showToast("error", "Username, Email y Rol son obligatorios");
            return;
        }

        if (modo === "nuevo" && !form.password) {
            showToast("error", "La contraseña es obligatoria");
            return;
        }

        const payload = { ...form };
        if (modo === "editar" && !payload.password) {
            delete payload.password;
        }

        onSave(payload);
    }

    return (
        <div
            className="modal"
            style={{ display: "flex" }}
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div className="modal-card">
                <h3>{modo === "nuevo" ? "Nuevo Usuario" : "Actualizar Usuario"}</h3>

                <div className="modal-body">
                    <input
                        placeholder="Username"
                        value={form.username}
                        onChange={e => handleChange("username", e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => handleChange("email", e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder={
                            modo === "editar"
                                ? "Contraseña (Obligatoria)"
                                : "Contraseña"
                        }
                        value={form.password}
                        onChange={e => handleChange("password", e.target.value)}
                    />

                    {/* 🔹 ROL DINÁMICO */}
                    <select
                        value={form.rol_Id}
                        onChange={e =>
                            handleChange("rol_Id", e.target.value ? Number(e.target.value) : "")
                        }
                    >
                        <option value="">Seleccione un rol</option>
                        {roles.map(rol => (
                            <option key={rol.id} value={rol.id}>
                                {rol.nombreRol}
                            </option>
                        ))}
                    </select>

                    <select
                        value={form.estado}
                        onChange={e => handleChange("estado", e.target.value)}
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn-save" onClick={handleSave}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

