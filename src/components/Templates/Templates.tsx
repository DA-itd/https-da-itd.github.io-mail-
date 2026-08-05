import React from 'react';
import { LayoutTemplate, ChevronRight } from 'lucide-react';

export default function Templates() {
  const templates = [
    { id: '1', name: 'Invitación a Cursos', description: 'Diseño para cursos y talleres.', color: 'bg-blue-500' },
    { id: '2', name: 'Diplomados', description: 'Estructura formal para programas largos.', color: 'bg-indigo-500' },
    { id: '3', name: 'Convocatorias', description: 'Para becas, procesos de admisión.', color: 'bg-green-500' },
    { id: '4', name: 'Reconocimientos', description: 'Felicitaciones y logros.', color: 'bg-yellow-500' },
    { id: '5', name: 'Eventos y Congresos', description: 'Para difundir actividades masivas.', color: 'bg-purple-500' },
    { id: '6', name: 'Avisos Generales', description: 'Comunicados institucionales cortos.', color: 'bg-slate-500' },
  ];

  return (
    <div className="flex-1 bg-slate-50 h-full overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Plantillas Prediseñadas</h2>
            <p className="text-sm text-slate-500">Inicia rápidamente usando una estructura base.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(tpl => (
            <div key={tpl.id} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:border-blue-300 hover:shadow-md transition-all">
              <div className={`h-24 ${tpl.color} flex items-center justify-center`}>
                <LayoutTemplate size={32} className="text-white opacity-80" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-slate-800 mb-1">{tpl.name}</h3>
                <p className="text-sm text-slate-500 flex-1">{tpl.description}</p>
                <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Usar plantilla <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
