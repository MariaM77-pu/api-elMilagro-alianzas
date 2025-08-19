const db = require('../db');

// Consultar todos los pagos asociados a un número de plano
exports.consultarAlianzas = (req, res) => {

  const institucion = req.params.institucion;
    console.log('📝 consultarAlianzas req.params:', req.params);
  console.log('⏳ Ejecutando query a la BD para institución:', institucion);
    const query = `
     SELECT 
      id,
      institucion,
      actividad,
      representante_nombre,
      representante_correo,
      fecha_solicitud,
      estado
    FROM alianzas_solicitudes
    WHERE institucion = ?
    ORDER BY institucion DESC
  `;

  db.query(query, [institucion], (err, results) => {
    if (err) {
      console.error('Error al consultar las Alianzas:', err);
      return res.status(500).json({ error: 'Error al consultar las Alianzas' });
    }
    console.log('✅ Query completada. Número de filas:', results.length);
    if (results.length === 0) {
      console.warn('⚠️ No se encontraron Alianzas para la institución:', institucion);
      return res.status(404).json({ mensaje: 'No se encontraron Alianzas esta institucion.' });
    }

    // Envía el primer registro (o todo el array, según tu diseño)
    console.log('🚀 Devolviendo alianza:', results[0]);
    return res.json(results[0]);
  });
};

// Insertar un nuevo pago 
exports.registrarAlianza = (req, res) => {
  const { institucion, actividad, representante_nombre, representante_correo, fecha_solicitud, estado } = req.body;

  if (!institucion || !actividad || !representante_nombre || !representante_correo || !fecha_solicitud || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const query = `
    INSERT INTO alianzas_solicitudes 
    (institucion, actividad, representante_nombre, representante_correo, fecha_solicitud, estado) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  db.query(query, [institucion, actividad, representante_nombre, representante_correo, fecha_solicitud, estado], (err, result) => {
    if (err) {
      console.error('Error al registrar la alianza:', err);
      return res.status(500).json({ error: 'Error al registrar la alianza' });
    }

    res.status(201).json({
      message: 'Alianza registrada correctamente',
      data: { institucion, actividad, representante_nombre, representante_correo, fecha_solicitud, estado }
    });
  });
};

