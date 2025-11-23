import React from 'react'
import { Layout } from '@/shared/layout/Layout'
import { InventarioTable } from './InventarioTable'
import { InventarioForm } from './InventarioForm'
import { Item, ViewType } from './types'
import { inventarioDummyData } from '@/dummy-data/inventario'

export const GestionarInventario = () => {
  const [view, setView] = React.useState<ViewType>("table")
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<"available" | "unavailable">("available")
  const [itemsData, setItemsData] = React.useState<Item[]>(inventarioDummyData)

  const handleEdit = (id: string) => {
    setSelectedItemId(id)
    setView("form")
  }

  const handleAdd = () => {
    setSelectedItemId(null)
    setView("form")
  }

  const handleCancel = () => {
    setSelectedItemId(null)
    setView("table")
  }

  const handleSave = (data: Item) => {
    if (selectedItemId) {
      // Editar item existente
      setItemsData(prev => 
        prev.map(item => item.id === selectedItemId ? { ...item, ...data } : item)
      )
    } else {
      // Agregar nuevo item
      const newItem: Item = {
        ...data,
        id: `I${String(itemsData.length + 1).padStart(3, '0')}`,
        estado: data.estado || "disponible"
      }
      setItemsData(prev => [...prev, newItem])
    }
    handleCancel()
  }

  return (
    <Layout title="Gestionar Inventario">
      {view === "table" ? (
        <InventarioTable 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          itemsData={itemsData}
        />
      ) : (
        <InventarioForm 
          itemId={selectedItemId} 
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}
    </Layout>
  )
}