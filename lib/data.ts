// Types
export interface Project {
  id: string;
  title: string;
  author: string;
  career: string;
  year: number;
  category: string;
  description: string;
  tags: string[];
  downloads: number;
  views: number;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
  pdfUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  career?: string;
  avatar?: string;
  uploadedProjects: number;
  favorites: string[];
  createdAt: string;
}

export interface Career {
  id: string;
  name: string;
  shortName: string;
  projectCount: number;
}

// Mock Data
export const careers: Career[] = [
  { id: '1', name: 'Ingeniería en Informática', shortName: 'INF', projectCount: 245 },
  { id: '2', name: 'Ingeniería Eléctrica', shortName: 'ELE', projectCount: 178 },
  { id: '3', name: 'Ingeniería Civil', shortName: 'CIV', projectCount: 156 },
  { id: '4', name: 'Ingeniería Mecánica', shortName: 'MEC', projectCount: 134 },
  { id: '5', name: 'Ingeniería Industrial', shortName: 'IND', projectCount: 112 },
  { id: '6', name: 'Licenciatura en Análisis de Sistemas', shortName: 'LAS', projectCount: 98 },
];

export const categories = [
  'Desarrollo de Software',
  'Inteligencia Artificial',
  'Redes y Telecomunicaciones',
  'Sistemas Embebidos',
  'Base de Datos',
  'Seguridad Informática',
  'Energías Renovables',
  'Automatización',
  'Estructuras',
  'Gestión de Proyectos',
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Sistema de Gestión de Inventarios con IA para PyMEs',
    author: 'María González Fernández',
    career: 'Ingeniería en Informática',
    year: 2024,
    category: 'Inteligencia Artificial',
    description: 'Desarrollo de un sistema integral de gestión de inventarios utilizando técnicas de machine learning para predicción de demanda y optimización de stock. El sistema incluye módulos de análisis predictivo, alertas automáticas y reportes en tiempo real.',
    tags: ['Python', 'Machine Learning', 'Django', 'PostgreSQL'],
    downloads: 342,
    views: 1205,
    status: 'approved',
    createdAt: '2024-03-15',
    pdfUrl: '/sample.pdf',
  },
  {
    id: '2',
    title: 'Plataforma IoT para Monitoreo de Cultivos Agrícolas',
    author: 'Juan Carlos Mendoza',
    career: 'Ingeniería Eléctrica',
    year: 2024,
    category: 'Sistemas Embebidos',
    description: 'Implementación de una red de sensores IoT para el monitoreo en tiempo real de variables ambientales en cultivos. Incluye dashboard web y aplicación móvil para agricultores.',
    tags: ['Arduino', 'ESP32', 'Node.js', 'React Native'],
    downloads: 287,
    views: 956,
    status: 'approved',
    createdAt: '2024-02-28',
    pdfUrl: '/sample.pdf',
  },
  {
    id: '3',
    title: 'Diseño Estructural de Puente Peatonal Modular',
    author: 'Ana Belén Ortiz',
    career: 'Ingeniería Civil',
    year: 2023,
    category: 'Estructuras',
    description: 'Propuesta de diseño innovador para puentes peatonales modulares con materiales sostenibles. Incluye análisis de resistencia, simulaciones FEM y presupuesto detallado.',
    tags: ['AutoCAD', 'SAP2000', 'Revit', 'Sostenibilidad'],
    downloads: 198,
    views: 743,
    status: 'approved',
    createdAt: '2023-11-20',
    pdfUrl: '/sample.pdf',
  },
  {
    id: '4',
    title: 'Aplicación Web para Telemedicina Rural',
    author: 'Roberto Arce Villalba',
    career: 'Licenciatura en Análisis de Sistemas',
    year: 2024,
    category: 'Desarrollo de Software',
    description: 'Desarrollo de plataforma de telemedicina orientada a comunidades rurales con conectividad limitada. Permite consultas médicas virtuales, gestión de historiales clínicos y recetas electrónicas.',
    tags: ['Next.js', 'TypeScript', 'WebRTC', 'MongoDB'],
    downloads: 256,
    views: 892,
    status: 'approved',
    createdAt: '2024-01-10',
    pdfUrl: '/sample.pdf',
  },
  {
    id: '5',
    title: 'Sistema de Control Automático para Invernaderos',
    author: 'Laura Patricia Benítez',
    career: 'Ingeniería Mecánica',
    year: 2023,
    category: 'Automatización',
    description: 'Diseño e implementación de sistema de control automático para regulación de temperatura, humedad y riego en invernaderos. Incluye PLC, HMI y sistema SCADA.',
    tags: ['PLC', 'SCADA', 'Control PID', 'HMI'],
    downloads: 178,
    views: 654,
    status: 'approved',
    createdAt: '2023-09-05',
    pdfUrl: '/sample.pdf',
  },
  {
    id: '6',
    title: 'Blockchain para Trazabilidad de Productos Agrícolas',
    author: 'Carlos Eduardo Ruiz',
    career: 'Ingeniería en Informática',
    year: 2024,
    category: 'Seguridad Informática',
    description: 'Implementación de sistema blockchain para garantizar la trazabilidad de productos agrícolas desde su origen hasta el consumidor final.',
    tags: ['Ethereum', 'Solidity', 'Web3.js', 'React'],
    downloads: 312,
    views: 1089,
    status: 'approved',
    createdAt: '2024-04-01',
    pdfUrl: '/sample.pdf',
  },
  {
    id: '7',
    title: 'Red Neuronal para Detección de Fallas Eléctricas',
    author: 'Patricia Giménez López',
    career: 'Ingeniería Eléctrica',
    year: 2024,
    category: 'Inteligencia Artificial',
    description: 'Desarrollo de modelo de deep learning para detección temprana de fallas en sistemas de distribución eléctrica mediante análisis de señales.',
    tags: ['TensorFlow', 'Python', 'MATLAB', 'CNN'],
    downloads: 234,
    views: 867,
    status: 'approved',
    createdAt: '2024-03-22',
    pdfUrl: '/sample.pdf',
  },
  {
    id: '8',
    title: 'Optimización de Procesos de Manufactura con Lean Six Sigma',
    author: 'Diego Martín Acosta',
    career: 'Ingeniería Industrial',
    year: 2023,
    category: 'Gestión de Proyectos',
    description: 'Caso de estudio de implementación de metodología Lean Six Sigma en empresa manufacturera local. Incluye análisis DMAIC y resultados de mejora continua.',
    tags: ['Lean', 'Six Sigma', 'Minitab', 'DMAIC'],
    downloads: 156,
    views: 589,
    status: 'approved',
    createdAt: '2023-10-15',
    pdfUrl: '/sample.pdf',
  },
];

