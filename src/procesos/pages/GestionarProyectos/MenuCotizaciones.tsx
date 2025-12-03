//cambio
import React from 'react'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Badge } from "@/shared/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, Plus, Pencil, Trash2, Eye, Download, Filter, Package, Briefcase, CheckCircle } from "lucide-react"
import { Layout } from '@/shared/layout/Layout'
import { Cotizacion, MenuCotizacionesProps, ServicioItem } from './Types'
import { cotizacionesDummy } from '@/dummy-data/cotizaciones'
import { inventarioDummyData } from '@/dummy-data/inventario'
import { serviciosDummy } from '@/dummy-data/servicio'
import { solicitudesDeServicioDummy } from '@/dummy-data/solicitud-de-servicios'

const estadoConfig = {
  pendiente: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  aprobada: { label: "Aprobada", color: "bg-green-100 text-green-800" },
  rechazada: { label: "Rechazada", color: "bg-red-100 text-red-800" },
  enviada: { label: "Enviada", color: "bg-blue-100 text-blue-800" },
  vencida: { label: "Vencida", color: "bg-gray-100 text-gray-800" },
}

const estadoSolicitudConfig = {
  pendiente: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  "en-proceso": { label: "En Proceso", color: "bg-blue-100 text-blue-800" },
  completada: { label: "Completada", color: "bg-green-100 text-green-800" },
  cancelada: { label: "Cancelada", color: "bg-red-100 text-red-800" },
}

