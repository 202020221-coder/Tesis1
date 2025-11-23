
"use client"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { XCircle, Save, ArrowLeft, Truck, Plus, Trash2, AlertTriangle } from "lucide-react"
import React from "react"
import { CamionesFormProps, Camion, InventarioCamion, EstadoCamion } from './types'
import { camionesDummyData, getProyectosDisponibles } from '@/dummy-data/camiones'
import { inventarioDummyData } from '@/dummy-data/inventario'

export function CamionesForm({ camionId, onCancel, onSave }: CamionesFormProps) {
  const isEditing = !!camionId
  
  // Cargar datos del camión si está editando
  const camionData = isEditing 
    ? camionesDummyData.find(c => c.id === camionId) 
    : null

  // Estado del formulario
  const [formData, setFormData] = React.useState<Partial<Camion>>({
    placa: camionData?.placa || "",
    marca: camionData?.marca || "",
    modelo: camionData?.modelo || "",
    anio: camionData?.anio || new Date().getFullYear(),
    fechaUltimoChequeo: camionData?.fechaUltimoChequeo || "",
    proximoMantenimiento: camionData?.proximoMantenimiento || "",
    estado: camionData?.estado || "disponible",
    capacidadAgua: camionData?.capacidadAgua || 0,
    numeroSerie: camionData?.numeroSerie || "",
    kilometraje: camionData?.kilometraje || 0,
    responsable: camionData?.responsable || "",
    inventario_camion: camionData?.inventario_camion || [],
    itemsFaltantes: camionData?.itemsFaltantes || [],
    proyectoAsignado: camionData?.proyectoAsignado || "",
    fechaEntradaProyecto: camionData?.fechaEntradaProyecto || "",
    fechaSalidaProyecto: camionData?.fechaSalidaProyecto || "",
    observaciones: camionData?.observaciones || "",
  })

  const proyectos = React.useMemo(() => getProyectosDisponibles(), [])
  const itemsDisponibles = React.useMemo(() => 
    inventarioDummyData.filter(item => item.estado === "disponible"), 
  [])

  const title = isEditing ? `Editar Camión: ${camionData?.placa}` : "Registrar Nuevo Camión"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [id]: id === 'anio' || id === 'capacidadAgua' || id === 'kilometraje' ? Number(value) : value 
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) {
      onSave(formData as Camion)
    }
  }

  // Funciones para gestionar inventario del camión
  const handleAddInventarioItem = () => {
    const newItem: InventarioCamion = {
      itemId: "",
      cantidad: 1,
      ubicacion: "",
      ultimaVerificacion: new Date().toISOString().split('T')[0]
    }
    setFormData(prev => ({
      ...prev,
      inventario_camion: [...(prev.inventario_camion || []), newItem]
    }))
  }

  const handleRemoveInventarioItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inventario_camion: (prev.inventario_camion || []).filter((_, i) => i !== index)
    }))
  }

  const handleInventarioChange = (index: number, field: keyof InventarioCamion, value: string | number) => {
    setFormData(prev => {
      const updated = [...(prev.inventario_camion || [])]
      updated[index] = {
        ...updated[index],
        [field]: field === 'cantidad' ? Number(value) : value
      }
      return { ...prev, inventario_camion: updated }
    })
  }

  // Función para marcar items faltantes
  const handleToggleItemFaltante = (itemId: string) => {
    setFormData(prev => {
      const faltantes = prev.itemsFaltantes || []
      const exists = faltantes.includes(itemId)
      
      return {
        ...prev,
        itemsFaltantes: exists 
          ? faltantes.filter(id => id !== itemId)
          : [...faltantes, itemId]
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border">
        <div className="p-6 space-y-4">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={onCancel}>
                <XCircle className="w-4 h-4 mr-2" /> Cancelar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-2" /> {isEditing ? "Actualizar" : "Registrar"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sección: Información General */}
          <div className="bg-white border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground border-b pb-2">
              Información General del Camión
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="placa">Placa *</Label>
                <Input 
                  id="placa" 
                  value={formData.placa}
                  onChange={handleInputChange}
                  placeholder="ABC-123"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marca">Marca *</Label>
                <Input 
                  id="marca" 
                  value={formData.marca}
                  onChange={handleInputChange}
                  placeholder="Ej: Volvo, Scania, Mercedes-Benz"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input 
                  id="modelo" 
                  value={formData.modelo}
                  onChange={handleInputChange}
                  placeholder="Ej: FL280, P320"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="anio">Año</Label>
                <Input 
                  id="anio" 
                  type="number"
                  value={formData.anio}
                  onChange={handleInputChange}
                  min="2000"
                  max={new Date().getFullYear() + 1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numeroSerie">Número de Serie</Label>
                <Input 
                  id="numeroSerie" 
                  value={formData.numeroSerie}
                  onChange={handleInputChange}
                  placeholder="Ej: VLV2020FL280-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacidadAgua">Capacidad de Agua (L)</Label>
                <Input 
                  id="capacidadAgua" 
                  type="number"
                  value={formData.capacidadAgua}
                  onChange={handleInputChange}
                  placeholder="Ej: 3000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kilometraje">Kilometraje</Label>
                <Input 
                  id="kilometraje" 
                  type="number"
                  value={formData.kilometraje}
                  onChange={handleInputChange}
                  placeholder="Ej: 45000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsable">ID Responsable</Label>
                <Input 
                  id="responsable" 
                  value={formData.responsable}
                  onChange={handleInputChange}
                  placeholder="Ej: P010"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Select 
                  value={formData.estado} 
                  onValueChange={(value) => handleSelectChange('estado', value as EstadoCamion)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disponible">✅ Disponible</SelectItem>
                    <SelectItem value="en_reparacion">🔧 En reparación</SelectItem>
                    <SelectItem value="averiado">❌ Averiado</SelectItem>
                    <SelectItem value="inventario_faltante">📦 Inventario faltante</SelectItem>
                    <SelectItem value="retirado_definitivo">🚫 Retirado definitivo</SelectItem>
                    <SelectItem value="en_proyecto">🏗️ En proyecto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sección: Mantenimiento */}
          <div className="bg-white border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground border-b pb-2">
              Mantenimiento y Revisiones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechaUltimoChequeo">Fecha Último Chequeo *</Label>
                <Input 
                  id="fechaUltimoChequeo" 
                  type="date"
                  value={formData.fechaUltimoChequeo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proximoMantenimiento">Próximo Mantenimiento</Label>
                <Input 
                  id="proximoMantenimiento" 
                  type="date"
                  value={formData.proximoMantenimiento}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Sección Condicional: Proyecto */}
          {formData.estado === "en_proyecto" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-blue-900 border-b border-blue-300 pb-2">
                Información del Proyecto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="proyectoAsignado">Proyecto Asignado</Label>
                  <Select 
                    value={formData.proyectoAsignado} 
                    onValueChange={(value) => handleSelectChange('proyectoAsignado', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      {proyectos.map((proyecto) => (
                        <SelectItem key={proyecto} value={proyecto}>
                          {proyecto}
                        </SelectItem>
                      ))}
                      <SelectItem value="Proyecto Lima Centro">Proyecto Lima Centro</SelectItem>
                      <SelectItem value="Proyecto Surco">Proyecto Surco</SelectItem>
                      <SelectItem value="Proyecto Arequipa">Proyecto Arequipa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaEntradaProyecto">Fecha de Entrada</Label>
                  <Input 
                    id="fechaEntradaProyecto" 
                    type="date"
                    value={formData.fechaEntradaProyecto}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaSalidaProyecto">Fecha de Salida</Label>
                  <Input 
                    id="fechaSalidaProyecto" 
                    type="date"
                    value={formData.fechaSalidaProyecto}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sección: Inventario del Camión */}
          <div className="bg-white border border-border rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold text-foreground">
                Inventario del Camión ({(formData.inventario_camion || []).length} items)
              </h2>
              <Button 
                type="button"
                onClick={handleAddInventarioItem}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" /> Agregar Item
              </Button>
            </div>

            {(formData.inventario_camion || []).length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No hay items en el inventario. Haz clic en "Agregar Item" para comenzar.
              </p>
            ) : (
              <div className="space-y-4">
                {(formData.inventario_camion || []).map((invItem, index) => {
                  const itemInfo = inventarioDummyData.find(i => i.id === invItem.itemId)
                  const isFaltante = formData.itemsFaltantes?.includes(invItem.itemId)
                  
                  return (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border space-y-3 ${
                        isFaltante ? 'bg-orange-50 border-orange-300' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2 space-y-2">
                          <Label>Objeto del Inventario</Label>
                          <Select 
                            value={invItem.itemId}
                            onValueChange={(value) => handleInventarioChange(index, 'itemId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un objeto" />
                            </SelectTrigger>
                            <SelectContent>
                              {itemsDisponibles.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.nombre} ({item.id})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {itemInfo && (
                            <p className="text-xs text-muted-foreground">
                              {itemInfo.fabricante} - Stock disponible: {itemInfo.cantidad}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>Cantidad</Label>
                          <Input 
                            type="number"
                            min="1"
                            value={invItem.cantidad}
                            onChange={(e) => handleInventarioChange(index, 'cantidad', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Ubicación en Camión</Label>
                          <Input 
                            value={invItem.ubicacion || ''}
                            onChange={(e) => handleInventarioChange(index, 'ubicacion', e.target.value)}
                            placeholder="Ej: Compartimento 1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Última Verificación</Label>
                          <Input 
                            type="date"
                            value={invItem.ultimaVerificacion || ''}
                            onChange={(e) => handleInventarioChange(index, 'ultimaVerificacion', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          {formData.estado === "inventario_faltante" && invItem.itemId && (
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                checked={isFaltante}
                                onCheckedChange={() => handleToggleItemFaltante(invItem.itemId)}
                              />
                              <Label className="text-sm text-orange-700 flex items-center gap-1">
                                <AlertTriangle className="w-4 h-4" />
                                Marcar como faltante
                              </Label>
                            </div>
                          )}
                        </div>
                        <Button 
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveInventarioItem(index)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {formData.estado === "inventario_faltante" && formData.itemsFaltantes && formData.itemsFaltantes.length > 0 && (
              <div className="p-4 bg-orange-100 border border-orange-300 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-700 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-900">Items Faltantes ({formData.itemsFaltantes.length})</p>
                    <p className="text-sm text-orange-800">
                      El camión tiene items marcados como faltantes. Estos deben ser repuestos antes de salir a operación.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sección: Observaciones */}
          <div className="bg-white border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground border-b pb-2">
              Observaciones y Notas
            </h2>
            <div className="space-y-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea 
                id="observaciones" 
                value={formData.observaciones}
                onChange={handleInputChange}
                placeholder="Detalles adicionales, notas de mantenimiento, alertas, etc..."
                rows={4}
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              <XCircle className="w-4 h-4 mr-2" /> Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" /> {isEditing ? "Actualizar Camión" : "Registrar Camión"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
