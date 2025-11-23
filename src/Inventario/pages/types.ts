export type EstadoItem = "disponible" | "en_reparacion" | "retirado" | "daniado";

export interface Item {
  id: string;
  nombre: string;
  fabricante: string;
  numero_serial?: string;
  lugar_almacenaje?: string;
  cantidad: number;
  estado: EstadoItem;
  categoria?: string;
  descripcion?: string;
  fecha_adquisicion?: string;
  fecha_ultima_revision?: string;
  costo_unitario?: number;
  proveedor?: string;
  observaciones?: string;
}

export interface InventarioTableProps {
  onEdit: (id: string) => void;
  onAdd: () => void;
  activeTab: "available" | "unavailable";
  setActiveTab: (tab: "available" | "unavailable") => void;
  itemsData?: Item[];
}

export interface InventarioFormProps {
  itemId: string | null;
  onCancel: () => void;
  onSave?: (data: Item) => void;
}

export type ViewType = "table" | "form";

// ... código existente de Item ...

export type EstadoCamion = 
  | "disponible" 
  | "en_reparacion" 
  | "averiado" 
  | "inventario_faltante" 
  | "retirado_definitivo" 
  | "en_proyecto";

export interface InventarioCamion {
  itemId: string;
  cantidad: number;
  ubicacion?: string; // Ubicación específica dentro del camión
  ultimaVerificacion?: string;
}

export interface Camion {
  id: string;
  placa: string;
  marca: string;
  modelo?: string;
  anio?: number;
  fechaUltimoChequeo: string;
  proximoMantenimiento?: string;
  estado: EstadoCamion;
  inventario_camion: InventarioCamion[]; // Array de items que debe llevar el camión
  itemsFaltantes?: string[]; // IDs de items faltantes (cuando estado es inventario_faltante)
  proyectoAsignado?: string;
  fechaEntradaProyecto?: string;
  fechaSalidaProyecto?: string;
  observaciones?: string;
  capacidadAgua?: number; // Litros
  numeroSerie?: string;
  kilometraje?: number;
  responsable?: string;
}

export interface CamionesTableProps {
  onEdit: (id: string) => void;
  onAdd: () => void;
  activeTab: "available" | "unavailable";
  setActiveTab: (tab: "available" | "unavailable") => void;
  camionesData?: Camion[];
}

export interface CamionesFormProps {
  camionId: string | null;
  onCancel: () => void;
  onSave?: (data: Camion) => void;
}