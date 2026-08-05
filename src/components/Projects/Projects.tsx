import React from 'react';
import { Project } from '../../types';
import { FolderOpen, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function Projects() {
  const mockProjects: Project[] = [
    { id: '1', name: 'Cursos Agosto 2026', updatedAt: '2026-08-01T10:00:00Z', blocks: [], themeId: '1' },
    { id: '2', name: 'Convocatoria Octubre', updatedAt: '2026-07-15T10:00:00Z', blocks: [], themeId: '1' },
    { id: '3', name: 'Reconocimientos Enero', updatedAt: '2026-06-20T10:00:00Z', blocks: [], themeId: '1' },
    { id: '4', name: 'Diplomado IA', updatedAt: '2026-05-10T10:00:00Z', blocks: [], themeId: '1' },
  ];

  return (
    <div className="flex-1 bg-slate-50 h-full overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Proyectos</h2>
            <p className="text-sm text-slate-500">Historial de correos diseñados.</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
            Nuevo Proyecto
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockProjects.map(project => (
            <div key={project.id} className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <FolderOpen size={24} />
                </div>
                <button className="text-slate-400 hover:text-slate-700">
                  <MoreVertical size={16} />
                </button>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{project.name}</h3>
              <p className="text-xs text-slate-500 mb-4">Actualizado: {new Date(project.updatedAt).toLocaleDateString()}</p>
              
              <div className="flex gap-2 border-t border-slate-100 pt-4">
                <button className="flex-1 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded text-sm font-medium flex items-center justify-center gap-1 hover:bg-slate-100">
                  <Edit2 size={14} /> Editar
                </button>
                <button className="py-1.5 px-3 bg-red-50 text-red-600 rounded text-sm font-medium flex items-center justify-center gap-1 hover:bg-red-100">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
