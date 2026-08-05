import React from 'react';
import { InstitutionSettings } from '../../types';
import { Save } from 'lucide-react';

interface SettingsProps {
  settings: InstitutionSettings;
  setSettings: (settings: InstitutionSettings) => void;
}

export default function SettingsView({ settings, setSettings }: SettingsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  return (
    <div className="flex-1 bg-slate-50 h-full overflow-y-auto p-8">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Configuración Institucional</h2>
            <p className="text-sm text-slate-500">Personaliza la identidad de los correos</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded font-medium flex items-center gap-2 hover:bg-blue-700">
            <Save size={18} /> Guardar
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nombre de la Institución</label>
              <input type="text" name="name" value={settings.name} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Color Institucional (Acento)</label>
              <div className="flex gap-2">
                <input type="color" name="accentColor" value={settings.accentColor} onChange={handleChange} className="h-10 w-16 p-1 border border-slate-300 rounded cursor-pointer" />
                <input type="text" name="accentColor" value={settings.accentColor} onChange={handleChange} className="flex-1 p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none uppercase" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Departamento</label>
              <input type="text" name="department" value={settings.department} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Coordinación</label>
              <input type="text" name="coordination" value={settings.coordination} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Portal Web</label>
              <input type="url" name="portal" value={settings.portal} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Correo Institucional</label>
              <input type="email" name="email" value={settings.email} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-700 mb-4">Logos y Recursos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Logo Izquierdo (Escudo)</label>
                <input type="text" name="logoLeft" value={settings.logoLeft} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none mb-2" placeholder="URL de la imagen" />
                <div className="h-24 bg-slate-100 rounded border border-slate-200 flex items-center justify-center p-2">
                  {settings.logoLeft ? <img src={settings.logoLeft} alt="Logo" className="max-h-full max-w-full object-contain" /> : <span className="text-slate-400">Sin logo</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Logo Derecho (Institucional)</label>
                <input type="text" name="logoRight" value={settings.logoRight} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none mb-2" placeholder="URL de la imagen" />
                <div className="h-24 bg-slate-100 rounded border border-slate-200 flex items-center justify-center p-2">
                  {settings.logoRight ? <img src={settings.logoRight} alt="Logo" className="max-h-full max-w-full object-contain" /> : <span className="text-slate-400">Sin logo</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <label className="block text-sm font-bold text-slate-700 mb-1">Texto del Pie de Página (Footer)</label>
            <input type="text" name="footerText" value={settings.footerText} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

        </div>
      </div>
    </div>
  );
}
