'use client'

import { useState } from 'react'
import { Card } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { X } from 'lucide-react'
import { solicitudesDeServicioDummy } from '@/dummy-data/solicitud-de-servicios'

export default function Cart({ items, onRemove, onClear }) {
  const [ruc, setRuc] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({ ruc: '', email: '' })

  const total = items.reduce((sum, item) => sum + item.price, 0)

  // Separar servicios y productos
  const services = items.filter(item => item.type === 'service')
  const products = items.filter(item => item.type === 'product')

  const validateForm = () => {
    const newErrors = { ruc: '', email: '' }
    let isValid = true

    // Validar RUC (11 dígitos para Perú)
    if (!ruc.trim()) {
      newErrors.ruc = 'El RUC es requerido'
      isValid = false
    } else if (!/^\d{11}$/.test(ruc)) {
      newErrors.ruc = 'El RUC debe tener 11 dígitos'
      isValid = false
    }

    // Validar Email
    if (!email.trim()) {
      newErrors.email = 'El email es requerido'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleProcederCotizar = () => {
    if (!validateForm()) {
      return
    }

    // Crear nueva solicitud de servicio
    const nuevaSolicitud = {
      id: `SOL-${new Date().getFullYear()}-${String(solicitudesDeServicioDummy.length + 1).padStart(3, '0')}`,
      serviceId: services.map(s => s.id || 0), // IDs de servicios
      productId: products.map(p => p.id || ''), // IDs de productos
      companyName: '', // Se puede agregar otro campo para esto
      location: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      ruc: ruc,
      email: email,
      phone: '',
      description: `Solicitud generada desde el carrito de compras. 
Servicios solicitados: ${services.map(s => s.name).join(', ') || 'Ninguno'}
Productos solicitados: ${products.map(p => p.name).join(', ') || 'Ninguno'}
Total estimado: $${total}`,
      estado: 'pendiente' as const,
      fechaSolicitud: new Date().toISOString().split('T')[0]
    }

    // Agregar a la lista de solicitudes (en un caso real, esto iría a una API)
    solicitudesDeServicioDummy.push(nuevaSolicitud)

    console.log('Nueva solicitud creada:', nuevaSolicitud)
    
    // Mostrar mensaje de éxito
    alert(`¡Solicitud creada exitosamente!\nNúmero de referencia: ${nuevaSolicitud.id}\n\nNos pondremos en contacto contigo a: ${email}`)

    // Limpiar el carrito
    if (onClear) {
      onClear()
    }
    
    // Limpiar formulario
    setRuc('')
    setEmail('')
    setErrors({ ruc: '', email: '' })
  }

  return (
    <div className="fixed top-16 right-4 z-40 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Carrito de Servicios/Productos</h3>
          <span className="text-sm text-muted-foreground">({items.length})</span>
        </div>

        <div className="max-h-96 overflow-y-auto mb-4 space-y-2">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Carrito vacío</p>
          ) : (
            items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">${item.price}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {item.type === 'service' ? 'Servicio' : 'Producto'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="p-1 hover:bg-destructive/20 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <>
            <div className="border-t border-border pt-4 mb-4 space-y-4">
              {/* Campos de RUC y Email */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="ruc" className="text-sm font-medium">
                    RUC <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ruc"
                    type="text"
                    placeholder="20123456789"
                    value={ruc}
                    onChange={(e) => {
                      setRuc(e.target.value)
                      if (errors.ruc) setErrors({ ...errors, ruc: '' })
                    }}
                    maxLength={11}
                    className={errors.ruc ? 'border-destructive' : ''}
                  />
                  {errors.ruc && (
                    <p className="text-xs text-destructive mt-1">{errors.ruc}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="empresa@ejemplo.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors({ ...errors, email: '' })
                    }}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">${total}</span>
              </div>

              {/* Botón de cotización */}
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                onClick={handleProcederCotizar}
              >
                Proceder a Cotizar
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}