import { BookTemplate, Box, FileImage, FolderOpen, Settings, LayoutTemplate } from 'lucide-react';
import React from 'react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const menuItems = [
    { id: 'builder', icon: <Box size={20} />, label: 'Constructor' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Configuración' },
    { id: 'library', icon: <FileImage size={20} />, label: 'Biblioteca' },
    { id: 'templates', icon: <LayoutTemplate size={20} />, label: 'Plantillas' },
    { id: 'projects', icon: <FolderOpen size={20} />, label: 'Proyectos' },
  ];

  return (
    <div className="w-20 bg-slate-900 flex flex-col items-center py-6 gap-8 shrink-0 border-r border-slate-800">
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20" title="Mail Studio">
        <BookTemplate size={24} />
      </div>
      
      <nav className="flex-1 flex flex-col gap-6 w-full items-center">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                isActive
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-inner'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
              title={item.label}
            >
              {item.icon}
            </button>
          );
        })}
      </nav>
      
      <div className="mt-auto mb-2 text-slate-500 text-[10px] font-mono tracking-tighter">
        v23.0
      </div>
    </div>
  );
}
