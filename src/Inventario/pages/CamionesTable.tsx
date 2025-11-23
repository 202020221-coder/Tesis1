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
import { Search, Plus, Filter, ChevronDown, MoreVertical, Truck, AlertTriangle } from "lucide-react"
import { CamionesTableProps } from './types'
import { camionesDummyData, getCamionesStats } from '@/dummy-data/camiones'

const estadoConfig = {
  disponible: { label: "Disponible", color: "bg-green-100 text-green-800" },
  en_reparacion: { label: "En Reparación", color: "bg-yellow-100 text-yellow-800" },
  averiado: { label: "Averiado", color: "bg-red-100 text-red-800" },
  inventario_faltante: { label: "Inventario Faltante", color: "bg-orange-100 text-orange-800" },
  retirado_definitivo: { label: "Retirado", color: "bg-gray-100 text-gray-800" },
  en_proyecto: { label: "En Proyecto", color: "bg-blue-100 text-blue-800" },
}

export function CamionesTable({
  onEdit,
  onAdd,
  activeTab,
  setActiveTab,
  camionesData = camionesDummyData,
}: CamionesTableProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = React.useState(false)

  const filteredData = camionesData.filter(
    (c) =>
      (activeTab === "available" ? c.estado === "disponible" : c.estado !== "disponible") &&
      (searchTerm === "" || 
       c.placa.toLowerCase().includes(searchTerm.toLowerCase()) || 
       c.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (c.modelo && c.modelo.toLowerCase().includes(searchTerm.toLowerCase())))
  )

  const stats = React.useMemo(() => getCamionesStats(), [])

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows)
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id)
    setSelectedRows(newSelected)
  }

  const handleSelectAll = () => {
    if (selectAll) setSelectedRows(new Set())
    else setSelectedRows(new Set(filteredData.map((c) => c.id)))
    setSelectAll(!selectAll)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Truck className="w-8 h-8 text-blue-600" /> Gestión de Camiones
          </h1>
          
          {/* Stats Cards */}
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-600 font-medium">Disponibles</p>
              <p className="text-2xl font-bold text-green-700">{stats.disponibles}</p>
            </div>
            <div className="px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-600 font-medium">En Reparación</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.enReparacion}</p>
            </div>
            <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-600 font-medium">En Proyecto</p>
              <p className="text-2xl font-bold text-blue-700">{stats.enProyecto}</p>
            </div>
            {stats.inventarioFaltante > 0 && (
              <div className="px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-xs text-orange-600 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Inv. Faltante
                </p>
                <p className="text-2xl font-bold text-orange-700">{stats.inventarioFaltante}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8 border-b border-border">
          <button
            onClick={() => setActiveTab("available")}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              activeTab === "available" ? "text-blue-600 border-b-2 border-blue-600" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Disponibles ({stats.disponibles})
          </button>
          <button
            onClick={() => setActiveTab("unavailable")}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              activeTab === "unavailable" ? "text-blue-600 border-b-2 border-blue-600" : "text-muted-foreground hover:text-foreground"
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
          <p className="text-sm text-muted-foreground">🚛 {filteredData.length} camiones</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Nuevo camión
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
              <DropdownMenuItem>Exportar flota completa</DropdownMenuItem>
              <DropdownMenuItem>Exportar seleccionados ({selectedRows.size})</DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <p className="text-sm font-semibold text-foreground">Reportes</p>
              </div>
              <DropdownMenuItem>Reporte de mantenimientos</DropdownMenuItem>
              <DropdownMenuItem>Reporte de inventario</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Importar desde CSV</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Eliminar seleccionados ({selectedRows.size})</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2 border border-border rounded-md px-3 py-2 bg-background">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por placa, marca o modelo..."
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
              <TableHead>Placa</TableHead>
              <TableHead>Marca / Modelo</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Kilometraje</TableHead>
              <TableHead>Último Chequeo</TableHead>
              <TableHead>Items Inventario</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                  {searchTerm 
                    ? "No se encontraron camiones que coincidan con la búsqueda" 
                    : "No hay camiones en esta categoría"}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((camion) => (
                <TableRow key={camion.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <Checkbox checked={selectedRows.has(camion.id)} onCheckedChange={() => handleSelectRow(camion.id)} />
                  </TableCell>
                  <TableCell className="font-medium text-blue-600">{camion.placa}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{camion.marca}</p>
                      {camion.modelo && <p className="text-xs text-muted-foreground">{camion.modelo}</p>}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{camion.anio || "—"}</TableCell>
                  <TableCell className="text-sm">
                    {camion.kilometraje ? `${camion.kilometraje.toLocaleString()} km` : "—"}
                  </TableCell>
                  <TableCell className="text-sm">{camion.fechaUltimoChequeo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{camion.inventario_camion.length}</span>
                      {camion.itemsFaltantes && camion.itemsFaltantes.length > 0 && (
                        <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          {camion.itemsFaltantes.length} faltante(s)
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${estadoConfig[camion.estado]?.color}`}>
                      {estadoConfig[camion.estado]?.label}
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
                        <DropdownMenuItem onClick={() => onEdit(camion.id)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>Ver detalles completos</DropdownMenuItem>
                        <DropdownMenuItem>Ver inventario</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Programar mantenimiento</DropdownMenuItem>
                        <DropdownMenuItem>Historial de servicios</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {camion.estado === "inventario_faltante" && (
                          <DropdownMenuItem className="text-orange-600">
                            Gestionar items faltantes
                          </DropdownMenuItem>
                        )}
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
            Mostrando {filteredData.length} de {camionesData.length} camiones
          </p>
          <p>
            {selectedRows.size > 0 && `${selectedRows.size} camión(es) seleccionado(s)`}
          </p>
        </div>
      )}
    </div>
  )
}