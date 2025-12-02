import { Proyecto } from '@/procesos/pages/GestionarProyectos/Types';

export const proyectosDummyData: Proyecto[] = [
  {
    id: "PROJ-001",
    cotizacion: "1", // Cotización aprobada de Tech Solutions
    camiones: ["C001", "C003"],
    inventario_proyecto: [
      { id_objeto: "I001", nombreObjeto: "Extintor CO2 10lb", cantidad: 2, origen: "cotizacion" },
      { id_objeto: "I002", nombreObjeto: "Manguera 1.5'' 30m", cantidad: 3, origen: "cotizacion" },
      { id_objeto: "I007", nombreObjeto: "Hacha de Bombero Plana", cantidad: 5, origen: "cotizacion" },
      { id_objeto: "I010", nombreObjeto: "Radio Portátil VHF", cantidad: 2, origen: "adicional" }
    ],
    cliente: "20123456789", // Tech Solutions S.A.C.
    informe_final: "informe_proj001.pdf",
    factura: "factura_proj001.pdf",
    comentarios: "Proyecto de instalación de sistema contra incendios en edificio corporativo. Cliente muy satisfecho con el servicio.",
    ubicacion: "Av. Javier Prado 2500, San Isidro, Lima",
    servicio_brindado: "Instalación y configuración de sistema contra incendios - Edificio Corporativo",
    fecha_inicio: "2025-02-01",
    fecha_finalizacion: "2025-02-15",
    estado: "completado",
    monto_total: 3690,
    fechaCreacion: "2025-01-20"
  },
  {
    id: "PROJ-002",
    cotizacion: "6", // Cotización aprobada de Universidad Nacional
    camiones: ["C005"],
    inventario_proyecto: [
      { id_objeto: "I001", nombreObjeto: "Extintor CO2 10lb", cantidad: 15, origen: "cotizacion" },
      { id_objeto: "I009", nombreObjeto: "Linterna LED Alta Potencia", cantidad: 20, origen: "cotizacion" },
      { id_objeto: "I023", nombreObjeto: "Cono de Tráfico Reflectivo", cantidad: 50, origen: "adicional" }
    ],
    cliente: "20890123456", // Universidad Nacional del Centro
    factura: "factura_proj002.pdf",
    comentarios: "Implementación de equipos de seguridad en campus universitario. Incluye capacitación al personal de seguridad.",
    ubicacion: "Av. Universitaria 456, Huancayo",
    servicio_brindado: "Suministro e instalación de equipamiento de seguridad - Campus Universitario",
    fecha_inicio: "2025-02-20",
    fecha_finalizacion: "2025-03-10",
    estado: "en_curso",
    monto_total: 4850,
    fechaCreacion: "2025-02-01"
  },
  {
    id: "PROJ-003",
    camiones: ["C002", "C004"],
    inventario_proyecto: [
      { id_objeto: "I005", nombreObjeto: "Equipo de Respiración Autónoma SCBA", cantidad: 4, origen: "adicional" },
      { id_objeto: "I008", nombreObjeto: "Cámara Térmica TIC", cantidad: 1, origen: "adicional" },
      { id_objeto: "I016", nombreObjeto: "Detector de Gas Multigas", cantidad: 3, origen: "adicional" }
    ],
    cliente: "20345678901", // Corporación Minera del Sur
    comentarios: "Proyecto sin cotización previa. Emergencia por auditoría de seguridad en mina.",
    ubicacion: "Zona minera - Arequipa",
    servicio_brindado: "Dotación de equipos de seguridad para operaciones en mina subterránea",
    fecha_inicio: "2025-01-15",
    fecha_finalizacion: "2025-01-30",
    estado: "completado",
    monto_total: 18500,
    fechaCreacion: "2025-01-10"
  },
  {
    id: "PROJ-004",
    camiones: ["C007"],
    inventario_proyecto: [
      { id_objeto: "I003", nombreObjeto: "Casco de Bombero F1", cantidad: 12, origen: "adicional" },
      { id_objeto: "I004", nombreObjeto: "Traje Bunker Completo", cantidad: 8, origen: "adicional" },
      { id_objeto: "I006", nombreObjeto: "Botas de Bombero Estructurales", cantidad: 15, origen: "adicional" }
    ],
    cliente: "20456789012", // Municipalidad de Lima
    informe_final: "informe_proj004.pdf",
    comentarios: "Renovación de equipamiento para brigada municipal de emergencias.",
    ubicacion: "Jr. de la Unión 300, Cercado de Lima",
    servicio_brindado: "Renovación de EPP para brigada municipal de emergencias",
    fecha_inicio: "2025-03-01",
    estado: "planificacion",
    monto_total: 12400,
    fechaCreacion: "2025-02-15"
  },
  {
    id: "PROJ-005",
    camiones: ["C001"],
    inventario_proyecto: [
      { id_objeto: "I014", nombreObjeto: "Kit de Primeros Auxilios Avanzado", cantidad: 8, origen: "adicional" },
      { id_objeto: "I019", nombreObjeto: "Camilla Rígida de Rescate", cantidad: 3, origen: "adicional" },
      { id_objeto: "I024", nombreObjeto: "Oxímetro de Pulso Portátil", cantidad: 6, origen: "adicional" }
    ],
    cliente: "20567890123", // Hospital Regional
    factura: "factura_proj005.pdf",
    comentarios: "Actualización de equipos médicos de emergencia para ambulancias.",
    ubicacion: "Av. Grau 1350, Lima",
    servicio_brindado: "Actualización de equipamiento médico de emergencia",
    fecha_inicio: "2025-02-10",
    fecha_finalizacion: "2025-02-25",
    estado: "completado",
    monto_total: 5680,
    fechaCreacion: "2025-01-25"
  },
  {
    id: "PROJ-006",
    camiones: ["C003", "C005"],
    inventario_proyecto: [
      { id_objeto: "I001", nombreObjeto: "Extintor CO2 10lb", cantidad: 20, origen: "adicional" },
      { id_objeto: "I002", nombreObjeto: "Manguera 1.5'' 30m", cantidad: 8, origen: "adicional" },
      { id_objeto: "I011", nombreObjeto: "Escalera Extensible 7.5m", cantidad: 2, origen: "adicional" }
    ],
    cliente: "20234567890", // Centro Comercial Plaza del Sol
    comentarios: "Actualización del sistema contra incendios del centro comercial según nueva normativa.",
    ubicacion: "Av. Larco 1234, Miraflores, Lima",
    servicio_brindado: "Actualización de sistema contra incendios - Centro Comercial",
    fecha_inicio: "2025-03-15",
    estado: "planificacion",
    monto_total: 8950,
    fechaCreacion: "2025-02-20"
  },
  {
    id: "PROJ-007",
    camiones: ["C006"],
    inventario_proyecto: [
      { id_objeto: "I017", nombreObjeto: "Cortador Hidráulico de Rescate", cantidad: 1, origen: "adicional" },
      { id_objeto: "I013", nombreObjeto: "Cuerdas de Rescate 50m", cantidad: 4, origen: "adicional" }
    ],
    cliente: "20678901234", // Constructora Horizonte
    informe_final: "informe_proj007.pdf",
    factura: "factura_proj007.pdf",
    comentarios: "Equipamiento de rescate para obra de construcción de gran altura.",
    ubicacion: "Jr. Las Camelias 678, San Isidro, Lima",
    servicio_brindado: "Dotación de equipos de rescate en altura - Obra en construcción",
    fecha_inicio: "2025-01-20",
    fecha_finalizacion: "2025-02-05",
    estado: "completado",
    monto_total: 14200,
    fechaCreacion: "2025-01-15"
  },
  {
    id: "PROJ-008",
    camiones: ["C010"],
    inventario_proyecto: [
      { id_objeto: "I009", nombreObjeto: "Linterna LED Alta Potencia", cantidad: 15, origen: "adicional" },
      { id_objeto: "I010", nombreObjeto: "Radio Portátil VHF", cantidad: 8, origen: "adicional" }
    ],
    cliente: "20456123789", // Distribuidora Nacional
    comentarios: "Equipamiento de seguridad para flota de distribución.",
    ubicacion: "Av. Industrial 2345, Ate, Lima",
    servicio_brindado: "Equipamiento de seguridad para flota vehicular",
    fecha_inicio: "2025-02-28",
    estado: "en_curso",
    monto_total: 3850,
    fechaCreacion: "2025-02-18"
  },
  {
    id: "PROJ-009",
    camiones: [],
    inventario_proyecto: [
      { id_objeto: "I020", nombreObjeto: "Generador Portátil 5kW", cantidad: 2, origen: "adicional" },
      { id_objeto: "I018", nombreObjeto: "Monitor de Ventilación PPV", cantidad: 1, origen: "adicional" }
    ],
    cliente: "20789456123", // Agroindustrias del Valle
    comentarios: "Proyecto pausado por solicitud del cliente. Esperando aprobación de presupuesto adicional.",
    ubicacion: "Km 12 Carretera Ica, Ica",
    servicio_brindado: "Instalación de sistema de energía de respaldo - Planta procesadora",
    fecha_inicio: "2025-03-10",
    estado: "pausado",
    monto_total: 9800,
    fechaCreacion: "2025-02-25"
  },
  {
    id: "PROJ-010",
    camiones: ["C001", "C007"],
    inventario_proyecto: [
      { id_objeto: "I003", nombreObjeto: "Casco de Bombero F1", cantidad: 10, origen: "adicional" },
      { id_objeto: "I015", nombreObjeto: "Guantes de Bombero Estructurales", cantidad: 15, origen: "adicional" },
      { id_objeto: "I021", nombreObjeto: "Chaqueta de Bombero Wildland", cantidad: 12, origen: "adicional" }
    ],
    cliente: "20567234901", // Grupo Hotelero Costa Verde
    factura: "factura_proj010.pdf",
    comentarios: "Capacitación incluida para brigada contra incendios del hotel.",
    ubicacion: "Malecón Cisneros 1456, Miraflores, Lima",
    servicio_brindado: "Equipamiento y capacitación de brigada contra incendios - Hotel",
    fecha_inicio: "2025-02-15",
    fecha_finalizacion: "2025-03-01",
    estado: "en_curso",
    monto_total: 7650,
    fechaCreacion: "2025-02-05"
  },
  {
    id: "PROJ-011",
    camiones: ["C009"],
    inventario_proyecto: [],
    cliente: "20123789456", // Inversiones Comerciales del Norte
    comentarios: "Proyecto cancelado por falta de aprobación presupuestaria del cliente.",
    ubicacion: "Av. América 567, Trujillo",
    servicio_brindado: "Auditoría y actualización de sistema de seguridad - CANCELADO",
    fecha_inicio: "2025-01-25",
    estado: "cancelado",
    monto_total: 0,
    fechaCreacion: "2025-01-20"
  },
  {
    id: "PROJ-012",
    camiones: ["C005"],
    inventario_proyecto: [
      { id_objeto: "I001", nombreObjeto: "Extintor CO2 10lb", cantidad: 30, origen: "adicional" },
      { id_objeto: "I023", nombreObjeto: "Cono de Tráfico Reflectivo", cantidad: 80, origen: "adicional" }
    ],
    cliente: "20345123678", // Servicios Logísticos Express
    informe_final: "informe_proj012.pdf",
    comentarios: "Equipamiento de seguridad para nuevo centro de distribución.",
    ubicacion: "Av. Venezuela 1890, Callao",
    servicio_brindado: "Dotación de equipos de seguridad - Centro de distribución",
    fecha_inicio: "2025-03-05",
    estado: "planificacion",
    monto_total: 12100,
    fechaCreacion: "2025-02-22"
  }
];

