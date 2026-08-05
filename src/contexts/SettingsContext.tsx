import React, { createContext, useContext, useState, useEffect } from 'react';
import { InstitutionSettings } from '../types';

const defaultSettings: InstitutionSettings = {
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

interface SettingsContextType {
  settings: InstitutionSettings;
  setSettings: (settings: InstitutionSettings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<InstitutionSettings>(() => {
    try {
      const item = window.localStorage.getItem('itd_email_v23_settings');
      return item ? JSON.parse(item) : defaultSettings;
    } catch (error) {
      console.error(error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    window.localStorage.setItem('itd_email_v23_settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
