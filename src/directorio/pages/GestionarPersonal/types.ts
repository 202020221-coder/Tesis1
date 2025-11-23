export interface Personnel {
  id: string;
  name: string;
  employeeNo: string;
  role: string;
  position: string;
  area: string;
  status: "active" | "inactive";
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  hireDate?: string;
  department?: string;
  address?: string;
  dni?: string;
  availabilityPercentage?: number;
  vacationDays?: number;
}

export interface Certification {
  id: string;
  name: string;
  entity: string;
  obtainedDate: string;
  expirationDate?: string;
  fileUrl?: string;
  fileName?: string;
}

export interface ProjectAssignment {
  id: string;
  projectName: string;
  projectId: string;
  role: string;
  startDate: string;
  endDate?: string;
  dedicationPercentage: number;
}

export interface PersonalTableProps {
  onEdit: (id: string) => void;
  onAdd: () => void;
  activeTab: "active" | "inactive";
  setActiveTab: (tab: "active" | "inactive") => void;
  personnelData?: Personnel[];
}

export interface PersonalFormProps {
  personnelId: string | null;
  onCancel: () => void;
  onSave?: (data: Personnel) => void;
}

export type ViewType = "table" | "form";