export const pendingProjects: Project[] = [
  {
    id: 'p1',
    title: 'Sistema de Reconocimiento Facial para Control de Acceso',
    author: 'Fernando José López',
    career: 'Ingeniería en Informática',
    year: 2024,
    category: 'Inteligencia Artificial',
    description: 'Desarrollo de sistema de reconocimiento facial para control de acceso en edificios corporativos.',
    tags: ['OpenCV', 'Python', 'Deep Learning', 'Raspberry Pi'],
    downloads: 0,
    views: 45,
    status: 'pending',
    createdAt: '2024-04-10',
    pdfUrl: '/sample.pdf',
  },
  {
    id: 'p2',
    title: 'Análisis de Vibraciones en Maquinaria Industrial',
    author: 'Sofía Ramírez Castro',
    career: 'Ingeniería Mecánica',
    year: 2024,
    category: 'Automatización',
    description: 'Estudio de técnicas de análisis de vibraciones para mantenimiento predictivo en maquinaria industrial.',
    tags: ['MATLAB', 'FFT', 'Vibración', 'Mantenimiento'],
    downloads: 0,
    views: 32,
    status: 'pending',
    createdAt: '2024-04-08',
    pdfUrl: '/sample.pdf',
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria.gonzalez@fpune.edu.py',
    role: 'student',
    career: 'Ingeniería en Informática',
    uploadedProjects: 2,
    favorites: ['1', '4', '6'],
    createdAt: '2022-03-15',
  },
  {
    id: '2',
    name: 'Dr. Roberto Arce',
    email: 'roberto.arce@fpune.edu.py',
    role: 'teacher',
    career: 'Ingeniería en Informática',
    uploadedProjects: 0,
    favorites: ['1', '2', '3'],
    createdAt: '2018-08-01',
  },
  {
    id: '3',
    name: 'Admin FPUNE',
    email: 'admin@fpune.edu.py',
    role: 'admin',
    uploadedProjects: 0,
    favorites: [],
    createdAt: '2015-01-01',
  },
];

// Statistics
export const statistics = {
  totalProjects: 825,
  totalCareers: 6,
  totalDownloads: 12453,
  activeUsers: 1847,
  projectsThisMonth: 42,
  downloadsThisMonth: 1256,
};

// Chart Data
export const projectsByYear = [
  { year: '2020', count: 98 },
  { year: '2021', count: 124 },
  { year: '2022', count: 156 },
  { year: '2023', count: 198 },
  { year: '2024', count: 249 },
];

export const downloadsByMonth = [
  { month: 'Ene', downloads: 890 },
  { month: 'Feb', downloads: 1020 },
  { month: 'Mar', downloads: 1180 },
  { month: 'Abr', downloads: 980 },
  { month: 'May', downloads: 1340 },
  { month: 'Jun', downloads: 1150 },
  { month: 'Jul', downloads: 870 },
  { month: 'Ago', downloads: 1420 },
  { month: 'Sep', downloads: 1280 },
  { month: 'Oct', downloads: 1560 },
  { month: 'Nov', downloads: 1380 },
  { month: 'Dic', downloads: 1385 },
];

export const projectsByCategory = [
  { category: 'Desarrollo de Software', count: 185 },
  { category: 'Inteligencia Artificial', count: 142 },
  { category: 'Redes y Telecomunicaciones', count: 98 },
  { category: 'Automatización', count: 112 },
  { category: 'Estructuras', count: 87 },
  { category: 'Otros', count: 201 },
];
