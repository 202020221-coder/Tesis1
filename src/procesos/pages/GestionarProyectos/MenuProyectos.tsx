import React from 'react'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Badge } from "@/shared/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, Plus, Pencil, Trash2, Eye, Download, Filter, FolderKanban, Truck, Package, Users, Upload, X, AlertCircle } from "lucide-react"
import { Layout } from '@/shared/layout/Layout'
import { Proyecto, MenuProyectosProps, InventarioProyecto } from './Types'
import { proyectosDummyData, getProyectosStats } from '@/dummy-data/proyectos'
import { cotizacionesDummy } from '@/dummy-data/cotizaciones'
import { camionesDummyData } from '@/dummy-data/camiones'
import { inventarioDummyData } from '@/dummy-data/inventario'
import { clientesDummyData } from '@/dummy-data/clientes'
import { personnelDummyData } from '@/dummy-data/personal'

const estadoConfig = {
  planificacion: { label: "Planificación", color: "bg-yellow-100 text-yellow-800" },
  en_curso: { label: "En Curso", color: "bg-blue-100 text-blue-800" },
  completado: { label: "Completado", color: "bg-green-100 text-green-800" },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-800" },
  pausado: { label: "Pausado", color: "bg-orange-100 text-orange-800" },
}

export function MenuProyectos({
  proyectos: initialProyectos = proyectosDummyData,
  onAgregar,
  onEditar,
  onEliminar,
}: MenuProyectosProps) {
  const [proyectos, setProyectos] = useState<Proyecto[]>(initialProyectos)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [filtroCliente, setFiltroCliente] = useState<string>("todos")
  const [detalleId, setDetalleId] = useState<string | null>(null)

  const stats = React.useMemo(() => getProyectosStats(), [])

  // Obtener cotizaciones aprobadas y vigentes
  const cotizacionesAprobadas = React.useMemo(() => {
    const hoy = new Date().toISOString().split('T')[0]
    return cotizacionesDummy.filter(cot => 
      cot.estado === "aprobada" 
     
     //  && (!cot.fechaVencimiento || cot.fechaVencimiento >= hoy)
    )
  }, [])

  const [formData, setFormData] = useState<Partial<Proyecto>>({
    id: "",
    cotizacion: undefined,
    camiones: [],
    inventario_proyecto: [],
    cliente: "",
    informe_final: undefined,
    factura: undefined,
    comentarios: "",
    ubicacion: "",
    servicio_brindado: "",
    fecha_inicio: new Date().toISOString().split("T")[0],
    fecha_finalizacion: undefined,
    estado: "planificacion",
    monto_total: 0,
    fechaCreacion: new Date().toISOString().split("T")[0]
  });

  // Cargar inventario de cotizacion seleccionada
  const handleCotizacionChange = (cotizacionId: string) => {
    const cotizacion = cotizacionesDummy.find(c => c.id === cotizacionId)
    if (cotizacion) {
      const inventarioDeCotizacion: InventarioProyecto[] = cotizacion.objeto.map(obj => ({
        id_objeto: obj.itemId,
        nombreObjeto: obj.nombre,
        cantidad: obj.cantidad,
        origen: "cotizacion" as const
      }))

      setFormData(prev => ({
        ...prev,
        cotizacion: cotizacionId,
        cliente: cotizacion.cliente || prev.cliente,
        inventario_proyecto: inventarioDeCotizacion,
        monto_total: cotizacion.monto,
        servicio_brindado: cotizacion.descripcion
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        cotizacion: undefined,
        inventario_proyecto: []
      }))
    }
  }

  // Gestión de camiones
  const handleToggleCamion = (camionId: string) => {
    setFormData(prev => {
      const camiones = prev.camiones || []
      const exists = camiones.includes(camionId)
      
      return {
        ...prev,
        camiones: exists 
          ? camiones.filter(id => id !== camionId)
          : [...camiones, camionId]
      }
    })
  }

  // Gestión de inventario adicional
  const handleAddInventarioItem = () => {
    setFormData(prev => ({
      ...prev,
      inventario_proyecto: [
        ...(prev.inventario_proyecto || []),
        { id_objeto: "", nombreObjeto: "", cantidad: 1, origen: "adicional" }
      ]
    }))
  }

  const handleRemoveInventarioItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inventario_proyecto: (prev.inventario_proyecto || []).filter((_, i) => i !== index)
    }))
  }

  const handleInventarioChange = (index: number, field: keyof InventarioProyecto, value: any) => {
    setFormData(prev => {
      const updated = [...(prev.inventario_proyecto || [])]
      
      if (field === "id_objeto") {
        const item = inventarioDummyData.find(inv => inv.id === value)
        updated[index] = {
          ...updated[index],
          id_objeto: value,
          nombreObjeto: item?.nombre || ""
        }
      } else {
        updated[index] = {
          ...updated[index],
          [field]: field === "cantidad" ? Number(value) : value
        }
      }
      
      return { ...prev, inventario_proyecto: updated }
    })
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "monto_total" ? Number(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }))
    }
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      const updated = proyectos.map((p) => 
        p.id === editingId ? { ...p, ...formData } : p
      )
      setProyectos(updated as Proyecto[])
      onEditar?.(editingId, { ...proyectos.find((p) => p.id === editingId)!, ...formData } as Proyecto)
    } else {
      const newProyecto: Proyecto = {
        id: `PROJ-${String(proyectos.length + 1).padStart(3, '0')}`,
        cotizacion: formData.cotizacion,
        camiones: formData.camiones || [],
        inventario_proyecto: formData.inventario_proyecto || [],
        cliente: formData.cliente || "",
        informe_final: formData.informe_final,
        factura: formData.factura,
        comentarios: formData.comentarios,
        ubicacion: formData.ubicacion || "",
        servicio_brindado: formData.servicio_brindado || "",
        fecha_inicio: formData.fecha_inicio || "",
        fecha_finalizacion: formData.fecha_finalizacion,
        estado: (formData.estado as any) || "planificacion",
        monto_total: formData.monto_total || 0,
        fechaCreacion: formData.fechaCreacion,
        personal_asignado: formData.personal_asignado || []
      }
      setProyectos([...proyectos, newProyecto])
      onAgregar?.(newProyecto)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      id: "",
      cotizacion: undefined,
      camiones: [],
      inventario_proyecto: [],
      personal_asignado: [], // Agregar esta línea
      cliente: "",
      informe_final: undefined,
      factura: undefined,
      comentarios: "",
      ubicacion: "",
      servicio_brindado: "",
      fecha_inicio: new Date().toISOString().split("T")[0],
      fecha_finalizacion: undefined,
      estado: "planificacion",
      monto_total: 0,
      fechaCreacion: new Date().toISOString().split("T")[0]
    })
    setShowForm(false)
    setEditingId(null)
    setDetalleId(null)
  }

  const handleEdit = (id: string) => {
    const proyecto = proyectos.find((p) => p.id === id)
    if (proyecto) {
      setFormData(proyecto)
      setEditingId(id)
      setShowForm(true)
      setDetalleId(null)
    }
  }

  const handleDelete = (id: string) => {
    setProyectos(proyectos.filter((p) => p.id !== id))
    onEliminar?.(id)
  }

  const handleVerDetalle = (id: string) => {
    setDetalleId(detalleId === id ? null : id)
  }

  const proyectosFiltrados = proyectos.filter((proyecto) => {
    const matchBusqueda =
      proyecto.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      proyecto.servicio_brindado.toLowerCase().includes(busqueda.toLowerCase()) ||
      proyecto.ubicacion.toLowerCase().includes(busqueda.toLowerCase())

    const matchEstado = filtroEstado === "todos" || proyecto.estado === filtroEstado
    const matchCliente = filtroCliente === "todos" || proyecto.cliente === filtroCliente

    return matchBusqueda && matchEstado && matchCliente
  })

  const proyectoDetalle = detalleId ? proyectos.find((p) => p.id === detalleId) : null

  return (
    <Layout className="w-full space-y-6" title="Gestionar Proyectos">
      <div className='px-5'>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <FolderKanban className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gestión de Proyectos</h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Total: {proyectosFiltrados.length} proyectos</p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-3">
            <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-600 font-medium">En Curso</p>
              <p className="text-xl font-bold text-blue-700">{stats.enCurso}</p>
            </div>
            <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-600 font-medium">Completados</p>
              <p className="text-xl font-bold text-green-700">{stats.completados}</p>
            </div>
            <div className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-xs text-purple-600 font-medium">Monto Total</p>
              <p className="text-xl font-bold text-purple-700">${(stats.montoTotal / 1000).toFixed(0)}
                K</p>
                </div>
                </div>
                </div>
                <div className="flex justify-end">
      <Button
        onClick={() => {
          setEditingId(null)
          setShowForm(true)
          setDetalleId(null)
        }}
        className="gap-2 bg-blue-600 hover:bg-blue-700"
      >
        <Plus size={20} /> Nuevo Proyecto
      </Button>
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Buscar y Filtrar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <Input
              placeholder="Buscar por ID, servicio o ubicación..."
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
              <SelectItem value="planificacion">Planificación</SelectItem>
              <SelectItem value="en_curso">En Curso</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
              <SelectItem value="pausado">Pausado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filtroCliente} onValueChange={setFiltroCliente}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los clientes</SelectItem>
              {clientesDummyData.map(cliente => (
                <SelectItem key={cliente.ruc} value={cliente.ruc}>
                  {cliente.razonSocial}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setBusqueda("")
              setFiltroEstado("todos")
              setFiltroCliente("todos")
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
              <CardTitle>{editingId ? "Editar" : "Nuevo"} Proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitForm} className="space-y-6">
                {/* Sección: Información Básica */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2 flex items-center gap-2">
                    <FolderKanban className="w-5 h-5" />
                    Información Básica del Proyecto
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Cotización Asociada (Opcional)</Label>
                      <Select
                        value={formData.cotizacion || "ninguna"}
                        onValueChange={(value) => {
                          if (value === "ninguna") {
                            setFormData(prev => ({
                              ...prev,
                              cotizacion: undefined,
                              inventario_proyecto: []
                            }))
                          } else {
                            handleCotizacionChange(value)
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sin cotización" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ninguna">Sin cotización asociada</SelectItem>
                          {cotizacionesAprobadas.map(cot => (
                            <SelectItem key={cot.id} value={cot.id}>
                              {cot.numeroRef} - {cot.cliente} (${cot.monto})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.cotizacion && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Inventario cargado automáticamente desde cotización
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Cliente (RUC) *</Label>
                      <Select
                        value={formData.cliente}
                        onValueChange={(value) => handleSelectChange("cliente", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientesDummyData.filter(c => c.estado === "activo").map(cliente => (
                            <SelectItem key={cliente.ruc} value={cliente.ruc}>
                              {cliente.razonSocial} ({cliente.ruc})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <Label>Servicio Brindado *</Label>
                      <Input
                        name="servicio_brindado"
                        value={formData.servicio_brindado}
                        onChange={handleFormChange}
                        placeholder="Descripción del servicio a brindar..."
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Ubicación *</Label>
                      <Input
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleFormChange}
                        placeholder="Dirección donde se realizará el proyecto..."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Sección: Fechas y Estado */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">Fechas y Estado</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Fecha de Inicio *</Label>
                      <Input
                        name="fecha_inicio"
                        type="date"
                        value={formData.fecha_inicio}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div>
                      <Label>Fecha de Finalización</Label>
                      <Input
                        name="fecha_finalizacion"
                        type="date"
                        value={formData.fecha_finalizacion || ""}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div>
                      <Label>Estado *</Label>
                      <Select
                        value={formData.estado}
                        onValueChange={(value) => handleSelectChange("estado", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planificacion">📋 Planificación</SelectItem>
                          <SelectItem value="en_curso">🚀 En Curso</SelectItem>
                          <SelectItem value="completado">✅ Completado</SelectItem>
                          <SelectItem value="pausado">⏸️ Pausado</SelectItem>
                          <SelectItem value="cancelado">❌ Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Monto Total (USD)</Label>
                      <Input
                        name="monto_total"
                        type="number"
                        value={formData.monto_total}
                        onChange={handleFormChange}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Sección: Camiones Asignados */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Camiones Asignados ({(formData.camiones || []).length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {camionesDummyData.filter(c => c.estado === "disponible" || (formData.camiones || []).includes(c.id)).map(camion => (
                      <div
                        key={camion.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          (formData.camiones || []).includes(camion.id)
                            ? "bg-blue-100 border-blue-500"
                            : "bg-white hover:bg-slate-50"
                        }`}
                        onClick={() => handleToggleCamion(camion.id)}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={(formData.camiones || []).includes(camion.id)}
                            onChange={() => {}}
                            className="w-4 h-4"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{camion.placa}</p>
                            <p className="text-xs text-slate-500">{camion.marca} {camion.modelo}</p>
                          </div>
                          <Badge className={
                            camion.estado === "disponible" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }>
                            {camion.estado}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Sección: Personal Asignado */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Personal Asignado ({(formData.personal_asignado || []).length})
                    </h3>
                    <Button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          personal_asignado: [
                            ...(prev.personal_asignado || []),
                            {
                              personalId: "",
                              nombrePersonal: "",
                              role: "",
                              startDate: formData.fecha_inicio || "",
                              dedicationPercentage: 100
                            }
                          ]
                        }))
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <Plus size={16} className="mr-2" /> Asignar Personal
                    </Button>
                  </div>

                  {(formData.personal_asignado || []).length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No hay personal asignado al proyecto. Haz clic en "Asignar Personal" para comenzar.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {(formData.personal_asignado || []).map((personal, index) => {
                        const personalData = personnelDummyData.find(p => p.id === personal.personalId)
                        
                        return (
                          <div
                            key={index}
                            className="p-4 bg-slate-50 rounded-lg border space-y-3"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="md:col-span-2">
                                <Label>Personal *</Label>
                                <Select
                                  value={personal.personalId}
                                  onValueChange={(value) => {
                                    const selected = personnelDummyData.find(p => p.id === value)
                                    setFormData(prev => {
                                      const updated = [...(prev.personal_asignado || [])]
                                      updated[index] = {
                                        ...updated[index],
                                        personalId: value,
                                        nombrePersonal: selected?.name || ""
                                      }
                                      return { ...prev, personal_asignado: updated }
                                    })
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona personal" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {personnelDummyData.filter(p => p.status === "active").map(p => (
                                      <SelectItem key={p.id} value={p.id}>
                                        {p.name} - {p.role}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {personalData && (
                                  <p className="text-xs text-slate-500 mt-1">
                                    {personalData.role} - {personalData.area}
                                  </p>
                                )}
                              </div>

                              <div>
                                <Label>Rol en el Proyecto *</Label>
                                <Input
                                  value={personal.role}
                                  onChange={(e) => {
                                    setFormData(prev => {
                                      const updated = [...(prev.personal_asignado || [])]
                                      updated[index] = { ...updated[index], role: e.target.value }
                                      return { ...prev, personal_asignado: updated }
                                    })
                                  }}
                                  placeholder="Ej: Supervisor de Proyecto"
                                  required
                                />
                              </div>

                              <div>
                                <Label>% Dedicación (0-100) *</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  max="100"
                                  value={personal.dedicationPercentage}
                                  onChange={(e) => {
                                    setFormData(prev => {
                                      const updated = [...(prev.personal_asignado || [])]
                                      updated[index] = { 
                                        ...updated[index], 
                                        dedicationPercentage: Number(e.target.value) 
                                      }
                                      return { ...prev, personal_asignado: updated }
                                    })
                                  }}
                                  required
                                />
                              </div>

                              <div>
                                <Label>Fecha de Inicio *</Label>
                                <Input
                                  type="date"
                                  value={personal.startDate}
                                  onChange={(e) => {
                                    setFormData(prev => {
                                      const updated = [...(prev.personal_asignado || [])]
                                      updated[index] = { ...updated[index], startDate: e.target.value }
                                      return { ...prev, personal_asignado: updated }
                                    })
                                  }}
                                  required
                                />
                              </div>

                              <div>
                                <Label>Fecha de Fin (Opcional)</Label>
                                <Input
                                  type="date"
                                  value={personal.endDate || ""}
                                  onChange={(e) => {
                                    setFormData(prev => {
                                      const updated = [...(prev.personal_asignado || [])]
                                      updated[index] = { ...updated[index], endDate: e.target.value || undefined }
                                      return { ...prev, personal_asignado: updated }
                                    })
                                  }}
                                />
                              </div>
                            </div>

                            <div className="flex justify-end pt-2 border-t">
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    personal_asignado: (prev.personal_asignado || []).filter((_, i) => i !== index)
                                  }))
                                }}
                              >
                                <Trash2 size={14} className="mr-2" /> Eliminar
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
                {/* Sección: Inventario del Proyecto */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Inventario del Proyecto ({(formData.inventario_proyecto || []).length} items)
                    </h3>
                    <Button
                      type="button"
                      onClick={handleAddInventarioItem}
                      variant="outline"
                      size="sm"
                    >
                      <Plus size={16} className="mr-2" /> Agregar Item
                    </Button>
                  </div>

                  {formData.cotizacion && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                        Items cargados desde la cotización. Puedes agregar items adicionales si es necesario.
                      </p>
                    </div>
                  )}

                  {(formData.inventario_proyecto || []).length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No hay items en el inventario del proyecto. Haz clic en "Agregar Item" para comenzar.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {(formData.inventario_proyecto || []).map((item, index) => {
                        const itemInventario = inventarioDummyData.find(inv => inv.id === item.id_objeto)
                        const origenDeCotizacion = item.origen === "cotizacion"
                        
                        return (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border space-y-3 ${
                              origenDeCotizacion 
                                ? "bg-blue-50 border-blue-200" 
                                : "bg-slate-50 border-slate-200"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <Badge className={
                                origenDeCotizacion 
                                  ? "bg-blue-200 text-blue-800" 
                                  : "bg-slate-200 text-slate-800"
                              }>
                                {origenDeCotizacion ? "De Cotización" : "Adicional"}
                              </Badge>
                              {!origenDeCotizacion && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleRemoveInventarioItem(index)}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Item del Inventario *</Label>
                                <Select
                                  value={item.id_objeto}
                                  onValueChange={(value) => handleInventarioChange(index, "id_objeto", value)}
                                  disabled={origenDeCotizacion}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un item" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {inventarioDummyData.filter(inv => inv.estado === "disponible").map(inv => (
                                      <SelectItem key={inv.id} value={inv.id}>
                                        {inv.nombre} ({inv.id}) - Stock: {inv.cantidad}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {itemInventario && (
                                  <p className="text-xs text-slate-500 mt-1">
                                    {itemInventario.fabricante} - Stock disponible: {itemInventario.cantidad}
                                  </p>
                                )}
                              </div>

                              <div>
                                <Label>Cantidad *</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  max={itemInventario?.cantidad || 999}
                                  value={item.cantidad}
                                  onChange={(e) => handleInventarioChange(index, "cantidad", e.target.value)}
                                  disabled={origenDeCotizacion}
                                  required
                                />
                                {itemInventario && item.cantidad > itemInventario.cantidad && (
                                  <p className="text-xs text-red-600 mt-1">
                                    ⚠️ Stock insuficiente (disponible: {itemInventario.cantidad})
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Sección: Documentos */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">Documentos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Informe Final (PDF)</Label>
                      <div className="mt-2">
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "informe_final")}
                        />
                        {formData.informe_final && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ {typeof formData.informe_final === 'string' ? formData.informe_final : formData.informe_final.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Factura (PDF)</Label>
                      <div className="mt-2">
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "factura")}
                        />
                        {formData.factura && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ {typeof formData.factura === 'string' ? formData.factura : formData.factura.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección: Comentarios */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">Comentarios y Notas</h3>
                  <div>
                    <Label>Comentarios</Label>
                    <textarea
                      name="comentarios"
                      value={formData.comentarios}
                      onChange={handleFormChange}
                      placeholder="Notas, observaciones, detalles adicionales del proyecto..."
                      className="w-full p-3 border rounded-md"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingId ? "Actualizar" : "Crear"} Proyecto
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {proyectoDetalle && (
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Detalles del Proyecto: {proyectoDetalle.id}</CardTitle>
                  <CardDescription>
                    {clientesDummyData.find(c => c.ruc === proyectoDetalle.cliente)?.razonSocial}
                  </CardDescription>
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
                      <span className="text-slate-500">ID Proyecto:</span>
                      <p className="font-medium font-mono">{proyectoDetalle.id}</p>
                    </div>
                    {proyectoDetalle.cotizacion && (
                      <div>
                        <span className="text-slate-500">Cotización:</span>
                        <p className="font-medium">
                          {cotizacionesDummy.find(c => c.id === proyectoDetalle.cotizacion)?.numeroRef || proyectoDetalle.cotizacion}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-500">Cliente:</span>
                      <p className="font-medium">
                        {clientesDummyData.find(c => c.ruc === proyectoDetalle.cliente)?.razonSocial}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Servicio:</span>
                      <p className="font-medium">{proyectoDetalle.servicio_brindado}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Ubicación:</span>
                      <p className="font-medium">{proyectoDetalle.ubicacion}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Estado:</span>
                      <p className="font-medium">
                        <Badge className={estadoConfig[proyectoDetalle.estado || 'planificacion']?.color}>
                          {estadoConfig[proyectoDetalle.estado || 'planificacion']?.label}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-slate-600 mb-3">Fechas y Monto</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500">Fecha de Inicio:</span>
                      <p className="font-medium">{proyectoDetalle.fecha_inicio}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Fecha de Finalización:</span>
                      <p className="font-medium">{proyectoDetalle.fecha_finalizacion || "En curso"}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <span className="text-slate-500">Monto Total:</span>
                      <p className="text-2xl font-bold text-blue-600">${proyectoDetalle.monto_total?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Camiones Asignados */}
              {proyectoDetalle.camiones.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-slate-600 mb-3 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Camiones Asignados ({proyectoDetalle.camiones.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {proyectoDetalle.camiones.map(camionId => {
                      const camion = camionesDummyData.find(c => c.id === camionId)
                      return camion ? (
                        <div key={camionId} className="p-3 bg-slate-50 rounded-lg border">
                          <p className="font-semibold">{camion.placa}</p>
                          <p className="text-xs text-slate-500">{camion.marca} {camion.modelo}</p>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              )}
              {/* Personal Asignado */}
              {proyectoDetalle.personal_asignado && proyectoDetalle.personal_asignado.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-slate-600 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Personal Asignado ({proyectoDetalle.personal_asignado.length})
                  </h3>
                  <div className="space-y-2">
                    {proyectoDetalle.personal_asignado.map((personal, index) => {
                      const personalData = personnelDummyData.find(p => p.id === personal.personalId)
                      return (
                        <div key={index} className="p-3 bg-slate-50 rounded-lg border">
                        <div className="flex justify-between items-start">
                        <div className="flex-1">
                        <p className="font-medium">
                        {personal.nombrePersonal || personalData?.name || "Personal no encontrado"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                        {personal.role} - {personal.dedicationPercentage}% dedicación
                        </p>
                        <p className="text-xs text-slate-500">
                        {personal.startDate} {personal.endDate ?  "${personal.endDate}" : "(En curso)"}
                        </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                        ID: {personal.personalId}
                        </Badge>
                        </div>
                        </div>
                        )
                        })}
                        </div>
                        </div>
                        )}
              {/* Inventario del Proyecto */}
              {proyectoDetalle.inventario_proyecto.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-slate-600 mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Inventario del Proyecto ({proyectoDetalle.inventario_proyecto.length} items)
                  </h3>
                  <div className="space-y-2">
                    {proyectoDetalle.inventario_proyecto.map((item, index) => (
                      <div key={index} className="p-3 bg-slate-50 rounded-lg border flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            {item.nombreObjeto || inventarioDummyData.find(inv => inv.id === item.id_objeto)?.nombre}
                          </p>
                          <p className="text-xs text-slate-500">ID: {item.id_objeto}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Cantidad: {item.cantidad}</p>
                          <Badge className={
                            item.origen === "cotizacion" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-slate-200 text-slate-800"
                          }>
                            {item.origen === "cotizacion" ? "De Cotización" : "Adicional"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documentos */}
              <div>
                <h3 className="font-semibold text-sm text-slate-600 mb-3">Documentos</h3>
                <div className="flex gap-3">
                  {proyectoDetalle.informe_final && (
                    <Button size="sm" variant="outline">
                      <Download size={14} className="mr-2" /> Informe Final
                    </Button>
                  )}
                  {proyectoDetalle.factura && (
                    <Button size="sm" variant="outline">
                      <Download size={14} className="mr-2" /> Factura
                    </Button>
                  )}
                </div>
              </div>

              {/* Comentarios */}
              {proyectoDetalle.comentarios && (
                <div>
                  <h3 className="font-semibold text-sm text-slate-600 mb-3">Comentarios</h3>
                  <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg">{proyectoDetalle.comentarios}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button size="sm" variant="outline" onClick={() => handleEdit(proyectoDetalle.id)}>
                  <Pencil size={16} className="mr-2" /> Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    handleDelete(proyectoDetalle.id)
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
          {proyectosFiltrados.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-slate-500">
                  {proyectos.length === 0
                    ? "No hay proyectos registrados"
                    : "No hay proyectos que coincidan con los filtros"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-slate-50 dark:bg-slate-900">
                    <th className="px-4 py-3 text-left font-semibold">ID Proyecto</th>
                    <th className="px-4 py-3 text-left font-semibold">Cliente</th>
                    <th className="px-4 py-3 text-left font-semibold">Servicio</th>
                    <th className="px-4 py-3 text-left font-semibold">Fecha Inicio</th>
                    <th className="px-4 py-3 text-right font-semibold">Monto</th>
                    <th className="px-4 py-3 text-left font-semibold">Estado</th>
                    <th className="px-4 py-3 text-center font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectosFiltrados.map((proyecto) => {
                    const cliente = clientesDummyData.find(c => c.ruc === proyecto.cliente)
                    return (
                      <tr key={proyecto.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-900">
                        <td className="px-4 py-3 font-medium font-mono text-blue-600">{proyecto.id}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{cliente?.razonSocial}</p>
                            {proyecto.cotizacion && (
                              <p className="text-xs text-slate-500">
                                Cot: {cotizacionesDummy.find(c => c.id === proyecto.cotizacion)?.numeroRef}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 max-w-xs truncate">{proyecto.servicio_brindado}</td>
                        <td className="px-4 py-3">{proyecto.fecha_inicio}</td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-900">
                          ${proyecto.monto_total?.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={estadoConfig[proyecto.estado || 'planificacion']?.color}>
                            {estadoConfig[proyecto.estado || 'planificacion']?.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleVerDetalle(proyecto.id)}
                              title="Ver detalles"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleEdit(proyecto.id)} title="Editar">
                              <Pencil size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(proyecto.id)}
                              title="Eliminar"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}