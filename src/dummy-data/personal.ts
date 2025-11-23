import { Personnel } from '@/directorio/pages/GestionarPersonal/types';
import { Certification } from '@/directorio/pages/GestionarPersonal/types';
import { ProjectAssignment } from '@/directorio/pages/GestionarPersonal/types';
export const personnelDummyData: Personnel[] = [
  {
    id: "P001",
    name: "AARON BORJA MEDINA",
    employeeNo: "00011814",
    role: "AUXILIAR DE PLANEAMIENTO DE LA PRODUCCION",
    position: "POS-1005620",
    area: "PLANEAMIENTO PRODUCCION",
    status: "active",
    email: "aaron.borja@empresa.com",
    phone: "+51 987 654 321",
    dateOfBirth: "1990-05-15",
    hireDate: "2020-03-10",
    department: "Producción"
  },
  {
    id: "P002",
    name: "ABDON SERGIO CERVANTES RAMIREZ",
    employeeNo: "00011127",
    role: "OPERARIO DE PRODUCCION",
    position: "POS_130548",
    area: "PLANTA LATEX",
    status: "active",
    email: "abdon.cervantes@empresa.com",
    phone: "+51 998 765 432",
    dateOfBirth: "1988-11-22",
    hireDate: "2019-07-15",
    department: "Producción"
  },
  {
    id: "P003",
    name: "ABEL ANTONIO VILLODAS AGUIRRE",
    employeeNo: "00004397",
    role: "OPERADOR DE MONTACARGA",
    position: "POS_130356",
    area: "ALMACENES CENTRALES",
    status: "active",
    email: "abel.villodas@empresa.com",
    phone: "+51 912 345 678",
    dateOfBirth: "1985-03-08",
    hireDate: "2015-01-20",
    department: "Logística"
  },
  {
    id: "P004",
    name: "ABEL BRAYDEN ESTELA IDROGO",
    employeeNo: "00011675",
    role: "PRACTICANTE DE QUIMICOS Y MATERIALES",
    position: "POS_130656",
    area: "SSOMA",
    status: "inactive",
    email: "abel.estela@empresa.com",
    phone: "+51 923 456 789",
    dateOfBirth: "1999-09-12",
    hireDate: "2023-08-01",
    department: "Seguridad y Salud"
  },
  {
    id: "P005",
    name: "ADRIANA LUCIA TORRES MENDOZA",
    employeeNo: "00010234",
    role: "JEFE DE RECURSOS HUMANOS",
    position: "POS-1002345",
    area: "RECURSOS HUMANOS",
    status: "active",
    email: "adriana.torres@empresa.com",
    phone: "+51 934 567 890",
    dateOfBirth: "1987-07-20",
    hireDate: "2018-02-15",
    department: "Administración"
  },
  {
    id: "P006",
    name: "ALBERTO CARLOS MENDEZ RIOS",
    employeeNo: "00009876",
    role: "SUPERVISOR DE CALIDAD",
    position: "POS-1003456",
    area: "CONTROL DE CALIDAD",
    status: "active",
    email: "alberto.mendez@empresa.com",
    phone: "+51 945 678 901",
    dateOfBirth: "1982-12-05",
    hireDate: "2016-09-10",
    department: "Calidad"
  },
  {
    id: "P007",
    name: "ALEJANDRA SOFIA GARCIA LOPEZ",
    employeeNo: "00011892",
    role: "ANALISTA DE SISTEMAS",
    position: "POS-1004567",
    area: "TECNOLOGIA DE LA INFORMACION",
    status: "active",
    email: "alejandra.garcia@empresa.com",
    phone: "+51 956 789 012",
    dateOfBirth: "1993-04-18",
    hireDate: "2021-06-01",
    department: "TI"
  },
  {
    id: "P008",
    name: "ALEJANDRO MARTIN CASTRO SILVA",
    employeeNo: "00008765",
    role: "TECNICO DE MANTENIMIENTO",
    position: "POS_130789",
    area: "MANTENIMIENTO INDUSTRIAL",
    status: "active",
    email: "alejandro.castro@empresa.com",
    phone: "+51 967 890 123",
    dateOfBirth: "1989-01-30",
    hireDate: "2017-11-20",
    department: "Mantenimiento"
  },
  {
    id: "P009",
    name: "ALICIA FERNANDA RUIZ PAREDES",
    employeeNo: "00011543",
    role: "ASISTENTE ADMINISTRATIVA",
    position: "POS_130890",
    area: "ADMINISTRACION GENERAL",
    status: "active",
    email: "alicia.ruiz@empresa.com",
    phone: "+51 978 901 234",
    dateOfBirth: "1995-06-25",
    hireDate: "2022-03-15",
    department: "Administración"
  },
  {
    id: "P010",
    name: "ANDERSON JAVIER LOPEZ DIAZ",
    employeeNo: "00007654",
    role: "INGENIERO DE PROCESOS",
    position: "POS-1005678",
    area: "INGENIERIA DE PROCESOS",
    status: "active",
    email: "anderson.lopez@empresa.com",
    phone: "+51 989 012 345",
    dateOfBirth: "1986-10-14",
    hireDate: "2014-05-08",
    department: "Ingeniería"
  },
  {
    id: "P011",
    name: "ANDREA CAROLINA MORALES VEGA",
    employeeNo: "00011234",
    role: "COORDINADORA DE VENTAS",
    position: "POS-1006789",
    area: "VENTAS Y MARKETING",
    status: "active",
    email: "andrea.morales@empresa.com",
    phone: "+51 990 123 456",
    dateOfBirth: "1991-08-07",
    hireDate: "2019-10-22",
    department: "Ventas"
  },
  {
    id: "P012",
    name: "ANDRES FELIPE ROMERO CHAVEZ",
    employeeNo: "00009321",
    role: "OPERARIO DE ALMACEN",
    position: "POS_130901",
    area: "ALMACENES CENTRALES",
    status: "inactive",
    email: "andres.romero@empresa.com",
    phone: "+51 901 234 567",
    dateOfBirth: "1992-02-28",
    hireDate: "2018-12-05",
    department: "Logística"
  },
  {
    id: "P013",
    name: "ANGELA MARIA FLORES SANCHEZ",
    employeeNo: "00011098",
    role: "ESPECIALISTA EN SSOMA",
    position: "POS-1007890",
    area: "SSOMA",
    status: "active",
    email: "angela.flores@empresa.com",
    phone: "+51 912 345 670",
    dateOfBirth: "1988-11-11",
    hireDate: "2017-04-18",
    department: "Seguridad y Salud"
  },
  {
    id: "P014",
    name: "ANTHONY DANIEL VARGAS ROJAS",
    employeeNo: "00010876",
    role: "SUPERVISOR DE PRODUCCION",
    position: "POS-1008901",
    area: "PLANTA LATEX",
    status: "active",
    email: "anthony.vargas@empresa.com",
    phone: "+51 923 456 781",
    dateOfBirth: "1984-07-03",
    hireDate: "2015-08-25",
    department: "Producción"
  },
  {
    id: "P015",
    name: "ANTONELLA ISABEL GOMEZ PEREZ",
    employeeNo: "00011765",
    role: "PRACTICANTE DE MARKETING",
    position: "POS_131012",
    area: "VENTAS Y MARKETING",
    status: "inactive",
    email: "antonella.gomez@empresa.com",
    phone: "+51 934 567 892",
    dateOfBirth: "2000-12-19",
    hireDate: "2024-01-15",
    department: "Ventas"
  },
  {
    id: "P016",
    name: "ANTONIO JOSE HERRERA ORTIZ",
    employeeNo: "00008543",
    role: "JEFE DE MANTENIMIENTO",
    position: "POS-1009012",
    area: "MANTENIMIENTO INDUSTRIAL",
    status: "active",
    email: "antonio.herrera@empresa.com",
    phone: "+51 945 678 903",
    dateOfBirth: "1981-05-26",
    hireDate: "2013-07-12",
    department: "Mantenimiento"
  },
  {
    id: "P017",
    name: "CARMEN ROSA DELGADO LUNA",
    employeeNo: "00009987",
    role: "CONTADORA GENERAL",
    position: "POS-1010123",
    area: "CONTABILIDAD Y FINANZAS",
    status: "active",
    email: "carmen.delgado@empresa.com",
    phone: "+51 956 789 014",
    dateOfBirth: "1983-09-09",
    hireDate: "2016-03-20",
    department: "Finanzas"
  },
  {
    id: "P018",
    name: "CARLOS EDUARDO SOTO RAMIREZ",
    employeeNo: "00007321",
    role: "GERENTE DE OPERACIONES",
    position: "POS-1000001",
    area: "GERENCIA DE OPERACIONES",
    status: "active",
    email: "carlos.soto@empresa.com",
    phone: "+51 967 890 125",
    dateOfBirth: "1978-03-15",
    hireDate: "2010-01-05",
    department: "Gerencia"
  },
  {
    id: "P019",
    name: "CAROLINA BEATRIZ NAVARRO CRUZ",
    employeeNo: "00011432",
    role: "ASISTENTE DE CALIDAD",
    position: "POS_131123",
    area: "CONTROL DE CALIDAD",
    status: "active",
    email: "carolina.navarro@empresa.com",
    phone: "+51 978 901 236",
    dateOfBirth: "1994-06-21",
    hireDate: "2021-09-10",
    department: "Calidad"
  },
  {
    id: "P020",
    name: "CESAR AUGUSTO RAMOS FLORES",
    employeeNo: "00009654",
    role: "ANALISTA DE COMPRAS",
    position: "POS-1011234",
    area: "LOGISTICA Y COMPRAS",
    status: "inactive",
    email: "cesar.ramos@empresa.com",
    phone: "+51 989 012 347",
    dateOfBirth: "1987-10-31",
    hireDate: "2017-02-14",
    department: "Logística"
  }
];

