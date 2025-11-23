import { Camion, InventarioCamion } from '@/Inventario/pages/types';

export const camionesDummyData: Camion[] = [
  {
    id: "C001",
    placa: "ABC-123",
    marca: "Volvo",
    modelo: "FL280",
    anio: 2020,
    fechaUltimoChequeo: "2024-11-01",
    proximoMantenimiento: "2025-02-01",
    estado: "disponible",
    capacidadAgua: 3000,
    kilometraje: 45000,
    numeroSerie: "VLV2020FL280-001",
    responsable: "P010",
    inventario_camion: [
      { itemId: "I001", cantidad: 2, ubicacion: "Compartimento 1", ultimaVerificacion: "2024-11-01" },
      { itemId: "I002", cantidad: 4, ubicacion: "Compartimento 2", ultimaVerificacion: "2024-11-01" },
      { itemId: "I005", cantidad: 4, ubicacion: "Cabina", ultimaVerificacion: "2024-11-01" },
      { itemId: "I007", cantidad: 2, ubicacion: "Rack Herramientas", ultimaVerificacion: "2024-11-01" },
      { itemId: "I008", cantidad: 1, ubicacion: "Cabina de Mando", ultimaVerificacion: "2024-11-01" },
      { itemId: "I009", cantidad: 6, ubicacion: "Compartimento 3", ultimaVerificacion: "2024-11-01" },
      { itemId: "I010", cantidad: 2, ubicacion: "Oficina Comunicaciones", ultimaVerificacion: "2024-11-01" },
      { itemId: "I017", cantidad: 1, ubicacion: "Compartimento Rescate", ultimaVerificacion: "2024-11-01" }
    ],
    observaciones: "Camión principal de la estación, en excelentes condiciones"
  },
  {
    id: "C002",
    placa: "XYZ-456",
    marca: "Scania",
    modelo: "P320",
    anio: 2019,
    fechaUltimoChequeo: "2024-10-15",
    proximoMantenimiento: "2025-01-15",
    estado: "en_reparacion",
    capacidadAgua: 2500,
    kilometraje: 62000,
    numeroSerie: "SCN2019P320-002",
    responsable: "P014",
    inventario_camion: [
      { itemId: "I001", cantidad: 2, ubicacion: "Compartimento 1" },
      { itemId: "I002", cantidad: 3, ubicacion: "Compartimento 2" },
      { itemId: "I005", cantidad: 3, ubicacion: "Cabina" },
      { itemId: "I009", cantidad: 4, ubicacion: "Compartimento 3" },
      { itemId: "I011", cantidad: 1, ubicacion: "Exterior" },
      { itemId: "I013", cantidad: 2, ubicacion: "Compartimento 4" },
      { itemId: "I022", cantidad: 2, ubicacion: "Rack Herramientas" }
    ],
    observaciones: "En reparación por cambio de bomba de agua. Retorno estimado: 10 días"
  },
  {
    id: "C003",
    placa: "DEF-789",
    marca: "Mercedes-Benz",
    modelo: "Atego 1725",
    anio: 2021,
    fechaUltimoChequeo: "2024-11-10",
    proximoMantenimiento: "2025-02-10",
    estado: "en_proyecto",
    proyectoAsignado: "Proyecto Lima Centro",
    fechaEntradaProyecto: "2024-11-15",
    fechaSalidaProyecto: "2025-01-15",
    capacidadAgua: 3500,
    kilometraje: 28000,
    numeroSerie: "MBZ2021AT1725-003",
    responsable: "P006",
    inventario_camion: [
      { itemId: "I001", cantidad: 3, ubicacion: "Compartimento 1", ultimaVerificacion: "2024-11-10" },
      { itemId: "I002", cantidad: 5, ubicacion: "Compartimento 2", ultimaVerificacion: "2024-11-10" },
      { itemId: "I003", cantidad: 4, ubicacion: "Almacén EPP", ultimaVerificacion: "2024-11-10" },
      { itemId: "I004", cantidad: 3, ubicacion: "Vestidor", ultimaVerificacion: "2024-11-10" },
      { itemId: "I005", cantidad: 5, ubicacion: "Cabina", ultimaVerificacion: "2024-11-10" },
      { itemId: "I006", cantidad: 6, ubicacion: "Almacén EPP", ultimaVerificacion: "2024-11-10" },
      { itemId: "I008", cantidad: 1, ubicacion: "Cabina de Mando", ultimaVerificacion: "2024-11-10" },
      { itemId: "I009", cantidad: 8, ubicacion: "Compartimento 3", ultimaVerificacion: "2024-11-10" },
      { itemId: "I019", cantidad: 1, ubicacion: "Compartimento Médico", ultimaVerificacion: "2024-11-10" }
    ],
    observaciones: "Asignado a proyecto de prevención en zona comercial"
  },
  {
    id: "C004",
    placa: "GHI-321",
    marca: "Volvo",
    modelo: "FM440",
    anio: 2018,
    fechaUltimoChequeo: "2024-09-20",
    proximoMantenimiento: "2024-12-20",
    estado: "inventario_faltante",
    capacidadAgua: 4000,
    kilometraje: 78000,
    numeroSerie: "VLV2018FM440-004",
    responsable: "P008",
    inventario_camion: [
      { itemId: "I001", cantidad: 3, ubicacion: "Compartimento 1" },
      { itemId: "I002", cantidad: 4, ubicacion: "Compartimento 2" },
      { itemId: "I005", cantidad: 4, ubicacion: "Cabina" },
      { itemId: "I007", cantidad: 2, ubicacion: "Rack Herramientas" },
      { itemId: "I009", cantidad: 6, ubicacion: "Compartimento 3" },
      { itemId: "I010", cantidad: 3, ubicacion: "Oficina Comunicaciones" },
      { itemId: "I013", cantidad: 2, ubicacion: "Compartimento 4" }
    ],
    itemsFaltantes: ["I005", "I007"], // Faltan 2 SCBA y 1 Hacha
    observaciones: "Faltan equipos SCBA y hacha plana. Requiere reabastecimiento urgente antes de salir"
  },
  {
    id: "C005",
    placa: "JKL-654",
    marca: "Scania",
    modelo: "P380",
    anio: 2022,
    fechaUltimoChequeo: "2024-11-18",
    proximoMantenimiento: "2025-02-18",
    estado: "disponible",
    capacidadAgua: 3200,
    kilometraje: 15000,
    numeroSerie: "SCN2022P380-005",
    responsable: "P016",
    inventario_camion: [
      { itemId: "I001", cantidad: 2, ubicacion: "Compartimento 1", ultimaVerificacion: "2024-11-18" },
      { itemId: "I002", cantidad: 4, ubicacion: "Compartimento 2", ultimaVerificacion: "2024-11-18" },
      { itemId: "I005", cantidad: 4, ubicacion: "Cabina", ultimaVerificacion: "2024-11-18" },
      { itemId: "I009", cantidad: 5, ubicacion: "Compartimento 3", ultimaVerificacion: "2024-11-18" },
      { itemId: "I010", cantidad: 2, ubicacion: "Oficina Comunicaciones", ultimaVerificacion: "2024-11-18" },
      { itemId: "I011", cantidad: 1, ubicacion: "Exterior", ultimaVerificacion: "2024-11-18" },
      { itemId: "I014", cantidad: 1, ubicacion: "Compartimento Médico", ultimaVerificacion: "2024-11-18" },
      { itemId: "I022", cantidad: 2, ubicacion: "Rack Herramientas", ultimaVerificacion: "2024-11-18" }
    ],
    observaciones: "Camión nuevo, equipamiento completo y verificado"
  },
  {
    id: "C006",
    placa: "MNO-987",
    marca: "Mercedes-Benz",
    modelo: "Axor 2544",
    anio: 2017,
    fechaUltimoChequeo: "2024-08-05",
    proximoMantenimiento: "2024-11-05",
    estado: "averiado",
    capacidadAgua: 5000,
    kilometraje: 95000,
    numeroSerie: "MBZ2017AX2544-006",
    responsable: "P010",
    inventario_camion: [
      { itemId: "I001", cantidad: 4, ubicacion: "Compartimento 1" },
      { itemId: "I002", cantidad: 6, ubicacion: "Compartimento 2" },
      { itemId: "I005", cantidad: 5, ubicacion: "Cabina" },
      { itemId: "I007", cantidad: 3, ubicacion: "Rack Herramientas" },
      { itemId: "I009", cantidad: 8, ubicacion: "Compartimento 3" }
    ],
    observaciones: "Averiado por falla en sistema hidráulico. Requiere reparación mayor. Inventario almacenado temporalmente"
  },
  {
    id: "C007",
    placa: "PQR-246",
    marca: "Volvo",
    modelo: "FMX500",
    anio: 2023,
    fechaUltimoChequeo: "2024-11-20",
    proximoMantenimiento: "2025-02-20",
    estado: "disponible",
    capacidadAgua: 4500,
    kilometraje: 8000,
    numeroSerie: "VLV2023FMX500-007",
    responsable: "P018",
    inventario_camion: [
      { itemId: "I001", cantidad: 3, ubicacion: "Compartimento 1", ultimaVerificacion: "2024-11-20" },
      { itemId: "I002", cantidad: 5, ubicacion: "Compartimento 2", ultimaVerificacion: "2024-11-20" },
      { itemId: "I005", cantidad: 6, ubicacion: "Cabina", ultimaVerificacion: "2024-11-20" },
      { itemId: "I008", cantidad: 2, ubicacion: "Cabina de Mando", ultimaVerificacion: "2024-11-20" },
      { itemId: "I009", cantidad: 10, ubicacion: "Compartimento 3", ultimaVerificacion: "2024-11-20" },
      { itemId: "I010", cantidad: 4, ubicacion: "Oficina Comunicaciones", ultimaVerificacion: "2024-11-20" },
      { itemId: "I016", cantidad: 2, ubicacion: "Armario Equipos", ultimaVerificacion: "2024-11-20" },
      { itemId: "I017", cantidad: 1, ubicacion: "Compartimento Rescate", ultimaVerificacion: "2024-11-20" },
      { itemId: "I020", cantidad: 1, ubicacion: "Compartimento Energía", ultimaVerificacion: "2024-11-20" }
    ],
    observaciones: "Camión de última generación con tecnología avanzada"
  },
  {
    id: "C008",
    placa: "STU-135",
    marca: "Scania",
    modelo: "G450",
    anio: 2016,
    fechaUltimoChequeo: "2024-07-12",
    proximoMantenimiento: "2024-10-12",
    estado: "retirado_definitivo",
    capacidadAgua: 2800,
    kilometraje: 120000,
    numeroSerie: "SCN2016G450-008",
    inventario_camion: [],
    observaciones: "Retirado por exceso de kilometraje y costos de mantenimiento elevados. Inventario transferido a otros camiones"
  },
  {
    id: "C009",
    placa: "VWX-579",
    marca: "Mercedes-Benz",
    modelo: "Atego 1729",
    anio: 2021,
    fechaUltimoChequeo: "2024-11-12",
    proximoMantenimiento: "2025-02-12",
    estado: "en_proyecto",
    proyectoAsignado: "Proyecto Surco",
    fechaEntradaProyecto: "2024-10-01",
    fechaSalidaProyecto: "2024-12-31",
    capacidadAgua: 3300,
    kilometraje: 32000,
    numeroSerie: "MBZ2021AT1729-009",
    responsable: "P011",
    inventario_camion: [
      { itemId: "I001", cantidad: 2, ubicacion: "Compartimento 1", ultimaVerificacion: "2024-11-12" },
      { itemId: "I002", cantidad: 4, ubicacion: "Compartimento 2", ultimaVerificacion: "2024-11-12" },
      { itemId: "I003", cantidad: 5, ubicacion: "Almacén EPP", ultimaVerificacion: "2024-11-12" },
      { itemId: "I005", cantidad: 4, ubicacion: "Cabina", ultimaVerificacion: "2024-11-12" },
      { itemId: "I009", cantidad: 6, ubicacion: "Compartimento 3", ultimaVerificacion: "2024-11-12" },
      { itemId: "I021", cantidad: 4, ubicacion: "Almacén EPP", ultimaVerificacion: "2024-11-12" }
    ],
    observaciones: "Asignado a proyecto de capacitación en distrito de Surco"
  },
  {
    id: "C010",
    placa: "YZA-802",
    marca: "Volvo",
    modelo: "FL240",
    anio: 2019,
    fechaUltimoChequeo: "2024-10-28",
    proximoMantenimiento: "2025-01-28",
    estado: "disponible",
    capacidadAgua: 2700,
    kilometraje: 54000,
    numeroSerie: "VLV2019FL240-010",
    responsable: "P013",
    inventario_camion: [
      { itemId: "I001", cantidad: 2, ubicacion: "Compartimento 1", ultimaVerificacion: "2024-10-28" },
      { itemId: "I002", cantidad: 3, ubicacion: "Compartimento 2", ultimaVerificacion: "2024-10-28" },
      { itemId: "I005", cantidad: 3, ubicacion: "Cabina", ultimaVerificacion: "2024-10-28" },
      { itemId: "I007", cantidad: 2, ubicacion: "Rack Herramientas", ultimaVerificacion: "2024-10-28" },
      { itemId: "I009", cantidad: 4, ubicacion: "Compartimento 3", ultimaVerificacion: "2024-10-28" },
      { itemId: "I014", cantidad: 1, ubicacion: "Compartimento Médico", ultimaVerificacion: "2024-10-28" },
      { itemId: "I022", cantidad: 2, ubicacion: "Rack Herramientas", ultimaVerificacion: "2024-10-28" }
    ],
    observaciones: "Camión para operaciones estándar, buen estado general"
  }
];

