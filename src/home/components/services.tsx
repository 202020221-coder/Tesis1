'use client'

import { Card } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import CustomService from './custom-service'
import { serviciosDummy } from '@/dummy-data/servicio'

export default function Services({ onAddToCart }) {
  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Servicios profesionales diseñados para proteger tu inversión y garantizar la seguridad
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Servicios del catálogo */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {serviciosDummy.map((service) => {
                const IconComponent = service.icon
                return (
                  <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow border-gray-200">
                    <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-black mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white"
                        onClick={() => onAddToCart({
                          name: service.name,
                          price: service.price,
                          type: 'service'
                        })}
                      >
                        Agregar
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Servicios Personalizados */}
          <div className="lg:col-span-1">
            <CustomService onAddToCart={onAddToCart} />
          </div>
        </div>
      </div>
    </section>
  )
}