export function MenuCotizaciones({
  cotizaciones: initialCotizaciones = cotizacionesDummy,
  onAgregar,
  onEditar,
  onEliminar,
}: MenuCotizacionesProps) {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>(initialCotizaciones)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("")
  const [filtroFechaFin, setFiltroFechaFin] = useState("")
  const [filtroCliente, setFiltroCliente] = useState("")
  const [detalleId, setDetalleId] = useState<string | null>(null)
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<string | null>(null)

  // Obtener items disponibles del inventario
  const itemsInventarioDisponibles = React.useMemo(() => 
    inventarioDummyData.filter(item => item.estado === "disponible"),
    []
  )

  // Obtener solicitudes pendientes o canceladas
  const solicitudesDisponibles = React.useMemo(() =>
    solicitudesDeServicioDummy.filter(sol => sol.estado === "pendiente" || sol.estado === "cancelada"),
    []
  )

  const [formData, setFormData] = useState<Partial<Cotizacion>>({
    numeroRef: "",
    idsolicitud: "",
    cliente: "",
    ruc: 0,
    fechaEmision: new Date().toISOString().split("T")[0],
    monto: 0,
    estado: "pendiente",
    fechaVencimiento: "",
    descripcion: "",
    validez: 30,
    objeto: [],
    servicios: []
  });

  // Cargar datos desde solicitud de servicio
  const handleSolicitudChange = (solicitudId: string) => {
    if (!solicitudId || solicitudId === "ninguna") {
      setSolicitudSeleccionada(null)
      return
    }

    const solicitud = solicitudesDeServicioDummy.find(s => s.id === solicitudId)
    if (!solicitud) return

    setSolicitudSeleccionada(solicitudId)

    // Procesar productos (inventario) - contar repeticiones
    const productosContados: Record<string, number> = {}
    solicitud.productId.forEach(prodId => {
      productosContados[prodId] = (productosContados[prodId] || 0) + 1
    })

    const inventarioDeSolicitud = Object.entries(productosContados).map(([itemId, cantidad]) => {
      const item = inventarioDummyData.find(inv => inv.id === itemId)
      return {
        itemId: itemId,
        nombre: item?.nombre || "",
        cantidad: cantidad,
        precio: item?.costo_unitario || 0,
        monto: item?.costo_unitario || 0
      }
    })

    // Procesar servicios (sin cantidad, cada servicio una sola vez)
    const serviciosUnicos = [...new Set(solicitud.serviceId)]
    const serviciosDeSolicitud: ServicioItem[] = serviciosUnicos.map(serviceId => {
      const servicio = serviciosDummy.find(s => s.id === serviceId)
      return {
        objectId: String(serviceId),
        nombre: servicio?.name || "",
        descripcion: servicio?.description || "",
        precio: servicio?.price || 0,
        monto: servicio?.price || 0,
        comentario: ""
      }
    })

    setFormData(prev => ({
      ...prev,
      idsolicitud: solicitudId,
      cliente: solicitud.companyName,
      ruc: Number(solicitud.ruc),
      descripcion: solicitud.description,
      objeto: inventarioDeSolicitud,
      servicios: serviciosDeSolicitud
    }))
  }

  const handleAddObjeto = () => {
    setFormData(prev => ({
      ...prev,
      objeto: [
        ...(prev.objeto ?? []),
        { itemId: "", nombre: "", cantidad: 1, precio: 0, monto: 0 }
      ]
    }));
  };

  const handleObjetoChange = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const updated = [...(prev.objeto ?? [])];
      
      // Si se cambia el item del inventario
      if (field === "itemId") {
        const itemSeleccionado = itemsInventarioDisponibles.find(item => item.id === value);
        if (itemSeleccionado) {
          updated[index] = {
            ...updated[index],
            itemId: value,
            nombre: itemSeleccionado.nombre,
            precio: itemSeleccionado.costo_unitario || 0,
            monto: itemSeleccionado.costo_unitario || 0
          };
        }
      } else {
        updated[index] = {
          ...updated[index],
          [field]: field === "cantidad" || field === "precio" || field === "monto"
            ? Number(value)
            : value
        };
      }
      
      return { ...prev, objeto: updated };
    });
  };

  const handleRemoveObjeto = (index: number) => {
    setFormData(prev => {
      const updated = [...(prev.objeto ?? [])];
      updated.splice(index, 1);
      return { ...prev, objeto: updated };
    });
  };

  // Gestión de servicios
  const handleAddServicio = () => {
    setFormData(prev => ({
      ...prev,
      servicios: [
        ...(prev.servicios ?? []),
        { objectId: "", nombre: "", descripcion: "", precio: 0, monto: 0, comentario: "" }
      ]
    }));
  };

  const handleServicioChange = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const updated = [...(prev.servicios ?? [])];
      
      if (field === "objectId") {
        const servicioSeleccionado = serviciosDummy.find(s => String(s.id) === value);
        if (servicioSeleccionado) {
          updated[index] = {
            ...updated[index],
            objectId: value,
            nombre: servicioSeleccionado.name,
            descripcion: servicioSeleccionado.description,
            precio: servicioSeleccionado.price,
            monto: servicioSeleccionado.price
          };
        }
      } else {
        updated[index] = {
          ...updated[index],
          [field]: field === "precio" || field === "monto" ? Number(value) : value
        };
      }
      
      return { ...prev, servicios: updated };
    });
  };

  const handleRemoveServicio = (index: number) => {
    setFormData(prev => {
      const updated = [...(prev.servicios ?? [])];
      updated.splice(index, 1);
      return { ...prev, servicios: updated };
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "monto" || name === "validez" || name === "ruc" ? Number(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Calcular monto total de la cotización
  const calcularMontoTotal = () => {
    const totalObjetos = (formData.objeto || []).reduce((sum, obj) => {
      return sum + (obj.cantidad * obj.monto)
    }, 0)
    
    const totalServicios = (formData.servicios || []).reduce((sum, serv) => {
      return sum + serv.monto
    }, 0)
    
    return totalObjetos + totalServicios
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    
    const montoTotal = calcularMontoTotal()
    
    if (editingId) {
      const updated = cotizaciones.map((c) => 
        c.id === editingId 
          ? { ...c, ...formData, monto: montoTotal } 
          : c
      )
      setCotizaciones(updated as Cotizacion[])
      onEditar?.(editingId, { 
        ...cotizaciones.find((c) => c.id === editingId)!, 
        ...formData, 
        monto: montoTotal 
      } as Cotizacion)
    } else {
      const newCotizacion: Cotizacion = {
        id: Date.now().toString(),
        numeroRef: formData.numeroRef || "",
        idsolicitud: formData.idsolicitud || "",
        cliente: formData.cliente || "",
        ruc: formData.ruc || 0,
        fechaEmision: formData.fechaEmision || "",
        monto: montoTotal,
        estado: (formData.estado as any) || "pendiente",
        fechaVencimiento: formData.fechaVencimiento || "",
        descripcion: formData.descripcion || "",
        validez: formData.validez || 30,
        objeto: formData.objeto || [],
        servicios: formData.servicios || []
      }
      setCotizaciones([...cotizaciones, newCotizacion])
      onAgregar?.(newCotizacion)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      numeroRef: "",
      idsolicitud: "",
      cliente: "",
      ruc: 0,
      fechaEmision: new Date().toISOString().split("T")[0],
      monto: 0,
      estado: "pendiente",
      fechaVencimiento: "",
      descripcion: "",
      validez: 30,
      objeto: [],
      servicios: []
    })
    setShowForm(false)
    setEditingId(null)
    setDetalleId(null)
    setSolicitudSeleccionada(null)
  }

  const handleEdit = (id: string) => {
    const cotizacion = cotizaciones.find((c) => c.id === id)
    if (cotizacion) {
      setFormData(cotizacion)
      setEditingId(id)
      setShowForm(true)
      setDetalleId(null)
    }
  }

  const handleDelete = (id: string) => {
    setCotizaciones(cotizaciones.filter((c) => c.id !== id))
    onEliminar?.(id)
  }

  const handleVerDetalle = (id: string) => {
    setDetalleId(detalleId === id ? null : id)
  }

  const cotizacionesFiltradas = cotizaciones.filter((cotizacion) => {
    const matchBusqueda =
      cotizacion.numeroRef.toLowerCase().includes(busqueda.toLowerCase()) ||
      cotizacion.cliente.toLowerCase().includes(busqueda.toLowerCase())

    const matchEstado = filtroEstado === "todos" || cotizacion.estado === filtroEstado

    const matchFecha =
      (!filtroFechaInicio || cotizacion.fechaEmision >= filtroFechaInicio) &&
      (!filtroFechaFin || cotizacion.fechaEmision <= filtroFechaFin)

    const matchCliente = !filtroCliente || cotizacion.cliente.toLowerCase().includes(filtroCliente.toLowerCase())

    return matchBusqueda && matchEstado && matchFecha && matchCliente
  })

  const cotizacionDetalle = detalleId ? cotizaciones.find((c) => c.id === detalleId) : null

  const handleExportarPDF = (cotizacion: Cotizacion) => {
    console.log("[Exportando PDF]", cotizacion)
    alert(`Exportando cotización ${cotizacion.numeroRef} a PDF...`)
  }
  
  return (
    <Layout className="w-full space-y-6" title="Gestionar Cotizaciones">
      <div className='px-5'>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gestión de Cotizaciones</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Total: {cotizacionesFiltradas.length} cotizaciones</p>
          </div>
          <Button
            onClick={() => {
              setEditingId(null)
              setShowForm(true)
              setDetalleId(null)
            }}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={20} /> Nueva Cotización
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Buscar y Filtrar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <Input
                  placeholder="Buscar por número o cliente..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="aprobada">Aprobada</SelectItem>
                  <SelectItem value="rechazada">Rechazada</SelectItem>
                  <SelectItem value="enviada">Enviada</SelectItem>
                  <SelectItem value="vencida">Vencida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm mb-2 block">Fecha de inicio</Label>
                <Input type="date" value={filtroFechaInicio} onChange={(e) => setFiltroFechaInicio(e.target.value)} />
              </div>
              <div>
                <Label className="text-sm mb-2 block">Fecha de fin</Label>
                <Input type="date" value={filtroFechaFin} onChange={(e) => setFiltroFechaFin(e.target.value)} />
              </div>
              <div>
                <Label className="text-sm mb-2 block">Cliente</Label>
                <Input
                  placeholder="Nombre del cliente..."
                  value={filtroCliente}
                  onChange={(e) => setFiltroCliente(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setBusqueda("")
                  setFiltroEstado("todos")
                  setFiltroFechaInicio("")
                  setFiltroFechaFin("")
                  setFiltroCliente("")
                }}
              >
                <Filter size={16} /> Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {showForm && (
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
            <CardHeader>
              <CardTitle>{editingId ? "Editar" : "Nueva"} Cotización</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitForm} className="space-y-6">
                {/* Tabla de Solicitudes de Servicio */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Seleccionar Solicitud de Servicio (Opcional)
                  </h3>
                  
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-slate-100">
                          <th className="px-4 py-2 text-left">Seleccionar</th>
                          <th className="px-4 py-2 text-left">ID Solicitud</th>
                          <th className="px-4 py-2 text-left">RUC</th>
                          <th className="px-4 py-2 text-left">Email</th>
                          <th className="px-4 py-2 text-left">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {solicitudesDisponibles.map((solicitud) => (
                          <tr 
                            key={solicitud.id} 
                            className={`border-b hover:bg-slate-50 cursor-pointer ${
                              solicitudSeleccionada === solicitud.id ? "bg-blue-100" : ""
                            }`}
                            onClick={() => handleSolicitudChange(solicitud.id)}
                          >
                            <td className="px-4 py-2">
                              <input
                                type="radio"
                                checked={solicitudSeleccionada === solicitud.id}
                                onChange={() => handleSolicitudChange(solicitud.id)}
                                className="w-4 h-4"
                              />
                            </td>
                            <td className="px-4 py-2 font-medium">{solicitud.id}</td>
                            <td className="px-4 py-2">{solicitud.ruc}</td>
                            <td className="px-4 py-2">{solicitud.email}</td>
                            <td className="px-4 py-2">
                              <Badge className={estadoSolicitudConfig[solicitud.estado]?.color}>
                                {estadoSolicitudConfig[solicitud.estado]?.label}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {solicitudSeleccionada && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-900">
                        ✓ Solicitud seleccionada. Los productos y servicios se han cargado automáticamente.
                      </p>
                    </div>
                  )}
                </div>

                {/* Información Básica */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Número de Referencia *</Label>
                    <Input
                      name="numeroRef"
                      value={formData.numeroRef || ""}
                      onChange={handleFormChange}
                      placeholder="COT-2025-001"
                      required
                    />
                  </div>
                  <div>
                    <Label>Cliente *</Label>
                    <Input
                      name="cliente"
                      value={formData.cliente || ""}
                      onChange={handleFormChange}
                      placeholder="Nombre del cliente"
                      required
                    />
                  </div>
                  <div>
                    <Label>RUC *</Label>
                    <Input
                      name="ruc"
                      type="number"
                      value={formData.ruc || ""}
                      onChange={handleFormChange}
                      placeholder="20123456789"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Descripción *</Label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion || ""}
                    onChange={handleFormChange}
                    placeholder="Descripción detallada del proyecto..."
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    required
                  />
                </div>

                {/* Items del Inventario */}
                <div className="space-y-4 p-4 bg-white rounded-lg border">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      <Label className="font-semibold text-lg">Items del Inventario a Cotizar</Label>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddObjeto}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <Plus size={18} className="mr-2" /> Agregar Item
                    </Button>
                  </div>

                  {(formData.objeto ?? []).length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No hay items agregados. Haz clic en "Agregar Item" para comenzar.
                    </p>
                  ) : (
                    (formData.objeto ?? []).map((obj, index) => {
                      const itemInventario = itemsInventarioDisponibles.find(item => item.id === obj.itemId)
                      
                      return (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg border space-y-4"
                        >
                          <div>
                            <Label>Item del Inventario *</Label>
                            <Select
                              value={obj.itemId}
                              onValueChange={(value) => handleObjetoChange(index, "itemId", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un item del inventario" />
                              </SelectTrigger>
                              <SelectContent>
                                {itemsInventarioDisponibles.map((item) => (
                                  <SelectItem key={item.id} value={item.id}>
                                    {item.nombre} ({item.id}) - ${item.costo_unitario?.toFixed(2)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {itemInventario && (
                              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                                <p><strong>Fabricante:</strong> {itemInventario.fabricante}</p>
                                <p><strong>Stock disponible:</strong> {itemInventario.cantidad} unidades</p>
                                <p><strong>Categoría:</strong> {itemInventario.categoria || "N/A"}</p>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <Label>Precio Real (Costo)</Label>
                              <Input 
                                type="number" 
                                value={obj.precio} 
                                readOnly 
                                className="bg-gray-100"
                              />
                            </div>

                            <div>
                              <Label>Cantidad *</Label>
                              <Input
                                type="number"
                                value={obj.cantidad}
                                min={1}
                                max={itemInventario?.cantidad || 999}
                                onChange={(e) =>
                                  handleObjetoChange(index, "cantidad", e.target.value)
                                }
                                required
                              />
                              {itemInventario && obj.cantidad > itemInventario.cantidad && (
                                <p className="text-xs text-red-600 mt-1">
                                  Stock insuficiente (disponible: {itemInventario.cantidad})
                                </p>
                              )}
                            </div>

                            <div>
                              <Label>Precio Cotizado (USD) *</Label>
                              <Input
                                type="number"
                                value={obj.monto}
                                min={0}
                                step="0.01"
                                onChange={(e) =>
                                  handleObjetoChange(index, "monto", e.target.value)
                                }
                                required
                              />
                            </div>

                            <div>
                              <Label>Subtotal</Label>
                              <Input
                                type="number"
                                readOnly
                                value={((obj.cantidad ?? 0) * (obj.monto ?? 0)).toFixed(2)}
                                className="bg-gray-100 font-semibold"
                              />
                            </div>
                          </div>

                          {obj.precio > 0 && obj.monto > 0 && (
                            <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                              <p className="font-medium text-green-800">
                                Margen: ${((obj.monto - obj.precio) * obj.cantidad).toFixed(2)} 
                                ({(((obj.monto - obj.precio) / obj.precio) * 100).toFixed(1)}%)
                              </p>
                            </div>
                          )}

                          <div className="flex justify-end pt-2 border-t">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveObjeto(index)}
                            >
                              <Trash2 size={16} className="mr-2" /> Eliminar Item
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>

                {/* Servicios Cotizados */}
                <div className="space-y-4 p-4 bg-white rounded-lg border">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                      <Label className="font-semibold text-lg">Servicios Pedidos a Cotizar</Label>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddServicio}
                      className="bg-purple-600 hover:bg-purple-700"
                      size="sm"
                    >
                      <Plus size={18} className="mr-2" /> Agregar Servicio
                    </Button>
                  </div>

                  {(formData.servicios ?? []).length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No hay servicios agregados. Haz clic en "Agregar Servicio" para comenzar.
                    </p>
                  ) : (
                    (formData.servicios ?? []).map((serv, index) => {
                      const servicioData = serviciosDummy.find(s => String(s.id) === serv.objectId)
                      
                      return (
                        <div
                          key={index}
                          className="p-4 bg-purple-50 rounded-lg border space-y-4"
                        >
                          <div>
                            <Label>Servicio *</Label>
                            <Select
                              value={serv.objectId}
                              onValueChange={(value) => handleServicioChange(index, "objectId", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un servicio" />
                              </SelectTrigger>
                              <SelectContent>
                                {serviciosDummy.map((servicio) => (
                                  <SelectItem key={servicio.id} value={String(servicio.id)}>
                                    {servicio.name} - ${servicio.price}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {servicioData && (
                              <div className="mt-2 p-2 bg-purple-100 border border-purple-200 rounded text-xs">
                            <p><strong>Descripción:</strong> {servicioData.description}</p>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Precio Real</Label>
                          <Input 
                            type="number" 
                            value={serv.precio} 
                            readOnly 
                            className="bg-gray-100"
                          />
                        </div>

                        <div>
                          <Label>Precio Cotizado (USD) *</Label>
                          <Input
                            type="number"
                            value={serv.monto}
                            min={0}
                            step="0.01"
                            onChange={(e) =>
                              handleServicioChange(index, "monto", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Comentario</Label>
                        <textarea
                          value={serv.comentario}
                          onChange={(e) =>
                            handleServicioChange(index, "comentario", e.target.value)
                          }
                          placeholder="Comentarios o especificaciones del servicio..."
                          className="w-full p-2 border rounded-md"
                          rows={2}
                        />
                      </div>

                      {serv.precio > 0 && serv.monto > 0 && (
                        <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                          <p className="font-medium text-green-800">
                            Margen: ${(serv.monto - serv.precio).toFixed(2)} 
                            ({(((serv.monto - serv.precio) / serv.precio) * 100).toFixed(1)}%)
                          </p>
                        </div>
                      )}

                      <div className="flex justify-end pt-2 border-t">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveServicio(index)}
                        >
                          <Trash2 size={16} className="mr-2" /> Eliminar Servicio
                        </Button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Resumen total */}
            {((formData.objeto ?? []).length > 0 || (formData.servicios ?? []).length > 0) && (
              <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-semibold text-blue-900">
                      Monto Total de la Cotización:
                    </span>
                    <p className="text-xs text-blue-700 mt-1">
                      Productos: ${(formData.objeto || []).reduce((sum, obj) => sum + (obj.cantidad * obj.monto), 0).toFixed(2)} + 
                      Servicios: ${(formData.servicios || []).reduce((sum, serv) => sum + serv.monto, 0).toFixed(2)}
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-blue-600">
                    ${calcularMontoTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Validez (días)</Label>
                <Input
                  name="validez"
                  type="number"
                  value={formData.validez || 30}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <Label>Fecha de Emisión</Label>
                <Input
                  name="fechaEmision"
                  type="date"
                  value={formData.fechaEmision || ""}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <Label>Estado</Label>
                <Select
                  value={formData.estado || "pendiente"}
                  onValueChange={(value) => handleSelectChange("estado", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="aprobada">Aprobada</SelectItem>
                    <SelectItem value="rechazada">Rechazada</SelectItem>
                    <SelectItem value="enviada">Enviada</SelectItem>
                    <SelectItem value="vencida">Vencida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Fecha de Vencimiento</Label>
                <Input
                  name="fechaVencimiento"
                  type="date"
                  value={formData.fechaVencimiento || ""}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingId ? "Actualizar" : "Crear"} Cotización
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )}

    {cotizacionDetalle && (
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Detalles de Cotización: {cotizacionDetalle.numeroRef}</CardTitle>
              <CardDescription>Cliente: {cotizacionDetalle.cliente}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setDetalleId(null)}>
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-sm text-slate-600 mb-3">Información General</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-500">Número:</span>
                  <p className="font-medium">{cotizacionDetalle.numeroRef}</p>
                </div>
                <div>
                  <span className="text-slate-500">Cliente:</span>
                  <p className="font-medium">{cotizacionDetalle.cliente}</p>
                </div>
                <div>
                  <span className="text-slate-500">Fecha de Emisión:</span>
                  <p className="font-medium">{cotizacionDetalle.fechaEmision}</p>
                </div>
                <div>
                  <span className="text-slate-500">Fecha de Vencimiento:</span>
                  <p className="font-medium">{cotizacionDetalle.fechaVencimiento || "No especificada"}</p>
                </div>
                <div>
                  <span className="text-slate-500">Estado:</span>
                  <p className="font-medium">
                    <Badge className={estadoConfig[cotizacionDetalle.estado]?.color}>
                      {estadoConfig[cotizacionDetalle.estado]?.label}
                    </Badge>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-slate-600 mb-3">Monto y Validez</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <span className="text-slate-500">Monto Total:</span>
                  <p className="text-2xl font-bold text-blue-600">${cotizacionDetalle.monto.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-slate-500">Validez:</span>
                  <p className="font-medium">{cotizacionDetalle.validez} días</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-slate-600 mb-3">Descripción</h3>
            <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg">{cotizacionDetalle.descripcion}</p>
          </div>

          {/* Detalle de Items */}
          <div>
            <h3 className="font-semibold text-sm text-slate-600 mb-3">Items Cotizados ({cotizacionDetalle.objeto.length})</h3>
            <div className="space-y-2">
              {cotizacionDetalle.objeto.map((item, index) => {
                const itemInventario = inventarioDummyData.find(inv => inv.id === item.itemId)
                return (
                  <div key={index} className="p-3 bg-slate-50 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{item.nombre}</p>
                        {itemInventario && (
                          <p className="text-xs text-slate-500">
                            {itemInventario.fabricante} - ID: {item.itemId}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          ${(item.cantidad * item.monto).toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.cantidad} × ${item.monto.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button size="sm" variant="outline" onClick={() => handleEdit(cotizacionDetalle.id)}>
              <Pencil size={16} className="mr-2" /> Editar
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleExportarPDF(cotizacionDetalle)}>
              <Download size={16} className="mr-2" /> Exportar PDF
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                handleDelete(cotizacionDetalle.id)
                setDetalleId(null)
              }}
            >
              <Trash2 size={16} className="mr-2" /> Eliminar
            </Button>
          </div>
        </CardContent>
      </Card>
    )}

    <div className="space-y-3">
      {cotizacionesFiltradas.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-500">
              {cotizaciones.length === 0
                ? "No hay cotizaciones creadas"
                : "No hay cotizaciones que coincidan con los filtros"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 dark:bg-slate-900">
                <th className="px-4 py-3 text-left font-semibold">Número</th>
                <th className="px-4 py-3 text-left font-semibold">Cliente</th>
                <th className="px-4 py-3 text-left font-semibold">Fecha Emisión</th>
                <th className="px-4 py-3 text-right font-semibold">Monto</th>
                <th className="px-4 py-3 text-left font-semibold">Estado</th>
                <th className="px-4 py-3 text-left font-semibold">Vencimiento</th>
                <th className="px-4 py-3 text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cotizacionesFiltradas.map((cotizacion) => (
                <tr key={cotizacion.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-900">
                  <td className="px-4 py-3 font-medium text-blue-600">{cotizacion.numeroRef}</td>
                  <td className="px-4 py-3">{cotizacion.cliente}</td>
                  <td className="px-4 py-3">{cotizacion.fechaEmision}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">
                    ${cotizacion.monto.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={estadoConfig[cotizacion.estado]?.color}>
                      {estadoConfig[cotizacion.estado]?.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{cotizacion.fechaVencimiento || "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVerDetalle(cotizacion.id)}
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(cotizacion.id)} title="Editar">
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(cotizacion.id)}
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</Layout>
)
}