// Funciones auxiliares
export const getAvailableCamiones = () => camionesDummyData.filter(c => c.estado === "disponible");
export const getUnavailableCamiones = () => camionesDummyData.filter(c => c.estado !== "disponible");
export const getCamionesByEstado = (estado: string) => camionesDummyData.filter(c => c.estado === estado);
export const getCamionById = (id: string) => camionesDummyData.find(c => c.id === id);
export const getCamionesByProyecto = (proyecto: string) => camionesDummyData.filter(c => c.proyectoAsignado === proyecto);

// Obtener inventario de un camión específico con detalles
export const getInventarioDetallado = (camionId: string) => {
  const camion = getCamionById(camionId);
  if (!camion) return [];
  
  return camion.inventario_camion.map(inv => ({
    ...inv,
    // Aquí podrías agregar más detalles del item desde inventarioDummyData
  }));
};

// Estadísticas de camiones
export const getCamionesStats = () => {
  const total = camionesDummyData.length;
  const disponibles = getAvailableCamiones().length;
  const enReparacion = camionesDummyData.filter(c => c.estado === "en_reparacion").length;
  const averiados = camionesDummyData.filter(c => c.estado === "averiado").length;
  const enProyecto = camionesDummyData.filter(c => c.estado === "en_proyecto").length;
  const inventarioFaltante = camionesDummyData.filter(c => c.estado === "inventario_faltante").length;
  
  return {
    total,
    disponibles,
    enReparacion,
    averiados,
    enProyecto,
    inventarioFaltante,
    porcentajeDisponible: ((disponibles / total) * 100).toFixed(1)
  };
};

// Proyectos disponibles
export const getProyectosDisponibles = () => {
  const proyectos = new Set(
    camionesDummyData
      .filter(c => c.proyectoAsignado)
      .map(c => c.proyectoAsignado!)
  );
  return Array.from(proyectos).sort();
};