// Funciones auxiliares que podrías necesitar
export const getActivePersonnel = () => personnelDummyData.filter(p => p.status === "active");
export const getInactivePersonnel = () => personnelDummyData.filter(p => p.status === "inactive");
export const getPersonnelByArea = (area: string) => personnelDummyData.filter(p => p.area === area);
export const getPersonnelById = (id: string) => personnelDummyData.find(p => p.id === id);

// ... código existente de personnelDummyData ...

export const certificationsDummyData: Record<string, Certification[]> = {
  "P001": [
    {
      id: "C001",
      name: "Gestión de la Producción",
      entity: "Instituto Tecnológico",
      obtainedDate: "2022-05-15",
      expirationDate: "2025-05-15",
      fileName: "cert_produccion.pdf"
    },
    {
      id: "C002",
      name: "Six Sigma Green Belt",
      entity: "ASQ",
      obtainedDate: "2021-08-20",
      fileName: "cert_sixsigma.pdf"
    }
  ],
  "P002": [
    {
      id: "C003",
      name: "Operador de Máquinas Industriales",
      entity: "SENATI",
      obtainedDate: "2019-03-10",
      expirationDate: "2024-03-10",
      fileName: "cert_operador.pdf"
    }
  ],
  "P005": [
    {
      id: "C004",
      name: "Especialista en Gestión de Talento",
      entity: "SHRM",
      obtainedDate: "2020-11-05",
      fileName: "cert_rrhh.pdf"
    },
    {
      id: "C005",
      name: "Coach Profesional Certificado",
      entity: "ICF",
      obtainedDate: "2021-06-15",
      expirationDate: "2026-06-15",
      fileName: "cert_coach.pdf"
    }
  ],
  "P007": [
    {
      id: "C006",
      name: "AWS Solutions Architect",
      entity: "Amazon Web Services",
      obtainedDate: "2023-02-20",
      expirationDate: "2026-02-20",
      fileName: "cert_aws.pdf"
    }
  ]
};

