-- Estudiantes
INSERT INTO students_example (nombre, correo) 
VALUES
    ('Carlos Ramirez', 'carlos.example@example.com'),
    ('Laura Gomez', 'laura.example@example.com'),
    ('Andres Martinez', 'andres.example@example.com');

-- Cursos
INSERT INTO courses_example (nombre, creditos) 
VALUES
    ('Bases de Datos', 3),
    ('Programacion Web', 4),
    ('Arquitectura de Software', 3);

-- Matrículas
INSERT INTO enrollments_example (estudiante_id, curso_id, fecha_matricula, nota_final)
VALUES
    (1, 1, CURRENT_DATE, 4.5),
    (1, 2, CURRENT_DATE, 4.2),
    (2, 1, CURRENT_DATE, 3.8),
    (2, 3, CURRENT_DATE, 4.6),
    (3, 2, CURRENT_DATE, 4.0);

-- ==================================================
-- LABORATORIO 1
-- ==================================================

-- 1. CATEGORIAS

INSERT INTO categoria_evento
    (codigo_categoria, nombre_categoria, descripcion)
VALUES
    ('conciertos', 'Conciertos', 'Eventos musicales en vivo'),
    ('deportes', 'Deportes', 'Actividades y competencias deportivas'),
    ('tecnologia', 'Tecnología', 'Conferencias y encuentros tecnológicos'),
    ('cultura', 'Cultura', 'Actividades artísticas y culturales'),
    ('gastronomia', 'Gastronomía', 'Experiencias gastronómicas')
ON CONFLICT DO NOTHING;


-- 2. EVENTOS
-- La categoría se busca por código, no por el nombre con tildes.

INSERT INTO evento
    (titulo, descripcion, fecha_evento, lugar, precio,
     imagen_url, estado, id_categoria)
SELECT
    d.titulo,
    d.descripcion,
    d.fecha_evento,
    d.lugar,
    d.precio,
    d.imagen_url,
    d.estado,
    c.id_categoria
FROM (
    VALUES
    ('Festival Musical', 'Presentaciones de artistas en vivo',
     TIMESTAMP '2026-11-15 18:00:00', 'Parque Central',
     50000.00::NUMERIC,
     'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800',
     'activo', 'conciertos'),

    ('Torneo de Futbol', 'Competencia deportiva local',
     TIMESTAMP '2026-11-20 09:00:00', 'Estadio Municipal',
     15000.00::NUMERIC,
     'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
     'activo', 'deportes'),

    ('Congreso de Tecnologia', 'Charlas sobre desarrollo de software',
     TIMESTAMP '2026-12-05 08:00:00', 'Centro de Convenciones',
     80000.00::NUMERIC,
     'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
     'activo', 'tecnologia'),

    ('Exposicion Cultural', 'Muestra de arte regional',
     TIMESTAMP '2026-08-10 14:00:00', 'Casa de la Cultura',
     10000.00::NUMERIC,
     'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800',
     'finalizado', 'cultura'),

    ('Feria Gastronomica', 'Degustación de platos tradicionales',
     TIMESTAMP '2026-12-18 12:00:00', 'Plaza Principal',
     25000.00::NUMERIC,
     'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
     'activo', 'gastronomia'),

    ('Encuentro de Programacion', 'Evento gratuito para desarrolladores',
     TIMESTAMP '2026-12-22 10:00:00', 'Auditorio Universitario',
     0.00::NUMERIC,
     'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
     'inactivo', 'tecnologia')
) AS d(titulo, descripcion, fecha_evento, lugar, precio,
       imagen_url, estado, codigo_categoria)
INNER JOIN categoria_evento c
    ON c.codigo_categoria = d.codigo_categoria
ON CONFLICT (titulo) DO NOTHING;


-- 3. RESERVAS

INSERT INTO reserva_evento
    (nombre_cliente, correo_cliente, fecha_reserva,
     cantidad_personas, estado_reserva, id_evento)
SELECT
    d.nombre_cliente,
    d.correo_cliente,
    d.fecha_reserva,
    d.cantidad_personas,
    d.estado_reserva,
    e.id_evento
FROM (
    VALUES
    ('Carlos Perez', 'carlos@example.com',
     TIMESTAMP '2026-10-20 10:00:00', 2, 'confirmada', 'Festival Musical'),

    ('Laura Gomez', 'laura@example.com',
     TIMESTAMP '2026-10-21 11:30:00', 3, 'confirmada', 'Festival Musical'),

    ('Andres Rodriguez', 'andres@example.com',
     TIMESTAMP '2026-10-22 09:00:00', 2, 'pendiente', 'Torneo de Futbol'),

    ('Maria Torres', 'maria@example.com',
     TIMESTAMP '2026-10-22 15:00:00', 4, 'confirmada', 'Torneo de Futbol'),

    ('Juan Martinez', 'juan@example.com',
     TIMESTAMP '2026-10-23 08:30:00', 1, 'cancelada', 'Congreso de Tecnologia'),

    ('Diana Lopez', 'diana@example.com',
     TIMESTAMP '2026-10-23 13:00:00', 3, 'confirmada', 'Congreso de Tecnologia'),

    ('Santiago Ruiz', 'santiago@example.com',
     TIMESTAMP '2026-10-24 16:00:00', 2, 'pendiente', 'Exposicion Cultural'),

    ('Valentina Diaz', 'valentina@example.com',
     TIMESTAMP '2026-10-25 12:00:00', 5, 'confirmada', 'Feria Gastronomica')
) AS d(nombre_cliente, correo_cliente, fecha_reserva,
       cantidad_personas, estado_reserva, titulo_evento)
INNER JOIN evento e
    ON e.titulo = d.titulo_evento
WHERE NOT EXISTS (
    SELECT 1
    FROM reserva_evento r
    WHERE r.correo_cliente = d.correo_cliente
      AND r.id_evento = e.id_evento
);