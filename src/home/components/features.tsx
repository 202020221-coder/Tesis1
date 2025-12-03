import { Card } from '@/shared/components/ui/card'
import { CheckCircle2, Clock, Shield, Headphones } from 'lucide-react'

const features = [
  {
    icon: CheckCircle2,
    title: 'Certificación Profesional',
    description: 'Todos nuestros equipos están certificados y cumplen normas internacionales',
  },
  {
    icon: Clock,
    title: 'Respuesta Inmediata',
    description: 'Disponibilidad 24/7 para emergencias y consultas técnicas',
  },
  {
    icon: Shield,
    title: 'Garantía Total',
    description: 'Garantía completa en todos nuestros servicios y productos',
  },
  {
    icon: Headphones,
    title: 'Soporte Dedicado',
    description: 'Equipo de expertos listos para ayudarte en cualquier momento',
  },
]

export default function Features() {
  return (
    <section id="caracteristicas" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Características que nos hacen líderes en seguridad contra incendios
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
