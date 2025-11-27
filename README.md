# dgii_api_contribuyentes

# https://dgii-my.sharepoint.com/:w:/g/personal/laogando_dgii_gov_do/EZVd-HawWqJOqsaJq6-qDKgBOWa50CP-LheOhdi6eXPGiQ?e=S1z4UA


-- Base
CREATE DATABASE DBContribuyentesCF;
GO
USE DBContribuyentesCF;
GO

-- Lookup: tipos de contribuyente
CREATE TABLE tipos_contribuyente (
    id_tipo INT IDENTITY PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL UNIQUE -- 'PERSONA FISICA' | 'PERSONA JURIDICA'
);

INSERT INTO tipos_contribuyente (tipo) VALUES ('PERSONA FISICA'), ('PERSONA JURÍDICA');

-- Tabla contribuyentes (RNC o cédula como texto)
CREATE TABLE contribuyentes (
    id_contribuyente INT IDENTITY PRIMARY KEY,
    rnc_cedula VARCHAR(20) NOT NULL UNIQUE,   -- admite ceros a la izquierda
    nombre VARCHAR(200) NOT NULL,
    id_tipo INT NOT NULL REFERENCES tipos_contribuyente(id_tipo),
    estatus VARCHAR(8) NOT NULL CHECK (estatus IN ('activo','inactivo')),
    fecha_creacion DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- Tabla comprobantes fiscales
CREATE TABLE comprobantes_fiscales (
    id_comprobantes INT IDENTITY PRIMARY KEY,
    id_contribuyente INT NOT NULL REFERENCES contribuyentes(id_contribuyente) ON DELETE CASCADE,
    ncf VARCHAR(13) NOT NULL UNIQUE,
    fecha_emision DATE NOT NULL DEFAULT CAST(SYSUTCDATETIME() AS DATE),
    monto DECIMAL(12,2) NOT NULL CHECK (monto >= 0),
    itbis18 AS ROUND(monto * 0.18, 2) PERSISTED, -- columna calculada y persistida
    descripcion VARCHAR(250) NULL
);

-- Índices para búsquedas comunes
CREATE INDEX IX_contribuyentes_nombre ON contribuyentes(nombre);
CREATE INDEX IX_comprobantes_fecha ON comprobantes_fiscales(fecha_emision);


-- Contribuyentes (basado en los dos primeros objetos)
INSERT INTO contribuyentes (rnc_cedula, nombre, id_tipo, estatus)
VALUES
('98754321012', 'JUAN PEREZ', (SELECT id_tipo FROM tipos_contribuyente WHERE tipo = 'PERSONA FISICA'), 'activo'),
('000987456789', 'FARMACIA TU SALUD', (SELECT id_tipo FROM tipos_contribuyente WHERE tipo = 'PERSONA JURÍDICA'), 'inactivo');

-- Comprobantes (corregí nombres/valores confusos del JSON)
-- Primer comprobante (tercer objeto del JSON)
INSERT INTO comprobantes_fiscales (id_contribuyente, ncf, monto, descripcion)
VALUES (
    (SELECT id_contribuyente FROM contribuyentes WHERE rnc_cedula = '98754321012'),
    'E31000000001',
    200.00,
    'Comprobante ejemplo 1'
);

-- Segundo comprobante (cuarto objeto del JSON). Nota: en el JSON había "nombre":"1000.00" — lo interpreté como monto
INSERT INTO comprobantes_fiscales (id_contribuyente, ncf, monto, descripcion)
VALUES (
    (SELECT id_contribuyente FROM contribuyentes WHERE rnc_cedula = '98754321012'),
    'E31000000002',
    1000.00,
    'Comprobante ejemplo 2'
);

-- Verifica resultados:
SELECT * FROM contribuyentes;
SELECT * FROM comprobantes_fiscales;
