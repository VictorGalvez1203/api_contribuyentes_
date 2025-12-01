# dgii_api_contribuyentes

# https://dgii-my.sharepoint.com/:w:/g/personal/laogando_dgii_gov_do/EZVd-HawWqJOqsaJq6-qDKgBOWa50CP-LheOhdi6eXPGiQ?e=S1z4UA


-- Base
CREATE DATABASE DBContribuyentesCF;
GO
USE DBContribuyentesCF;
GO


-- Lookup: tipos de contribuyente
CREATE TABLE tipos_contribuyente (
    Id INT IDENTITY PRIMARY KEY, -- en vez de id_tipo
    Tipo VARCHAR(50) NOT NULL UNIQUE,
);

INSERT INTO tipos_contribuyente (Tipo) 
VALUES ('PERSONA FISICA'), ('PERSONA JURIDICA');

-- Tabla contribuyentes
CREATE TABLE contribuyentes (
    Id INT IDENTITY PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Lastname VARCHAR(100) NULL,
    RncCedula VARCHAR(20) NOT NULL UNIQUE,
    Type VARCHAR(50) NOT NULL, -- Podría ser FK si lo deseas
    Status VARCHAR(20) NOT NULL CHECK (Status IN ('activo','inactivo')),
    Numberphone VARCHAR(30) NULL,
    Email VARCHAR(150) NULL UNIQUE,
    Address VARCHAR(250) NULL,

    -- Auditoría
    CreatedBy VARCHAR(100) NULL,
    Created DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    LastModifiedBy VARCHAR(100) NULL,
    LasModified DATETIME2 NULL
);

-- Tabla comprobantes fiscales
CREATE TABLE comprobantes_fiscales (
    Id INT IDENTITY PRIMARY KEY,
    ContribuyenteId INT NOT NULL REFERENCES contribuyentes(Id) ON DELETE CASCADE,
    Ncf VARCHAR(13) NOT NULL UNIQUE,
    FechaEmision DATE NOT NULL DEFAULT CAST(SYSUTCDATETIME() AS DATE),
    Monto DECIMAL(12,2) NOT NULL CHECK (Monto >= 0),
    Itbis18 AS ROUND(Monto * 0.18, 2) PERSISTED,
    Descripcion VARCHAR(250) NULL,

    -- Auditoría
    CreatedBy VARCHAR(100) NULL,
    Created DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    LastModifiedBy VARCHAR(100) NULL,
    LasModified DATETIME2 NULL
);

-- Tabla roles_usuario
CREATE TABLE roles_usuario (
    Id INT IDENTITY PRIMARY KEY,
    NombreRol VARCHAR(20) NOT NULL UNIQUE,
);

-- Tabla usuarios
CREATE TABLE usuarios (
    Id INT IDENTITY PRIMARY KEY,
    Username VARCHAR(100) NOT NULL UNIQUE,
    Password_Hash VARBINARY(256) NOT NULL,
    Email VARCHAR(150) NULL UNIQUE,
    RolId INT NOT NULL REFERENCES roles_usuario(Id),
    Estado VARCHAR(10) NOT NULL DEFAULT 'activo' CHECK (Estado IN ('activo','inactivo')),

    -- Auditoría
    CreatedBy VARCHAR(100) NULL,
    Created DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    LastModifiedBy VARCHAR(100) NULL,
    LasModified DATETIME2 NULL
);


-- Contribuyentes
INSERT INTO contribuyentes (Name, Lastname, RncCedula, Type, Status, Numberphone, Email, Address, CreatedBy)
VALUES
('JUAN', 'PEREZ', '98754321012', 'PERSONA FISICA', 'activo', '809-555-1234', 'juan.perez@example.com', 'Calle Falsa 123', 'system'),
('FARMACIA', 'TU SALUD', '000987456789', 'PERSONA JURIDICA', 'inactivo', '809-777-0000', 'contacto@farmacia.example', 'Av. Salud 45', 'system');

-- Comprobantes
INSERT INTO comprobantes_fiscales (ContribuyenteId, Ncf, Monto, Descripcion, CreatedBy)
VALUES (
    (SELECT Id FROM contribuyentes WHERE RncCedula = '98754321012'),
    'E31000000001',
    200.00,
    'Comprobante ejemplo 1',
    'system'
);

INSERT INTO comprobantes_fiscales (ContribuyenteId, Ncf, Monto, Descripcion, CreatedBy)
VALUES (
    (SELECT Id FROM contribuyentes WHERE RncCedula = '98754321012'),
    'E31000000002',
    1000.00,
    'Comprobante ejemplo 2',
    'system'
);

-- Roles
INSERT INTO roles_usuario (NombreRol)
VALUES ('BASICO'), ('ADMIN');

-- Usuarios
INSERT INTO usuarios (Username, Password_Hash, Email, RolId, CreatedBy)
VALUES (
    'admin01',
    HASHBYTES('SHA2_256', 'MiPasswordSeguro123'),
    'admin@dgii.gob.do',
    (SELECT Id FROM roles_usuario WHERE NombreRol = 'ADMIN'),
    'system'
);

---------------------------------------------------
-- VERIFICAR RESULTADOS
---------------------------------------------------
SELECT * FROM contribuyentes;
SELECT * FROM comprobantes_fiscales;
SELECT * FROM roles_usuario;
SELECT * FROM usuarios;

