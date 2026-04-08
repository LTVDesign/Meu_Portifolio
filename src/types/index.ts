// Tipos para Partículas
export interface ParticleConfig {
  particleColor: string;
  speed: number;
  intensity: number;
  quantity: number;
  zoom: number;
  backgroundType: string;
  liquidResolution: number;
  liquidOctaves: number;
  liquidSpeed: number;
  liquidScale: number;
  liquidComplexity: number;
  liquidExpansion: number;
  liquidTwist: number;
  liquidGrain: number;
  liquidSmoothing: number;
  liquidColor1: string;
  liquidColor2: string;
  liquidColor3: string;
  liquidColor4: string;
  liquidColor5: string;
  liquidColor6: string;
  liquidIntensity: number;
  liquidNoiseScale: number;
  liquidGloss: number;
  liquidRefraction: number;
  particulateSpeed: number;
  particulateIntensity: number;
  particulateColor: string;
  particulateMode: string;
  particulateQuantity: number;
  particulateSize: number;
  particulateFriction: number;
  particulateSpring: number;
  particulatePalette: string;
  particulateColor1: string;
  particulateColor2: string;
  particulateColor3: string;
  particulateColor4: string;
  particulateColor5: string;
  particulateColor6: string;
  cyberpunkBloomStrength: number;
  cyberpunkFogDensity: number;
  cyberpunkSpeed: number;
  cyberpunkColor1: string;
  cyberpunkColor2: string;
  cyberpunkColor3: string;
  cyberpunkRotationSpeed: number;
  cyberpunkTunnelRadius: number;
  cyberpunkPointSize: number;
  cyberpunkLineOpacity: number;
  cyberpunkCameraFOV: number;
  wavefieldSpeed: number;
  wavefieldAmplitude: number;
  wavefieldColor: string;
  solidType: string;
  solidColor1: string;
  solidColor2: string;
  solidColor3: string;
  solidColor1Alpha: number;
  solidColor2Alpha: number;
  solidColor3Alpha: number;
  solidAngle: number;
  solidAnimationSpeed: number;
  solidGrain: boolean;
  solidOpacity: number;
  solidBlur: number;
  solidScale: number;
  particleSize: number;
  particleConnectDistance: number;
  lineThickness: number;
  particleOpacity: number;
  particleLineColor: string;
  particulateWanderSpeed: number;
  particulateWanderStrength: number;
  wavefieldFrequency: number;
  wavefieldComplexity: number;
  wavefieldGlow: number;
  wavefieldStarIntensity: number;
  wavefieldColor2: string;
  wavefieldColor3: string;
  wavefieldRotationSpeed: number;
  wavefieldMouseStrength: number;
  bolhasCount: number;
  bolhasSpeed: number;
  bolhasSize: number;
  bolhasSpread: number;
  bolhasColor1: string;
  bolhasColor2: string;
  bolhasColor3: string;
  matrixDensity: number;
  matrixSpeed: number;
  matrixFontSize: number;
  matrixColor: string;
  matrixBackgroundColor: string;
  glowIntensity: number;
  trailLength: number;
  columnSpacing: number;
  matrixCharSet: 'matrix' | 'binary' | 'japanese' | 'mixed';
  interactionMode?: 'none' | 'blow' | 'attract' | 'freeze';
}

// Props para componentes de editor
export interface EditorProps {
  config: ParticleConfig;
  updateConfig: (newConfig: Partial<ParticleConfig>) => void;
}

// Tipos para Cursos
export interface Curso {
  id: string;
  title: string;
  platform: string;
  date: string;
  duration?: string;
  workload?: string;
  icon: string;
  description: string;
  summary: string;
  modules?: string[];
  verificationLink?: string;
  isProfessionalCertificate?: boolean;
  withHonors?: boolean;
  link?: string;
  authCode?: string;
}

// Tipos para Formação
export interface Disciplina {
  materia: string;
  nota: string | number;
  cargaHoraria: string;
  professor: string;
  semestre?: string;
}

export interface FormacaoData {
  id: string;
  title: string;
  institution: string;
  date: string;
  status: 'CONCLUÍDO' | 'EM ANDAMENTO' | 'APROVADO';
  description: string;
  icon: string;
  logo: string;
  period: string;
  disciplinas: (string | Disciplina)[];
  cargaHorariaGeral?: string;
  dataConclusao?: string;
  diplomaLink?: string;
  diplomaPreview?: string;
  diplomaDownload?: string;
  authLink?: string;
  qrCode?: string;
  link: string;
  publicoAlvo?: string[];
  objetivos?: string[];
  tipoFormacao?: string;
  statusDiploma?: string;
  nota?: string;
}

// Tipos para Experiência
export interface ExperienceData {
  id: string;
  title: string;
  company: string;
  date: string;
  points: string[];
  description?: string;
  icon: string;
  link?: string;
  iconBg?: string;
  certificateImage?: string;
  validateLink?: string;
}

// Tipos para Trabalhos/Projetos
export interface WorkData {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
  icon: string;
  link: string;
}

// Tipos para Tecnologias
export interface TechData {
  id: string;
  title: string;
  icon: string;
  description: string;
  link: string;
}

// Tipos para Formulário de Contato
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Tipos para resposta do serviço de email
export interface EmailServiceResponse {
  success: boolean;
  message: string;
}

// Tipos para Modal
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Tipos para SectionWrapper
export interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

// Tipo para Navbar
export interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
}

// Tipo para Header
export interface HeaderProps {
  title: string;
  subtitle?: string;
}

// Tipos para Certificados
export interface Certificado {
  name: string;
  path: string;
  institution?: string;
  description?: string;
  validationLink?: string;
  authCode?: string;
  date?: string;
  workload?: string;
  courseLink?: string;
}

// Tipos para Uniforms de shaders
export interface WavefieldUniforms {
  speed: { value: number };
  amplitude: { value: number };
  color: { value: THREE.Color };
  color2: { value: THREE.Color };
  color3: { value: THREE.Color };
  frequency: { value: number };
  complexity: { value: number };
  glow: { value: number };
  starIntensity: { value: number };
  rotationSpeed: { value: number };
  mouseStrength: { value: number };
}

// Import para tipos THREE
import type * as THREE from 'three';

// Tipos comuns
export interface TCommonProps {
  title?: string;
  name?: string;
  icon?: string;
}

// Tipos para Experiência
export type TExperience = {
  companyName: string;
  iconBg: string;
  date: string;
  points: string[];
  subjects?: { name: string; grade: string }[];
  certificateImage?: string;
  validateLink?: string;
} & Required<Omit<TCommonProps, 'name'>>;

// Tipos para Depoimentos
export type TTestimonial = {
  testimonial: string;
  designation: string;
  company: string;
  image: string;
} & Required<Pick<TCommonProps, 'name'>>;

// Tipos para Projetos
export type TProject = {
  description: string;
  tags: {
    name: string;
    color: string;
  }[];
  image: string;
  sourceCodeLink: string;
  status?: string;
  category?: string;
} & Required<Pick<TCommonProps, 'name'>>;

// Tipos para Tecnologias
export type TTechnology = {
  category?: string;
} & Required<Omit<TCommonProps, 'title'>>;

// Tipos para Links de Navegação
export type TNavLink = {
  id: string;
} & Required<Pick<TCommonProps, 'title'>>;

// Tipos para Serviços
export type TService = Required<Omit<TCommonProps, 'name'>> & {
  description?: string;
};

// Tipos para Motion
export type TMotion = {
  direction: 'up' | 'down' | 'left' | 'right' | '';
  type: 'tween' | 'spring';
  delay: number;
  duration: number;
};
