"use client"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Textarea } from "@/shared/components/ui/textarea"
import { XCircle, Save, Plus, ArrowLeft, Upload, X, Trash2 } from "lucide-react"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/shared/components/ui/file-upload";
import React from "react"
import { PersonalFormProps, Personnel, Certification, ProjectAssignment } from './types'
import { 
  personnelDummyData, 
  getCertificationsByPersonnelId, 
  getProjectAssignmentsByPersonnelId 
} from '@/dummy-data/personal'

export function PersonalForm({ personnelId, onCancel, onSave }: PersonalFormProps) {
  const isEditing = !!personnelId
  const [files, setFiles] = React.useState<File[]>([])

  // Cargar datos del personal si está editando
  const personnelData = isEditing 
    ? personnelDummyData.find(p => p.id === personnelId) 
    : null

  // Estados del formulario
  const [formData, setFormData] = React.useState<Partial<Personnel>>({
    name: personnelData?.name || "",
    dni: personnelData?.dni || "",
    role: personnelData?.role || "",
    hireDate: personnelData?.hireDate || "",
    address: personnelData?.address || "",
    email: personnelData?.email || "",
    phone: personnelData?.phone || "",
    position: personnelData?.position || "",
    area: personnelData?.area || "",
    department: personnelData?.department || "",
    availabilityPercentage: personnelData?.availabilityPercentage || 100,
    vacationDays: personnelData?.vacationDays || 0,
  })

  // Certificaciones y asignaciones
  const [certifications, setCertifications] = React.useState<Certification[]>(
    isEditing ? getCertificationsByPersonnelId(personnelId) : []
  )
  const [assignments, setAssignments] = React.useState<ProjectAssignment[]>(
    isEditing ? getProjectAssignmentsByPersonnelId(personnelId) : []
  )

  const title = isEditing ? `Editar Personal: ${personnelData?.name}` : "Registrar Nuevo Personal"

  const onFileValidate = React.useCallback(
    (file: File): string | null => {
      if (files.length >= 2) {
        return "Solo puedes subir hasta 2 archivos"
      }
      if (!file.type.startsWith("image/") && !file.type.includes("pdf")) {
        return "Solo se permiten imágenes o archivos PDF"
      }
      const MAX_SIZE = 5 * 1024 * 1024 // 5MB
      if (file.size > MAX_SIZE) {
        return `El archivo debe ser menor a ${MAX_SIZE / (1024 * 1024)}MB`
      }
      return null
    },
    [files],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData as Personnel)
    }
  }

  // Funciones para certificaciones
  const handleAddCertification = () => {
    const newCert: Certification = {
      id: `C${Date.now()}`,
      name: "",
      entity: "",
      obtainedDate: "",
    }
    setCertifications([...certifications, newCert])
  }

  const handleRemoveCertification = (id: string) => {
    setCertifications(certifications.filter(c => c.id !== id))
  }

  const handleCertificationChange = (id: string, field: keyof Certification, value: string) => {
    setCertifications(certifications.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ))
  }

  // Funciones para asignaciones
  const handleAddAssignment = () => {
    const newAssignment: ProjectAssignment = {
      id: `PA${Date.now()}`,
      projectName: "",
      projectId: "",
      role: "",
      startDate: "",
      dedicationPercentage: 0,
    }
    setAssignments([...assignments, newAssignment])
  }

  const handleRemoveAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id))
  }

  const handleAssignmentChange = (id: string, field: keyof ProjectAssignment, value: string | number) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border">
        <div className="p-6 space-y-4">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <div className="space-x-2">
              <Button variant="outline" onClick={onCancel}>
                <XCircle className="w-4 h-4 mr-2" /> Cancelar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-2" /> {isEditing ? "Actualizar" : "Registrar"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Información Básica</TabsTrigger>
            <TabsTrigger value="certs">Certificaciones</TabsTrigger>
            <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
            <TabsTrigger value="assignments">Asignaciones</TabsTrigger>
          </TabsList>

          {/* Pestaña 1: Información Básica */}
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  placeholder="Juan Pérez García"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dni">DNI/ID *</Label>
                <Input 
                  id="dni" 
                  value={formData.dni} 
                  onChange={handleInputChange}
                  placeholder="12345678"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email} 
                  onChange={handleInputChange}
                  placeholder="juan.perez@empresa.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input 
                  id="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange}
                  placeholder="+51 987 654 321"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol/Puesto *</Label>
                <Input 
                  id="role" 
                  value={formData.role} 
                  onChange={handleInputChange}
                  placeholder="Desarrollador Senior"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Código de Posición</Label>
                <Input 
                  id="position" 
                  value={formData.position} 
                  onChange={handleInputChange}
                  placeholder="POS-1005620"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área</Label>
                <Input 
                  id="area" 
                  value={formData.area} 
                  onChange={handleInputChange}
                  placeholder="Tecnología de la Información"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate">Fecha de Ingreso</Label>
                <Input 
                  id="hireDate" 
                  type="date" 
                  value={formData.hireDate} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Textarea 
                id="address" 
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Av. Principal 123, Distrito, Ciudad"
                rows={3}
              />
            </div>
          </TabsContent>

          {/* Pestaña 2: Certificaciones */}
          <TabsContent value="certs" className="space-y-4 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Certificaciones del Personal</h3>
              <Button onClick={handleAddCertification} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" /> Agregar Certificación
              </Button>
            </div>

            {certifications.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No hay certificaciones registradas. Haz clic en "Agregar Certificación" para comenzar.
              </p>
            ) : (
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="p-4 border rounded-lg bg-slate-50 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nombre de la Certificación</Label>
                        <Input 
                          value={cert.name}
                          onChange={(e) => handleCertificationChange(cert.id, 'name', e.target.value)}
                          placeholder="Ej: Six Sigma Green Belt"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Entidad Emisora</Label>
                        <Input 
                          value={cert.entity}
                          onChange={(e) => handleCertificationChange(cert.id, 'entity', e.target.value)}
                          placeholder="Ej: ASQ"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha de Obtención</Label>
                        <Input 
                          type="date"
                          value={cert.obtainedDate}
                          onChange={(e) => handleCertificationChange(cert.id, 'obtainedDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha de Expiración (opcional)</Label>
                        <Input 
                          type="date"
                          value={cert.expirationDate || ''}
                          onChange={(e) => handleCertificationChange(cert.id, 'expirationDate', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRemoveCertification(cert.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Label className="mb-2 block">Subir Archivos de Certificaciones</Label>
              <FileUpload
                value={files}
                onValueChange={setFiles}
                onFileValidate={onFileValidate}
                onFileReject={() => {}}
                accept="image/*,.pdf"
                maxFiles={5}
                className="w-full"
                multiple
              >
                <FileUploadDropzone>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center justify-center rounded-full border p-2.5">
                      <Upload className="size-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">Arrastra archivos aquí</p>
                    <p className="text-muted-foreground text-xs">
                      O haz clic para examinar (máx 5 archivos, PDF o imágenes)
                    </p>
                  </div>
                  <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 w-fit">
                      Examinar archivos
                    </Button>
                  </FileUploadTrigger>
                </FileUploadDropzone>
                <FileUploadList>
                  {files.map((file) => (
                    <FileUploadItem key={file.name} value={file}>
                      <FileUploadItemPreview />
                      <FileUploadItemMetadata />
                      <FileUploadItemDelete asChild>
                        <Button variant="ghost" size="icon" className="size-7">
                          <X />
                        </Button>
                      </FileUploadItemDelete>
                    </FileUploadItem>
                  ))}
                </FileUploadList>
              </FileUpload>
            </div>
          </TabsContent>

          {/* Pestaña 3: Disponibilidad */}
          <TabsContent value="availability" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="availabilityPercentage">Porcentaje de Disponibilidad (%)</Label>
                <Input 
                  id="availabilityPercentage" 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={formData.availabilityPercentage}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    availabilityPercentage: Number(e.target.value) 
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vacationDays">Días de Vacaciones Pendientes</Label>
                <Input 
                  id="vacationDays" 
                  type="number" 
                  value={formData.vacationDays}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    vacationDays: Number(e.target.value) 
                  }))}
                />
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                💡 <strong>Nota:</strong> En futuras versiones se integrará un calendario para registrar 
                ausencias, permisos y vacaciones programadas.
              </p>
            </div>
          </TabsContent>

          {/* Pestaña 4: Asignaciones a Proyectos */}
          <TabsContent value="assignments" className="space-y-4 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Asignaciones a Proyectos</h3>
              <Button onClick={handleAddAssignment} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" /> Asignar a Proyecto
              </Button>
            </div>

            {assignments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No hay asignaciones a proyectos. Haz clic en "Asignar a Proyecto" para comenzar.
              </p>
            ) : (
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 border rounded-lg bg-slate-50 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nombre del Proyecto</Label>
                        <Input 
                          value={assignment.projectName}
                          onChange={(e) => handleAssignmentChange(assignment.id, 'projectName', e.target.value)}
                          placeholder="Ej: Implementación ERP"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ID del Proyecto</Label>
                        <Input 
                          value={assignment.projectId}
                          onChange={(e) => handleAssignmentChange(assignment.id, 'projectId', e.target.value)}
                          placeholder="Ej: PROJ-001"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Rol en el Proyecto</Label>
                        <Input 
                          value={assignment.role}
                          onChange={(e) => handleAssignmentChange(assignment.id, 'role', e.target.value)}
                          placeholder="Ej: Desarrollador Backend"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>% de Dedicación</Label>
                        <Input 
                          type="number"
                          min="0"
                          max="100"
                          value={assignment.dedicationPercentage}
                          onChange={(e) => handleAssignmentChange(assignment.id, 'dedicationPercentage', Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha de Inicio</Label>
                        <Input 
                          type="date"
                          value={assignment.startDate}
                          onChange={(e) => handleAssignmentChange(assignment.id, 'startDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha de Fin (opcional)</Label>
                        <Input 
                          type="date"
                          value={assignment.endDate || ''}
                          onChange={(e) => handleAssignmentChange(assignment.id, 'endDate', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRemoveAssignment(assignment.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Eliminar Asignación
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}