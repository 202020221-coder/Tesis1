import { Cotizacion } from '@/procesos/pages/GestionarProyectos/Types';

export const cotizacionesDummy: Cotizacion[] = [
  {
    id: "1",
    numeroRef: "COT-2025-001",
    idsolicitud: "SOL-2025-001",
    cliente: "Constructora Los Andes S.A.C.",
    ruc: 20518934091,
    fechaEmision: "2025-01-15",
    monto: 3690,
    objeto: [
      { itemId: "I001", nombre: "Extintor CO2 10lb", cantidad: 2, precio: 350, monto: 400 },
      { itemId: "I002", nombre: "Manguera 1.5'' 30m", cantidad: 3, precio: 280, monto: 320 },
      { itemId: "I007", nombre: "Hacha de Bombero Plana", cantidad: 5, precio: 180, monto: 220 }
    ],
    servicios: [
      { 
        objectId: "1", 
        nombre: "Inspección de Seguridad", 
        descripcion: "Evaluación completa de sistemas contra incendios",
        precio: 299, 
        monto: 350,
        comentario: "Inspección completa en 5 pisos del edificio"
      },
      { 
        objectId: "3", 
        nombre: "Certificación de Extintores", 
        descripcion: "Certificación y recarga de extintores portátiles",
        precio: 180, 
        monto: 200,
        comentario: "25 extintores a certificar"
      }
    ],
    estado: "aprobada",
    fechaVencimiento: "2025-02-14",
    descripcion: "Equipamiento completo para estación de bomberos nueva. Incluye extintores, mangueras y herramientas básicas.",
    validez: 30
  },
  {
    id: "2",
    numeroRef: "COT-2025-002",
    idsolicitud: "SOL-2025-002",
    cliente: "Industrias Químicas del Perú S.A.",
    ruc: 20518934091,
    fechaEmision: "2025-01-20",
    monto: 8950,
    objeto: [
      { itemId: "I003", nombre: "Casco de Bombero F1", cantidad: 10, precio: 450, monto: 480 },
      { itemId: "I004", nombre: "Traje Bunker Completo", cantidad: 5, precio: 1850, monto: 1950 }
    ],
    servicios: [
      { 
        objectId: "2", 
        nombre: "Mantenimiento Preventivo", 
        descripcion: "Revisión y mantenimiento de equipos contra incendios",
        precio: 450, 
        monto: 550,
        comentario: "Mantenimiento anual de toda la planta"
      },
      { 
        objectId: "4", 
        nombre: "Instalación de Sistemas", 
        descripcion: "Instalación completa de sistemas de detección y extinción",
        precio: 2500, 
        monto: 2800,
        comentario: "Sistema de rociadores para área química"
      }
    ],
    estado: "pendiente",
    fechaVencimiento: "2025-02-19",
    descripcion: "Equipos de protección personal para brigada municipal de emergencias.",
    validez: 30
  },
  {
    id: "3",
    numeroRef: "COT-2025-003",
    idsolicitud: "",
    cliente: "Complejo Industrial Norte",
    ruc: 20518934091,
    fechaEmision: "2025-01-10",
    monto: 19200,
    objeto: [
      { itemId: "I005", nombre: "Equipo de Respiración Autónoma SCBA", cantidad: 6, precio: 3200, monto: 3200 }
    ],
    servicios: [],
    estado: "enviada",
    fechaVencimiento: "2025-02-09",
    descripcion: "Sistemas de respiración autónoma para brigada industrial. Urgente por certificación de seguridad.",
    validez: 30
  },
  {
    id: "4",
    numeroRef: "COT-2025-004",
    idsolicitud: "",
    cliente: "Corporación Minera del Sur",
    ruc: 20518934091,
    fechaEmision: "2024-12-28",
    monto: 5400,
    objeto: [
      { itemId: "I008", nombre: "Cámara Térmica TIC", cantidad: 2, precio: 8500, monto: 9200 },
      { itemId: "I016", nombre: "Detector de Gas Multigas", cantidad: 4, precio: 1250, monto: 1350 }
    ],
    servicios: [
      { 
        objectId: "1", 
        nombre: "Inspección de Seguridad", 
        descripcion: "Evaluación completa de sistemas contra incendios",
        precio: 299, 
        monto: 400,
        comentario: "Inspección en zona minera"
      }
    ],
    estado: "vencida",
    fechaVencimiento: "2025-01-27",
    descripcion: "Equipos de detección para operaciones en túneles y espacios confinados.",
    validez: 30
  },
  {
    id: "5",
    numeroRef: "COT-2025-005",
    idsolicitud: "",
    cliente: "Hospital Regional",
    ruc: 20518934091,
    fechaEmision: "2025-01-25",
    monto: 3800,
    objeto: [
      { itemId: "I014", nombre: "Kit de Primeros Auxilios Avanzado", cantidad: 10, precio: 380, monto: 380 }
    ],
    servicios: [],
    estado: "rechazada",
    fechaVencimiento: "2025-02-24",
    descripcion: "Kits de emergencia para actualización de equipamiento médico de emergencias.",
    validez: 30
  },
  {
    id: "6",
    numeroRef: "COT-2025-006",
    idsolicitud: "",
    cliente: "Universidad Nacional",
    ruc: 20518934091,
    fechaEmision: "2025-01-18",
    monto: 4850,
    objeto: [
      { itemId: "I001", nombre: "Extintor CO2 10lb", cantidad: 15, precio: 350, monto: 320 },
      { itemId: "I009", nombre: "Linterna LED Alta Potencia", cantidad: 20, precio: 120, monto: 130 }
    ],
    servicios: [
      { 
        objectId: "3", 
        nombre: "Certificación de Extintores", 
        descripcion: "Certificación y recarga de extintores portátiles",
        precio: 180, 
        monto: 200,
        comentario: "Certificación en campus universitario"
      }
    ],
    estado: "aprobada",
    fechaVencimiento: "2025-02-17",
    descripcion: "Equipamiento de seguridad para laboratorios y edificios académicos.",
    validez: 30
  },
  {
    id: "7",
    numeroRef: "COT-2025-007",
    idsolicitud: "",
    cliente: "Centro Comercial Plaza",
    ruc: 20518934091,
    fechaEmision: "2025-02-01",
    monto: 2800,
    objeto: [
      { itemId: "I023", nombre: "Cono de Tráfico Reflectivo", cantidad: 100, precio: 15, monto: 18 },
      { itemId: "I009", nombre: "Linterna LED Alta Potencia", cantidad: 20, precio: 120, monto: 140 }
    ],
    servicios: [],
    estado: "pendiente",
    fechaVencimiento: "2025-03-03",
    descripcion: "Equipos de señalización para evacuaciones y gestión de emergencias.",
    validez: 30
  },
  {
    id: "8",
    numeroRef: "COT-2025-008",
    idsolicitud: "",
    cliente: "Constructora Horizonte",
    ruc: 20518934091,
    fechaEmision: "2025-01-22",
    monto: 7650,
    objeto: [
      { itemId: "I003", nombre: "Casco de Bombero F1", cantidad: 8, precio: 450, monto: 470 },
      { itemId: "I006", nombre: "Botas de Bombero Estructurales", cantidad: 12, precio: 320, monto: 350 },
      { itemId: "I015", nombre: "Guantes de Bombero Estructurales", cantidad: 15, precio: 95, monto: 110 }
    ],
    servicios: [
      { 
        objectId: "2", 
        nombre: "Mantenimiento Preventivo", 
        descripcion: "Revisión y mantenimiento de equipos contra incendios",
        precio: 450, 
        monto: 500,
        comentario: "Mantenimiento en obra de construcción"
      }
    ],
    estado: "enviada",
    fechaVencimiento: "2025-02-21",
    descripcion: "EPP para brigada de seguridad en obra de construcción de edificio de 20 pisos.",
    validez: 30
  }
];