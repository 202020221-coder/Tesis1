"use client"

import * as React from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { Checkbox } from "@/shared/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Search, Plus, Filter, ChevronDown, MoreVertical, Package } from "lucide-react"
import { InventarioTableProps } from './types'
import { inventarioDummyData, getInventarioStats } from '@/dummy-data/inventario'

const estadoConfig = {
  disponible: { label: "Disponible", color: "bg-green-100 text-green-800" },
  en_reparacion: { label: "En Reparación", color: "bg-yellow-100 text-yellow-800" },
  retirado: { label: "Retirado", color: "bg-gray-100 text-gray-800" },
  daniado: { label: "Dañado", color: "bg-red-100 text-red-800" },
}

export function InventarioTable({
  onEdit,
  onAdd,
  activeTab,
  setActiveTab,
  itemsData = inventarioDummyData,
}: InventarioTableProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = React.useState(false)

  const filteredData = itemsData.filter(
    (i) =>
      (activeTab === "available"
        ? i.estado === "disponible"
        : i.estado !== "disponible") &&
      (searchTerm === "" ||
        i.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.fabricante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (i.numero_serial && i.numero_serial.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (i.categoria && i.categoria.toLowerCase().includes(searchTerm.toLowerCase())))
  )

  const stats = React.useMemo(() => getInventarioStats(), [])

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows)
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id)
    setSelectedRows(newSelected)
  }

  const handleSelectAll = () => {
    if (selectAll) setSelectedRows(new Set())
    else setSelectedRows(new Set(filteredData.map((i) => i.id)))
    setSelectAll(!selectAll)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Package className="w-8 h-8 text-blue-600" /> Inventario General
          </h1>
          
          {/* Stats Cards */}
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-600 font-medium">Disponibles</p>
              <p className="text-2xl font-bold text-green-700">{stats.disponibles}</p>
            </div>
            <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-600 font-medium">Total Items</p>
              <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
            </div>
            <div className="px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-xs text-purple-600 font-medium">Valor Total</p>
              <p className="text-2xl font-bold text-purple-700">${(stats.totalValor / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>

        <div className="flex gap-8 border-b border-border">
          <button
            onClick={() => setActiveTab("available")}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              activeTab === "available"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Disponibles ({stats.disponibles})
          </button>
          <button
            onClick={() => setActiveTab("unavailable")}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              activeTab === "unavailable"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            No disponibles ({stats.total - stats.disponibles})
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
          <p className="text-sm text-muted-foreground">📦 {filteredData.length} objetos</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Nuevo objeto
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                Acciones
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-semibold text-foreground">Exportar</p>
              </div>
              <DropdownMenuItem>Exportar inventario completo</DropdownMenuItem>
              <DropdownMenuItem>Exportar seleccionados ({selectedRows.size})</DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <p className="text-sm font-semibold text-foreground">Importar</p>
              </div>
              <DropdownMenuItem>Importar desde CSV</DropdownMenuItem>
              <DropdownMenuItem>Importar desde Excel</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Eliminar seleccionados ({selectedRows.size})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2 border border-border rounded-md px-3 py-2 bg-background">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre, fabricante, serie o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground"
/>
</div>
<div className="border border-border rounded-lg overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="w-12">
            <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
          </TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Fabricante</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>N° Serie</TableHead>
          <TableHead>Lugar Almacenaje</TableHead>
          <TableHead className="text-center">Cantidad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
              {searchTerm 
                ? "No se encontraron items que coincidan con la búsqueda" 
                : "No hay items en esta categoría"}
            </TableCell>
          </TableRow>
        ) : (
          filteredData.map((item) => (
            <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
              <TableCell>
                <Checkbox
                  checked={selectedRows.has(item.id)}
                  onCheckedChange={() => handleSelectRow(item.id)}
                />
              </TableCell>
              <TableCell className="font-medium text-blue-600">{item.nombre}</TableCell>
              <TableCell className="text-sm">{item.fabricante}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.categoria || "—"}
              </TableCell>
              <TableCell className="text-sm font-mono">{item.numero_serial ?? "—"}</TableCell>
              <TableCell className="text-sm">{item.lugar_almacenaje ?? "—"}</TableCell>
              <TableCell className="text-center">
                <span className={`inline-flex items-center justify-center w-12 h-8 rounded-full text-sm font-semibold ${
                  item.cantidad <= 5 ? 'bg-red-100 text-red-800' : 
                  item.cantidad <= 10 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {item.cantidad}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${estadoConfig[item.estado]?.color}`}>
                  {estadoConfig[item.estado]?.label}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(item.id)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>Ver detalles completos</DropdownMenuItem>
                    <DropdownMenuItem>Ver historial</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Cambiar ubicación
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Ajustar cantidad
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>

  {filteredData.length > 0 && (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <p>
        Mostrando {filteredData.length} de {itemsData.length} items
      </p>
      <p>
        {selectedRows.size > 0 && `${selectedRows.size} item(s) seleccionado(s)`}
      </p>
    </div>
  )}
</div>
)
}