// Funciones auxiliares
export const getProyectosActivos = () => proyectosDummyData.filter(p => 
  p.estado === "en_curso" || p.estado === "planificacion"
);

export const getProyectosCompletados = () => proyectosDummyData.filter(p => p.estado === "completado");

export const getProyectoById = (id: string) => proyectosDummyData.find(p => p.id === id);

export const getProyectosByCliente = (ruc: string) => proyectosDummyData.filter(p => p.cliente === ruc);

export const getProyectosByCotizacion = (cotizacionId: string) => 
  proyectosDummyData.filter(p => p.cotizacion === cotizacionId);

export const getProyectosConCamion = (camionId: string) => 
  proyectosDummyData.filter(p => p.camiones.includes(camionId));

// Estadísticas
export const getProyectosStats = () => {
  const total = proyectosDummyData.length;
  const enCurso = proyectosDummyData.filter(p => p.estado === "en_curso").length;
  const completados = getProyectosCompletados().length;
  const planificacion = proyectosDummyData.filter(p => p.estado === "planificacion").length;
  const pausados = proyectosDummyData.filter(p => p.estado === "pausado").length;
  const cancelados = proyectosDummyData.filter(p => p.estado === "cancelado").length;
  const conCotizacion = proyectosDummyData.filter(p => p.cotizacion).length;
  const sinCotizacion = proyectosDummyData.filter(p => !p.cotizacion).length;
  const montoTotal = proyectosDummyData
    .filter(p => p.estado !== "cancelado")
    .reduce((sum, p) => sum + (p.monto_total || 0), 0);
  
  return {
    total,
    enCurso,
    completados,
    planificacion,
    pausados,
    cancelados,
    conCotizacion,
    sinCotizacion,
    montoTotal,
    tasaCompletado: total > 0 ? ((completados / total) * 100).toFixed(1) : "0"
  };
};