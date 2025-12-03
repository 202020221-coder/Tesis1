export interface SolicitudDeServicio {
  id: string;
  serviceId: number[];
  productId: string[];
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  ruc: string;
  email: string;
  phone: string;
  description: string;
  estado: 'pendiente' | 'en-proceso' | 'completada' | 'cancelada';
  fechaSolicitud: string;
}

export const solicitudesDeServicioDummy: SolicitudDeServicio[] = [
  {
    id: "SOL-2025-001",
    serviceId: [1, 3],
    productId: ["I025", "I024"],
    companyName: "Constructora Los Andes S.A.C.",
    location: "Av. Javier Prado Este 4200, San Borja, Lima",
    startDate: "2025-01-20",
    endDate: "2025-01-22",
    ruc: "20512345678",
    email: "seguridad@losandes.com.pe",
    phone: "+51 987 654 321",
    description: "Solicitud de inspección completa de seguridad contra incendios para nueva sede administrativa. Incluye certificación de 25 extintores portátiles distribuidos en 5 pisos del edificio.",
    estado: "pendiente",
    fechaSolicitud: "2025-01-10"
  },
  {
    id: "SOL-2025-002",
    serviceId: [2, 4],
    productId: ["I005", "I004", "I003", "I002"],
    companyName: "Industrias Químicas del Perú S.A.",
    location: "Carretera Central Km 15.5, Ate, Lima",
    startDate: "2025-02-01",
    endDate: "2025-02-15",
    ruc: "20698745632",
    email: "operaciones@iqperu.com",
    phone: "+51 912 345 678",
    description: "Mantenimiento preventivo anual de sistemas contra incendios en planta industrial. Incluye instalación de nuevo sistema de rociadores automáticos en área de almacenamiento de productos químicos.",
    estado: "en-proceso",
    fechaSolicitud: "2025-01-05"
  }
];