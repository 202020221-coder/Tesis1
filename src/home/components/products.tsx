'use client'

import { Card } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { ShieldAlert, Package, Wrench, AlertTriangle } from 'lucide-react'
import { getAvailableItems } from '@/dummy-data/inventario'

// Mapeo de categorías a iconos
const getCategoryIcon = (categoria: string) => {
  const iconMap = {
    'Equipos de Extinción': ShieldAlert,
    'Equipos de Protección': Package,
    'Herramientas': Wrench,
    'Señalización': AlertTriangle,
  }
  return iconMap[categoria] || Package
}

export default function Products({ onAddToCart }) {
  // Obtener solo los items disponibles del inventario
  const availableProducts = getAvailableItems()

  return (
    <section id="productos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Productos de Seguridad
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Equipo de alta calidad para protección contra incendios
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableProducts.map((product) => {
            const IconComponent = getCategoryIcon(product.categoria)
            return (
              <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow border-gray-200">
                <div className="w-12 h-12 bg-accent/15 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-black mb-2">{product.nombre}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.descripcion}</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Stock disponible: {product.cantidad} unidades
                </p>
                <div className="flex items-center justify-between">
                  
                  <Button
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-black"
                    onClick={() => onAddToCart({
                      id: product.id,
                      name: product.nombre,
                      price: product.costo_unitario,
                      type: 'product',
                      maxQuantity: product.cantidad
                    })}
                  >
                    Agregar
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {availableProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay productos disponibles en este momento.</p>
          </div>
        )}
      </div>
    </section>
  )
}