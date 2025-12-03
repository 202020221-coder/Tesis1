'use client'

import { Card } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { X, CheckCircle, XCircle, FileText, Search } from 'lucide-react'
import { useState } from 'react'
import { cotizacionesDummy } from '@/dummy-data/cotizaciones'

export default function Quotes({ onClose }) {
  const [filter, setFilter] = useState('pending') // pending, accepted, rejected
  const [ruc, setRuc] = useState('')
  const [searchRuc, setSearchRuc] = useState('') // RUC confirmado para buscar
  const [cotizaciones, setCotizaciones] = useState(cotizacionesDummy)

  // Filtrar cotizaciones por RUC buscado
  const cotizacionesPorRuc = searchRuc 
    ? cotizaciones.filter(cot => cot.ruc.toString() === searchRuc)
    : []

  // Filtrar por estado
  const getFilteredQuotes = () => {
    let estadoFiltro = ''
    switch (filter) {
      case 'pending':
        estadoFiltro = 'enviada'
        break
      case 'accepted':
        estadoFiltro = 'aprobada'
        break
      case 'rejected':
        estadoFiltro = 'rechazada'
        break
      default:
        estadoFiltro = ''
    }
    
    return cotizacionesPorRuc.filter(cot => 
      cot.estado.toLowerCase() === estadoFiltro.toLowerCase()
    )
  }

  const filteredQuotes = getFilteredQuotes()

  const handleSearch = () => {
    if (ruc.trim().length === 11 && /^\d+$/.test(ruc)) {
      setSearchRuc(ruc)
    } else {
      alert('Por favor ingrese un RUC válido de 11 dígitos')
    }
  }

  const handleAccept = (id: string) => {
    setCotizaciones(prev =>
      prev.map(cot =>
        cot.id === id ? { ...cot, estado: 'aprobada' } : cot
      )
    )
  }

  const handleReject = (id: string) => {
    setCotizaciones(prev =>
      prev.map(cot =>
        cot.id === id ? { ...cot, estado: 'rechazada' } : cot
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'enviada':
        return 'bg-yellow-100 text-yellow-800'
      case 'aprobada':
        return 'bg-green-100 text-green-800'
      case 'rechazada':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  // Contar cotizaciones por estado
  const countByStatus = (estado: string) => {
    return cotizacionesPorRuc.filter(cot => 
      cot.estado.toLowerCase() === estado.toLowerCase()
    ).length
  }

  return (
    <div className="fixed top-16 right-4 z-40 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Cotizaciones</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* RUC Search */}
        <div className="mb-4 space-y-2">
          <Label htmlFor="ruc-search" className="text-sm font-medium">
            Buscar por RUC / poner: 20518934091
          </Label>
          <div className="flex gap-2">
            <Input
              id="ruc-search"
              type="text"
              placeholder="Ingrese RUC (11 dígitos)"
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
              maxLength={11}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            />
            <Button
              onClick={handleSearch}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
          {searchRuc && (
            <p className="text-xs text-muted-foreground">
              Mostrando cotizaciones para RUC: {searchRuc}
            </p>
          )}
        </div>

        {searchRuc ? (
          <>
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4 border-b border-border">
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  filter === 'pending'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Pendientes ({countByStatus('enviada')})
              </button>
              <button
                onClick={() => setFilter('accepted')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  filter === 'accepted'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Aceptadas ({countByStatus('aprobada')})
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  filter === 'rejected'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Rechazadas ({countByStatus('rechazada')})
              </button>
            </div>

            {/* Quotes List */}
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredQuotes.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {filter === 'pending' && 'No hay cotizaciones pendientes'}
                  {filter === 'accepted' && 'No hay cotizaciones aceptadas'}
                  {filter === 'rejected' && 'No hay cotizaciones rechazadas'}
                </p>
              ) : (
                filteredQuotes.map((quote) => (
                  <div key={quote.id} className="p-3 bg-muted/40 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{quote.numeroRef}</p>
                        <p className="text-xs text-muted-foreground font-semibold">{quote.cliente}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {quote.descripcion}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ml-2 ${getStatusColor(quote.estado)}`}>
                        {getStatusLabel(quote.estado)}
                      </span>
                    </div>
                    
                    <div className="bg-background p-2 rounded mb-2 space-y-1">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">Monto total:</p>
                        <p className="text-sm font-bold text-primary">${quote.monto}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">Fecha emisión:</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(quote.fechaEmision).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">Vencimiento:</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(quote.fechaVencimiento).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>

                    {/* Detalle de items */}
                    <div className="mb-3 space-y-1">
                      {quote.objeto.length > 0 && (
                        <div className="text-xs">
                          <p className="font-semibold text-foreground mb-1">Productos:</p>
                          <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                            {quote.objeto.slice(0, 2).map((item, idx) => (
                              <li key={idx} className="line-clamp-1">
                                {item.nombre} (x{item.cantidad})
                              </li>
                            ))}
                            {quote.objeto.length > 2 && (
                              <li className="text-primary">+{quote.objeto.length - 2} más...</li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      {quote.servicios && quote.servicios.length > 0 && (
                        <div className="text-xs mt-2">
                          <p className="font-semibold text-foreground mb-1">Servicios:</p>
                          <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                            {quote.servicios.slice(0, 2).map((serv, idx) => (
                              <li key={idx} className="line-clamp-1">
                                {serv.nombre}
                              </li>
                            ))}
                            {quote.servicios.length > 2 && (
                              <li className="text-primary">+{quote.servicios.length - 2} más...</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons - Only show for pending quotes */}
                    {quote.estado.toLowerCase() === 'enviada' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAccept(quote.id)}
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aceptar
                        </Button>
                        <Button
                          onClick={() => handleReject(quote.id)}
                          size="sm"
                          variant="outline"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rechazar
                        </Button>
                      </div>
                    )}

                    {/* Download button for accepted quotes */}
                    {quote.estado.toLowerCase() === 'aprobada' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/10"
                      >
                        Descargar Cotización
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Ingrese un RUC para ver las cotizaciones
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}