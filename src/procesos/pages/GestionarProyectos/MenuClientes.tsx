import React from 'react'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Badge } from "@/shared/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Search, Plus, Pencil, Trash2, Eye, Download, Filter, Users, Building2, Lock, Unlock } from "lucide-react"
import { Layout } from '@/shared/layout/Layout'
import { Cliente, MenuClientesProps } from './Types'
import { clientesDummyData, getClientesStats } from '@/dummy-data/clientes'

const estadoConfig = {
  activo: { label: "Activo", color: "bg-green-100 text-green-800" },
  inactivo: { label: "Inactivo", color: "bg-gray-100 text-gray-800" },
  suspendido: { label: "Suspendido", color: "bg-red-100 text-red-800" },
}

const tipoClienteConfig = {
  corporativo: { label: "Corporativo", color: "bg-blue-100 text-blue-800", icon: Building2 },
  gobierno: { label: "Gobierno", color: "bg-purple-100 text-purple-800", icon: Building2 },
  pyme: { label: "PYME", color: "bg-orange-100 text-orange-800", icon: Building2 },
  individual: { label: "Individual", color: "bg-gray-100 text-gray-800", icon: Users },
}

export function MenuClientes({
  clientes: initialClientes = clientesDummyData,
  onAgregar,
  onEditar,
  onEliminar,
}: MenuClientesProps) {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes)
  const [showForm, setShowForm] = useState(false)
  const [editingRuc, setEditingRuc] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [detalleRuc, setDetalleRuc] = useState<string | null>(null)
  const [mostrarContrasena, setMostrarContrasena] = useState<Record<string, boolean>>({})

  const stats = React.useMemo(() => getClientesStats(), [])

  const [formData, setFormData] = useState<Partial<Cliente>>({
    ruc: "",
    razonSocial: "",
    ubicacion: "",
    contacto: "",
    nombreContacto: "",
    plataformaFacturacion: "",
    usuarioPlataforma: "",
    contrasenaPlataforma: "",
    comentarios: "",
    fechaRegistro: new Date().toISOString().split("T")[0],
    estado: "activo",
    tipoCliente: "corporativo",
    limiteCredito: 0,
    proyectosAsociados: []
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "limiteCredito" ? Number(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingRuc) {
      const updated = clientes.map((c) => (c.ruc === editingRuc ? { ...c, ...formData } : c))
      setClientes(updated as Cliente[])
      onEditar?.(editingRuc, { ...clientes.find((c) => c.ruc === editingRuc)!, ...formData } as Cliente)
    } else {
      const newCliente: Cliente = {
        ruc: formData.ruc || "",
        razonSocial: formData.razonSocial || "",
        ubicacion: formData.ubicacion || "",
        contacto: formData.contacto || "",
        nombreContacto: formData.nombreContacto || "",
        plataformaFacturacion: formData.plataformaFacturacion,
        usuarioPlataforma: formData.usuarioPlataforma,
        contrasenaPlataforma: formData.contrasenaPlataforma,
        comentarios: formData.comentarios,
        fechaRegistro: formData.fechaRegistro,
        estado: (formData.estado as any) || "activo",
        tipoCliente: (formData.tipoCliente as any) || "corporativo",
        limiteCredito: formData.limiteCredito || 0,
        proyectosAsociados: formData.proyectosAsociados || []
      }
      setClientes([...clientes, newCliente])
      onAgregar?.(newCliente)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      ruc: "",
      razonSocial: "",
      ubicacion: "",
      contacto: "",
      nombreContacto: "",
      plataformaFacturacion: "",
      usuarioPlataforma: "",
      contrasenaPlataforma: "",
      comentarios: "",
      fechaRegistro: new Date().toISOString().split("T")[0],
      estado: "activo",
      tipoCliente: "corporativo",
      limiteCredito: 0,
      proyectosAsociados: []
    })
    setShowForm(false)
    setEditingRuc(null)
    setDetalleRuc(null)
  }

  const handleEdit = (ruc: string) => {
    const cliente = clientes.find((c) => c.ruc === ruc)
    if (cliente) {
      setFormData(cliente)
      setEditingRuc(ruc)
      setShowForm(true)
      setDetalleRuc(null)
    }
  }

  const handleDelete = (ruc: string) => {
    setClientes(clientes.filter((c) => c.ruc !== ruc))
    onEliminar?.(ruc)
  }

  const handleVerDetalle = (ruc: string) => {
    setDetalleRuc(detalleRuc === ruc ? null : ruc)
  }

  const toggleMostrarContrasena = (ruc: string) => {
    setMostrarContrasena(prev => ({
      ...prev,
      [ruc]: !prev[ruc]
    }))
  }

  const clientesFiltrados = clientes.filter((cliente) => {
    const matchBusqueda =
      cliente.ruc.includes(busqueda) ||
      cliente.razonSocial.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.nombreContacto.toLowerCase().includes(busqueda.toLowerCase())

    const matchEstado = filtroEstado === "todos" || cliente.estado === filtroEstado
    const matchTipo = filtroTipo === "todos" || cliente.tipoCliente === filtroTipo

    return matchBusqueda && matchEstado && matchTipo
  })

  const clienteDetalle = detalleRuc ? clientes.find((c) => c.ruc === detalleRuc) : null

  return (
    <Layout className="w-full space-y-6" title="Gestionar Clientes">
      <div className='px-5'>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gestión de Clientes</h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Total: {clientesFiltrados.length} clientes</p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-3">
            <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-600 font-medium">Activos</p>
              <p className="text-xl font-bold text-green-700">{stats.activos}</p>
            </div>
            <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-600 font-medium">Corporativos</p>
              <p className="text-xl font-bold text-blue-700">{stats.corporativos}</p>
            </div>
            <div className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-xs text-purple-600 font-medium">Crédito Total</p>
              <p className="text-xl font-bold text-purple-700">${(stats.totalLimiteCredito / 1000).toFixed(0)}K</p>
              </div>
              </div>
              </div>
              <div className="flex justify-end">
      <Button
        onClick={() => {
          setEditingRuc(null)
          setShowForm(true)
          setDetalleRuc(null)
        }}
        className="gap-2 bg-blue-600 hover:bg-blue-700"
      >
        <Plus size={20} /> Nuevo Cliente
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
              placeholder="Buscar por RUC, razón social o contacto..."
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
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
              <SelectItem value="suspendido">Suspendido</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filtroTipo} onValueChange={setFiltroTipo}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los tipos</SelectItem>
              <SelectItem value="corporativo">Corporativo</SelectItem>
              <SelectItem value="gobierno">Gobierno</SelectItem>
              <SelectItem value="pyme">PYME</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
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
              setFiltroTipo("todos")
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
          <CardTitle>{editingRuc ? "Editar" : "Nuevo"} Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm} className="space-y-4">
            {/* Información Básica */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Información Básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>RUC *</Label>
                  <Input
                    name="ruc"
                    value={formData.ruc || ""}
                    onChange={handleFormChange}
                    placeholder="20123456789"
                    maxLength={11}
                    pattern="[0-9]{11}"
                    required
                    disabled={!!editingRuc}
                  />
                  <p className="text-xs text-muted-foreground mt-1">11 dígitos numéricos</p>
                </div>
                <div>
                  <Label>Razón Social *</Label>
                  <Input
                    name="razonSocial"
                    value={formData.razonSocial || ""}
                    onChange={handleFormChange}
                    placeholder="Empresa S.A.C."
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Ubicación *</Label>
                  <Input
                    name="ubicacion"
                    value={formData.ubicacion || ""}
                    onChange={handleFormChange}
                    placeholder="Av. Principal 123, Distrito, Ciudad"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nombre del Contacto *</Label>
                  <Input
                    name="nombreContacto"
                    value={formData.nombreContacto || ""}
                    onChange={handleFormChange}
                    placeholder="Juan Pérez García"
                    required
                  />
                </div>
                <div>
                  <Label>Contacto (Teléfono o Email) *</Label>
                  <Input
                    name="contacto"
                    value={formData.contacto || ""}
                    onChange={handleFormChange}
                    placeholder="+51 987 654 321 o email@empresa.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Plataforma de Facturación */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Plataforma de Facturación</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>URL de Plataforma</Label>
                  <Input
                    name="plataformaFacturacion"
                    value={formData.plataformaFacturacion || ""}
                    onChange={handleFormChange}
                    placeholder="https://plataforma.com"
                    type="url"
                  />
                </div>
                <div>
                  <Label>Usuario</Label>
                  <Input
                    name="usuarioPlataforma"
                    value={formData.usuarioPlataforma || ""}
                    onChange={handleFormChange}
                    placeholder="usuario_facturacion"
                  />
                </div>
                <div>
                  <Label>Contraseña</Label>
                  <Input
                    name="contrasenaPlataforma"
                    type="password"
                    value={formData.contrasenaPlataforma || ""}
                    onChange={handleFormChange}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Información Adicional */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Información Adicional</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Tipo de Cliente *</Label>
                  <Select
                    value={formData.tipoCliente || "corporativo"}
                    onValueChange={(value) => handleSelectChange("tipoCliente", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporativo">Corporativo</SelectItem>
                      <SelectItem value="gobierno">Gobierno</SelectItem>
                      <SelectItem value="pyme">PYME</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Estado *</Label>
                  <Select
                    value={formData.estado || "activo"}
                    onValueChange={(value) => handleSelectChange("estado", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                      <SelectItem value="suspendido">Suspendido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Límite de Crédito (USD)</Label>
                  <Input
                    name="limiteCredito"
                    type="number"
                    value={formData.limiteCredito || 0}
                    onChange={handleFormChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <Label>Fecha de Registro</Label>
                  <Input
                    name="fechaRegistro"
                    type="date"
                    value={formData.fechaRegistro || ""}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div>
                <Label>Comentarios</Label>
                <textarea
                  name="comentarios"
                  value={formData.comentarios || ""}
                  onChange={handleFormChange}
                  placeholder="Información adicional, notas importantes..."
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingRuc ? "Actualizar" : "Crear"} Cliente
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )}

    {clienteDetalle && (
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Detalles del Cliente: {clienteDetalle.razonSocial}</CardTitle>
              <CardDescription>RUC: {clienteDetalle.ruc}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setDetalleRuc(null)}>
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
                  <span className="text-slate-500">RUC:</span>
                  <p className="font-medium font-mono">{clienteDetalle.ruc}</p>
                </div>
                <div>
                  <span className="text-slate-500">Razón Social:</span>
                  <p className="font-medium">{clienteDetalle.razonSocial}</p>
                </div>
                <div>
                  <span className="text-slate-500">Ubicación:</span>
                  <p className="font-medium">{clienteDetalle.ubicacion}</p>
                </div>
                <div>
                  <span className="text-slate-500">Tipo:</span>
                  <p className="font-medium">
                    <Badge className={tipoClienteConfig[clienteDetalle.tipoCliente || 'corporativo']?.color}>
                      {tipoClienteConfig[clienteDetalle.tipoCliente || 'corporativo']?.label}
                    </Badge>
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Estado:</span>
                  <p className="font-medium">
                    <Badge className={estadoConfig[clienteDetalle.estado || 'activo']?.color}>
                      {estadoConfig[clienteDetalle.estado || 'activo']?.label}
                    </Badge>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-slate-600 mb-3">Información de Contacto</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-500">Nombre de Contacto:</span>
                  <p className="font-medium">{clienteDetalle.nombreContacto}</p>
                </div>
                <div>
                  <span className="text-slate-500">Contacto:</span>
                  <p className="font-medium">{clienteDetalle.contacto}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="text-slate-500">Límite de Crédito:</span>
                  <p className="text-xl font-bold text-blue-600">${clienteDetalle.limiteCredito?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plataforma de Facturación */}
          {clienteDetalle.plataformaFacturacion && (
            <div>
              <h3 className="font-semibold text-sm text-slate-600 mb-3">Plataforma de Facturación</h3>
              <div className="p-4 bg-slate-50 rounded-lg space-y-2 text-sm">
                <div>
                  <span className="text-slate-500">URL:</span>
                  <p className="font-medium">
                    <a 
                      href={clienteDetalle.plataformaFacturacion} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {clienteDetalle.plataformaFacturacion}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Usuario:</span>
                  <p className="font-medium font-mono">{clienteDetalle.usuarioPlataforma}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Contraseña:</span>
                  <p className="font-medium font-mono">
                    {mostrarContrasena[clienteDetalle.ruc] 
                      ? clienteDetalle.contrasenaPlataforma 
                      : "••••••••"}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleMostrarContrasena(clienteDetalle.ruc)}
                  >
                    {mostrarContrasena[clienteDetalle.ruc] ? <Lock size={14} /> : <Unlock size={14} />}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Comentarios */}
          {clienteDetalle.comentarios && (
            <div>
              <h3 className="font-semibold text-sm text-slate-600 mb-3">Comentarios</h3>
              <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg">{clienteDetalle.comentarios}</p>
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t">
            <Button size="sm" variant="outline" onClick={() => handleEdit(clienteDetalle.ruc)}>
              <Pencil size={16} className="mr-2" /> Editar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                handleDelete(clienteDetalle.ruc)
                setDetalleRuc(null)
              }}
            >
              <Trash2 size={16} className="mr-2" /> Eliminar
            </Button>
          </div>
        </CardContent>
      </Card>
    )}

    <div className="space-y-3">
      {clientesFiltrados.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-500">
              {clientes.length === 0
                ? "No hay clientes registrados"
                : "No hay clientes que coincidan con los filtros"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 dark:bg-slate-900">
                <th className="px-4 py-3 text-left font-semibold">RUC</th>
                <th className="px-4 py-3 text-left font-semibold">Razón Social</th>
                <th className="px-4 py-3 text-left font-semibold">Contacto</th>
                <th className="px-4 py-3 text-left font-semibold">Tipo</th>
                <th className="px-4 py-3 text-right font-semibold">Crédito</th>
                <th className="px-4 py-3 text-left font-semibold">Estado</th>
                <th className="px-4 py-3 text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.ruc} className="border-b hover:bg-slate-50 dark:hover:bg-slate-900">
                  <td className="px-4 py-3 font-medium font-mono text-blue-600">{cliente.ruc}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{cliente.razonSocial}</p>
                      <p className="text-xs text-slate-500">{cliente.nombreContacto}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{cliente.contacto}</td>
                  <td className="px-4 py-3">
                    <Badge className={tipoClienteConfig[cliente.tipoCliente || 'corporativo']?.color}>
                      {tipoClienteConfig[cliente.tipoCliente || 'corporativo']?.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">
                    ${cliente.limiteCredito?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={estadoConfig[cliente.estado || 'activo']?.color}>
                      {estadoConfig[cliente.estado || 'activo']?.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVerDetalle(cliente.ruc)}
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(cliente.ruc)} title="Editar">
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(cliente.ruc)}
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