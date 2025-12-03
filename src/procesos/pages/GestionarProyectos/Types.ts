export interface ObjetoItem {
  itemId: string; // Cambiado de nombre a itemId para referenciar items del inventario
  nombre: string; // Se mantiene para mostrar en la UI
  cantidad: number;
  precio: number; // Precio real del item del inventario
  monto: number; // Precio que se cotiza al cliente
}

export interface Cotizacion {
  id: string;
  numeroRef: string;
  cliente: string;
  fechaEmision: string;
  monto: number;
  objeto: ObjetoItem[];
  estado: "pendiente" | "aprobada" | "rechazada" | "enviada" | "vencida";
  fechaVencimiento: string;
  descripcion: string;
  validez: number;
}

export interface MenuCotizacionesProps {
  cotizaciones?: Cotizacion[];
  onAgregar?: (cotizacion: Cotizacion) => void;
  onEditar?: (id: string, cotizacion: Cotizacion) => void;
  onEliminar?: (id: string) => void;
}

export interface Cliente {
  ruc: string; // PK - RUC de 11 dígitos
  razonSocial: string;
  ubicacion: string;
  contacto: string; // Puede ser teléfono o email
  nombreContacto: string;
  plataformaFacturacion?: string; // URL de la plataforma
  usuarioPlataforma?: string;
  contrasenaPlataforma?: string;
  comentarios?: string;
  fechaRegistro?: string;
  estado?: "activo" | "inactivo" | "suspendido";
  tipoCliente?: "corporativo" | "gobierno" | "pyme" | "individual";
  limiteCredito?: number;
  proyectosAsociados?: string[]; // IDs de proyectos
}

export interface MenuClientesProps {
  clientes?: Cliente[];
  onAgregar?: (cliente: Cliente) => void;
  onEditar?: (ruc: string, cliente: Cliente) => void;
  onEliminar?: (ruc: string) => void;
}

export interface InventarioProyecto {
  id_objeto: string; // FK del inventario
  nombreObjeto?: string; // Para mostrar en la UI
  cantidad: number;
  origen?: "cotizacion" | "adicional"; // Para distinguir de dónde viene
}

export interface Proyecto {
  id: string; // PK
  cotizacion?: string; // FK opcional - ID de la cotización
  camiones: string[]; // FK array - IDs de los camiones asignados
  inventario_proyecto: InventarioProyecto[];
  personal_asignado: PersonalAsignado[]; // Array de personal asignado al proyecto
  cliente: string; // FK obligatorio - RUC del cliente
  informe_final?: File | string; // PDF opcional
  factura?: File | string; // PDF opcional
  comentarios?: string;
  ubicacion: string;
  servicio_brindado: string;
  fecha_inicio: string;
  fecha_finalizacion?: string;
  estado?: "planificacion" | "en_curso" | "completado" | "cancelado" | "pausado";
  monto_total?: number;
  fechaCreacion?: string;
}
export interface MenuProyectosProps {
  proyectos?: Proyecto[];
  onAgregar?: (proyecto: Proyecto) => void;
  onEditar?: (id: string, proyecto: Proyecto) => void;
  onEliminar?: (id: string) => void;
}

//nuevo
export interface PersonalAsignado {
  personalId: string; // FK - ID del personal (P001, P002, etc.)
  nombrePersonal?: string; // Para mostrar en la UI
  role: string; // Rol en el proyecto
  startDate: string;
  endDate?: string;
  dedicationPercentage: number; // Porcentaje de dedicación (0-100)
}