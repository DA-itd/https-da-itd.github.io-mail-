import { useState, useEffect } from 'react';
import { Block, InstitutionSettings, Project, Asset } from '../types';

export const defaultSettings: InstitutionSettings = {
  id: 'default',
  name: 'Instituto Tecnológico de Durango',
  department: 'Departamento de Desarrollo Académico',
  coordination: 'Coordinación de Actualización Docente',
  portal: 'https://www.itdurango.edu.mx',
  email: 'contacto@itdurango.edu.mx',
  phone: '',
  accentColor: '#1b396a',
  logoLeft: 'https://raw.githubusercontent.com/DA-itd/web/main/logo_itdurango.png',
  logoRight: 'https://raw.githubusercontent.com/DA-itd/A/main/tecnm1.jpg',
  footerText: 'Coordinación de Actualización Docente',
};

export const defaultBlocks: Block[] = [
  {
    id: 'b1',
    type: 'header_tri',
    logo1: defaultSettings.logoLeft,
    logo2: defaultSettings.logoRight,
    line1: defaultSettings.name,
    line2: defaultSettings.department,
    logoWidth: 60,
  },
  {
    id: 'b2',
    type: 'text',
    content: 'Inicia tu correo aquí.',
    align: 'left',
  },
];

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
