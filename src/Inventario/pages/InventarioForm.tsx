"use client"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { XCircle, Save, ArrowLeft, Package } from "lucide-react"
import React from "react"
import { InventarioFormProps, Item, EstadoItem } from './types'
import { inventarioDummyData, getCategorias } from '@/dummy-data/inventario'

export function InventarioForm({ itemId, onCancel, onSave }: InventarioFormProps) {
  const isEditing = !!itemId
  
  // Cargar datos del item si está editando
  const itemData = isEditing 
    ? inventarioDummyData.find(item => item.id === itemId) 
    : null

  // Estado del formulario
  const [formData, setFormData] = React.useState<Partial<Item>>({
    nombre: itemData?.nombre || "",
    fabricante: itemData?.fabricante || "",
    numero_serial: itemData?.numero_serial || "",
    lugar_almacenaje: itemData?.lugar_almacenaje || "",
    cantidad: itemData?.cantidad || 0,
    estado: itemData?.estado || "disponible",
    categoria: itemData?.categoria || "",
    descripcion: itemData?.descripcion || "",
    fecha_adquisicion: itemData?.fecha_adquisicion || "",
    fecha_ultima_revision: itemData?.fecha_ultima_revision || "",
    costo_unitario: itemData?.costo_unitario || 0,
    proveedor: itemData?.proveedor || "",
    observaciones: itemData?.observaciones || "",
  })

  const categorias = React.useMemo(() => getCategorias(), [])

  const title = isEditing ? `Editar Objeto: ${itemData?.nombre}` : "Registrar Nuevo Objeto"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [id]: id === 'cantidad' || id === 'costo_unitario' ? Number(value) : value 
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) {
      onSave(formData as Item)
    }
  }

  // Calcular valor total del inventario del item
  const valorTotal = (formData.cantidad || 0) * (formData.costo_unitario || 0)

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
              <Package className="w-8 h-8 text-blue-600" />
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
          {/* Sección: Información Básica */}
          <div className="bg-white border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground border-b pb-2">
              Información Básica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Objeto *</Label>
                <Input 
                  id="nombre" 
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Extintor CO2 10lb"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fabricante">Fabricante *</Label>
                <Input 
                  id="fabricante" 
                  value={formData.fabricante}
                  onChange={handleInputChange}
                  placeholder="Ej: Kidde"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <Select 
                  value={formData.categoria} 
                  onValueChange={(value) => handleSelectChange('categoria', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                    <SelectItem value="Otra">Otra (especificar en observaciones)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero_serial">Número de Serie</Label>
                <Input 
                  id="numero_serial" 
                  value={formData.numero_serial}
                  onChange={handleInputChange}
                  placeholder="Opcional - Ej: EX12345"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea 
                id="descripcion" 
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción detallada del objeto..."
                rows={3}
              />
            </div>
          </div>

          {/* Sección: Ubicación y Stock */}
          <div className="bg-white border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground border-b pb-2">
              Ubicación y Stock
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lugar_almacenaje">Lugar de Almacenaje *</Label>
                <Input 
                  id="lugar_almacenaje" 
                  value={formData.lugar_almacenaje}
                  onChange={handleInputChange}
                  placeholder="Ej: Camión 03, Depósito Central"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad *</Label>
                <Input 
                  id="cantidad" 
                  type="number" 
                  min="0"
                  value={formData.cantidad}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Select 
                  value={formData.estado} 
                  onValueChange={(value) => handleSelectChange('estado', value as EstadoItem)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disponible">✅ Disponible</SelectItem>
                    <SelectItem value="en_reparacion">🔧 En reparación</SelectItem>
                    <SelectItem value="daniado">❌ Dañado</SelectItem>
                    <SelectItem value="retirado">📦 Retirado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.cantidad && formData.cantidad <= 5 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <span className="text-red-600 text-lg">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-red-900">Stock Bajo</p>
                  <p className="text-xs text-red-700">
                    La cantidad actual está por debajo del umbral recomendado. Considera reabastecer.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sección: Información Administrativa */}
          <div className="bg-white border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground border-b pb-2">
              Información Administrativa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="proveedor">Proveedor</Label>
                <Input 
                  id="proveedor" 
                  value={formData.proveedor}
                  onChange={handleInputChange}
                  placeholder="Ej: Fire Safety Systems SAC"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="costo_unitario">Costo Unitario (USD)</Label>
                <Input 
                  id="costo_unitario" 
                  type="number" 
                  min="0"
                  step="0.01"
                  value={formData.costo_unitario}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha_adquisicion">Fecha de Adquisición</Label>
                <Input 
                  id="fecha_adquisicion" 
                  type="date"
                  value={formData.fecha_adquisicion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha_ultima_revision">Fecha de Última Revisión</Label>
                <Input 
                  id="fecha_ultima_revision" 
                  type="date"
                  value={formData.fecha_ultima_revision}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Valor Total Calculado */}
            {formData.costo_unitario && formData.cantidad ? (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Valor Total del Inventario</p>
                    <p className="text-xs text-blue-600">
                      {formData.cantidad} unidad(es) × ${formData.costo_unitario?.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-blue-900">
                    ${valorTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Sección: Observaciones */}
          <div className="bg-white border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground border-b pb-2">
              Notas y Observaciones
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

          {/* Botones de acción en el footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              <XCircle className="w-4 h-4 mr-2" /> Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" /> {isEditing ? "Actualizar Objeto" : "Registrar Objeto"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}