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