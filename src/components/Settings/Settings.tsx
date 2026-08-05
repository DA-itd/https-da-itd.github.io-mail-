import React from 'react';
import { Save } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export default function SettingsView() {
  const { settings, setSettings } = useSettings();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  return (
    <div className="flex-1 bg-slate-50 h-full overflow-y-auto p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Configuración Institucional</h2>
            <p className="text-sm text-slate-500">Personaliza la identidad de los correos</p>
          </div>
          <Button variant="primary" leftIcon={<Save size={18} />}>
            Guardar
          </Button>
        </CardHeader>

        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Nombre de la Institución" name="name" value={settings.name} onChange={handleChange} />
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Color Institucional (Acento)</label>
              <div className="flex gap-2">
                <input type="color" name="accentColor" value={settings.accentColor} onChange={handleChange} className="h-10 w-16 p-1 border border-slate-300 rounded cursor-pointer" />
                <Input name="accentColor" value={settings.accentColor} onChange={handleChange} className="uppercase" />
              </div>
            </div>
            
            <Input label="Departamento" name="department" value={settings.department} onChange={handleChange} />
            <Input label="Coordinación" name="coordination" value={settings.coordination} onChange={handleChange} />
            <Input label="Portal Web" type="url" name="portal" value={settings.portal} onChange={handleChange} />
            <Input label="Correo Institucional" type="email" name="email" value={settings.email} onChange={handleChange} />
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-700 mb-4">Logos y Recursos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input label="Logo Izquierdo (Escudo)" name="logoLeft" value={settings.logoLeft} onChange={handleChange} className="mb-2" placeholder="URL de la imagen" />
                <div className="h-24 bg-slate-100 rounded border border-slate-200 flex items-center justify-center p-2">
                  {settings.logoLeft ? <img src={settings.logoLeft} alt="Logo" className="max-h-full max-w-full object-contain" /> : <span className="text-slate-400">Sin logo</span>}
                </div>
              </div>
              <div>
                <Input label="Logo Derecho (Institucional)" name="logoRight" value={settings.logoRight} onChange={handleChange} className="mb-2" placeholder="URL de la imagen" />
                <div className="h-24 bg-slate-100 rounded border border-slate-200 flex items-center justify-center p-2">
                  {settings.logoRight ? <img src={settings.logoRight} alt="Logo" className="max-h-full max-w-full object-contain" /> : <span className="text-slate-400">Sin logo</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <Input label="Texto del Pie de Página (Footer)" name="footerText" value={settings.footerText} onChange={handleChange} />
          </div>

        </CardBody>
      </Card>
    </div>
  );
}
