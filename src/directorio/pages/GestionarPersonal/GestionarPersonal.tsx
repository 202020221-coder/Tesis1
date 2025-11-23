import React from 'react'
import { Layout } from '@/shared/layout/Layout';
import { PersonalTable } from './PersonalTable';
import { PersonalForm } from './PersonalForm';
import { Personnel, ViewType } from './types';
import { personnelDummyData } from '@/dummy-data/personal';

export const GestionarPersonal = () => {
  const [view, setView] = React.useState<ViewType>("table")
  const [selectedPersonnelId, setSelectedPersonnelId] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<"active" | "inactive">("active")
  const [personnelData, setPersonnelData] = React.useState<Personnel[]>(personnelDummyData)

  const handleEdit = (id: string) => {
    setSelectedPersonnelId(id)
    setView("form")
  }

  const handleAdd = () => {
    setSelectedPersonnelId(null)
    setView("form")
  }

  const handleCancel = () => {
    setSelectedPersonnelId(null)
    setView("table")
  }

  const handleSave = (data: Personnel) => {
    if (selectedPersonnelId) {
      // Editar personal existente
      setPersonnelData(prev => 
        prev.map(p => p.id === selectedPersonnelId ? { ...p, ...data } : p)
      )
    } else {
      // Agregar nuevo personal
      const newPersonnel: Personnel = {
        ...data,
        id: `P${String(personnelData.length + 1).padStart(3, '0')}`,
        employeeNo: `000${String(personnelData.length + 11000)}`,
        status: "active"
      }
      setPersonnelData(prev => [...prev, newPersonnel])
    }
    handleCancel()
  }

  return (
    <Layout title="Gestionar personal">
      {view === "table" ? (
        <PersonalTable 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          personnelData={personnelData}
        />
      ) : (
        <PersonalForm 
          personnelId={selectedPersonnelId} 
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}
    </Layout>
  )
}