import React from 'react'
import { Layout } from '@/shared/layout/Layout'
import { CamionesTable } from './CamionesTable'
import { CamionesForm } from './CamionesForm'
import { Camion, ViewType } from './types'
import { camionesDummyData } from '@/dummy-data/camiones'

export const GestionarCamiones = () => {
  const [view, setView] = React.useState<ViewType>("table")
  const [selectedCamionId, setSelectedCamionId] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<"available" | "unavailable">("available")
  const [camionesData, setCamionesData] = React.useState<Camion[]>(camionesDummyData)

  const handleEdit = (id: string) => {
    setSelectedCamionId(id)
    setView("form")
  }

  const handleAdd = () => {
    setSelectedCamionId(null)
    setView("form")
  }

  const handleCancel = () => {
    setSelectedCamionId(null)
    setView("table")
  }

  const handleSave = (data: Camion) => {
    if (selectedCamionId) {
      // Editar camión existente
      setCamionesData(prev => 
        prev.map(camion => camion.id === selectedCamionId ? { ...camion, ...data } : camion)
      )
    } else {
      // Agregar nuevo camión
      const newCamion: Camion = {
        ...data,
        id: `C${String(camionesData.length + 1).padStart(3, '0')}`,
        estado: data.estado || "disponible",
        inventario_camion: data.inventario_camion || []
      }
      setCamionesData(prev => [...prev, newCamion])
    }
    handleCancel()
  }

  return (
    <Layout title="Gestionar Camiones">
      {view === "table" ? (
        <CamionesTable 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          camionesData={camionesData}
        />
      ) : (
        <CamionesForm 
          camionId={selectedCamionId} 
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}
    </Layout>
  )
}

export default GestionarCamiones