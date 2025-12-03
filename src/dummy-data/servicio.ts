import { AlertCircle, Shield, Wrench, ClipboardCheck } from 'lucide-react';

export interface Servicio {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: any;
}

export const serviciosDummy: Servicio[] = [
  {
    id: 1,
    name: 'Inspección de Seguridad',
    description: 'Evaluación completa de sistemas contra incendios',
    price: 299,
    icon: AlertCircle,
  },
  {
    id: 2,
    name: 'Mantenimiento Preventivo',
    description: 'Revisión y mantenimiento de equipos contra incendios',
    price: 450,
    icon: Wrench,
  },
  {
    id: 3,
    name: 'Certificación de Extintores',
    description: 'Certificación y recarga de extintores portátiles',
    price: 180,
    icon: ClipboardCheck,
  },
  {
    id: 4,
    name: 'Instalación de Sistemas',
    description: 'Instalación completa de sistemas de detección y extinción',
    price: 2500,
    icon: Shield,
  }
];