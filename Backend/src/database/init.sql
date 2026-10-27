-- Tabla de estudiantes
CREATE TABLE IF NOT EXISTS students_example (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL
);

-- Tabla de cursos
CREATE TABLE IF NOT EXISTS courses_example (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    creditos INTEGER NOT NULL CHECK (creditos > 0)
);

-- Tabla intermedia para la relación N:M
CREATE TABLE IF NOT EXISTS enrollments_example (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER NOT NULL REFERENCES students_example(id) ON DELETE CASCADE,
    curso_id INTEGER NOT NULL REFERENCES courses_example(id) ON DELETE CASCADE,
    fecha_matricula DATE NOT NULL DEFAULT CURRENT_DATE,
    nota_final NUMERIC(3, 1) CHECK (nota_final BETWEEN 0 AND 5),
    UNIQUE (estudiante_id, curso_id)
);

-- ==================================================
-- LABORATORIO 1
-- ==================================================

-- FUNCIONALIDAD 1: CATEGORIAS Y EVENTOS

CREATE TABLE IF NOT EXISTS categoria_evento (
    id_categoria SERIAL PRIMARY KEY,
    codigo_categoria VARCHAR(30) NOT NULL UNIQUE,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE IF NOT EXISTS evento (
    id_evento SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_evento TIMESTAMP NOT NULL,
    lugar VARCHAR(150) NOT NULL,
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
    imagen_url TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo'
        CHECK (estado IN ('activo', 'inactivo', 'finalizado')),
    id_categoria INT NOT NULL,
    CONSTRAINT fk_evento_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categoria_evento(id_categoria)
);

-- FUNCIONALIDAD 2: RESERVAS

CREATE TABLE IF NOT EXISTS reserva_evento (
    id_reserva SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(120) NOT NULL,
    correo_cliente VARCHAR(150) NOT NULL,
    fecha_reserva TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cantidad_personas INT NOT NULL CHECK (cantidad_personas > 0),
    estado_reserva VARCHAR(20) NOT NULL DEFAULT 'pendiente'
        CHECK (estado_reserva IN ('pendiente', 'confirmada', 'cancelada')),
    id_evento INT NOT NULL,
    CONSTRAINT fk_reserva_evento
        FOREIGN KEY (id_evento)
        REFERENCES evento(id_evento)
);