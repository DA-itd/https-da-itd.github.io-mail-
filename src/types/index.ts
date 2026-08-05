export type BlockType = 'text' | 'box' | 'header_tri' | 'columns' | 'image' | 'separator' | 'button' | 'html';

export interface Block {
  id: string;
  type: BlockType;
  // text
  content?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  bgImage?: string;
  bgOpacity?: number;
  bgSize?: 'contain' | 'cover' | 'auto';
  // box
  bgColor?: string;
  textColor?: string;
  // header_tri
  logo1?: string;
  logo2?: string;
  line1?: string;
  line2?: string;
  logoWidth?: number;
  // columns
  col1Type?: 'text' | 'image';
  col1Content?: string;
  col1Align?: 'left' | 'center' | 'right';
  col1Width?: number;
  col2Type?: 'text' | 'image';
  col2Content?: string;
  col2Align?: 'left' | 'center' | 'right';
  col2Width?: number;
  // image
  url?: string;
  width?: number;
  // separator
  color?: string;
  thickness?: number;
  style?: 'solid' | 'dashed' | 'dotted';
  // button
  text?: string;
  link?: string;
  btnColor?: string;
}

export interface InstitutionSettings {
  id: string;
  name: string;
  department: string;
  coordination: string;
  portal: string;
  email: string;
  phone: string;
  accentColor: string;
  logoLeft: string;
  logoRight: string;
  footerText: string;
}

export interface Project {
  id: string;
  name: string;
  updatedAt: string;
  blocks: Block[];
  themeId: string;
}

export interface Asset {
  id: string;
  url: string;
  type: 'logo' | 'banner' | 'background' | 'photo';
  name: string;
}