export const projectAssignmentsDummyData: Record<string, ProjectAssignment[]> = {
  "P001": [
    {
      id: "PA001",
      projectName: "Optimización Línea de Producción A",
      projectId: "PROJ-001",
      role: "Coordinador de Planeamiento",
      startDate: "2024-01-15",
      endDate: "2025-06-30",
      dedicationPercentage: 80
    },
    {
      id: "PA002",
      projectName: "Implementación ERP Módulo Producción",
      projectId: "PROJ-015",
      role: "Asesor Técnico",
      startDate: "2024-11-01",
      dedicationPercentage: 20
    }
  ],
  "P002": [
    {
      id: "PA003",
      projectName: "Expansión Planta Latex",
      projectId: "PROJ-008",
      role: "Operario Principal",
      startDate: "2024-03-01",
      endDate: "2025-12-31",
      dedicationPercentage: 100
    }
  ],
  "P005": [
    {
      id: "PA004",
      projectName: "Programa de Desarrollo Organizacional",
      projectId: "PROJ-022",
      role: "Líder de RRHH",
      startDate: "2024-06-01",
      dedicationPercentage: 60
    },
    {
      id: "PA005",
      projectName: "Implementación Sistema de Evaluación",
      projectId: "PROJ-025",
      role: "Consultor Principal",
      startDate: "2024-09-15",
      endDate: "2025-03-15",
      dedicationPercentage: 40
    }
  ],
  "P007": [
    {
      id: "PA006",
      projectName: "Migración a Cloud AWS",
      projectId: "PROJ-030",
      role: "Arquitecto de Soluciones",
      startDate: "2024-10-01",
      dedicationPercentage: 75
    }
  ],
  "P010": [
    {
      id: "PA007",
      projectName: "Mejora Continua Procesos",
      projectId: "PROJ-012",
      role: "Ingeniero Líder",
      startDate: "2024-02-01",
      endDate: "2025-08-30",
      dedicationPercentage: 90
    }
  ]
};

// Funciones auxiliares actualizadas
export const getCertificationsByPersonnelId = (personnelId: string): Certification[] => {
  return certificationsDummyData[personnelId] || [];
};

export const getProjectAssignmentsByPersonnelId = (personnelId: string): ProjectAssignment[] => {
  return projectAssignmentsDummyData[personnelId] || [];
};