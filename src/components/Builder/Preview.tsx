import React, { useRef } from 'react';
import { Block, InstitutionSettings } from '../../types';
import { buildEmailHTML } from '../../utils/emailGenerator';

interface PreviewProps {
  blocks: Block[];
  settings: InstitutionSettings;
}

export default function Preview({ blocks, settings }: PreviewProps) {
  const htmlContent = buildEmailHTML(blocks, settings);
  
  return (
    <main className="flex-1 flex flex-col bg-slate-200 shadow-inner p-8 overflow-hidden">
      {/* Toolbar Header */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm border border-slate-300/50">
          <div className="flex items-center gap-1 border-r border-slate-200 pr-4">
            <span className="text-xs font-semibold text-slate-400 ml-2">PROYECTO:</span>
            <span className="text-xs font-bold text-slate-900">Proyecto_Actual.json</span>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-100 text-[11px] font-bold rounded hover:bg-slate-200 transition-colors">Escritorio</button>
            <button className="px-3 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-100 rounded transition-colors">Móvil</button>
          </div>
        </div>
      </div>

      {/* Email Canvas container */}
      <div className="flex-1 overflow-y-auto flex justify-center pb-8">
        <div 
          id="copy-target"
          className="w-full max-w-[600px] h-max bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-300"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      
      {/* Page Info */}
      <div className="mt-4 shrink-0 flex justify-between items-center text-slate-500 text-[10px] font-medium bg-white/50 p-2 rounded border border-slate-300/50">
        <div className="flex gap-4">
          <span>BLOQUES: {blocks.length}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span>COMPATIBILIDAD GMAIL: 98%</span>
        </div>
      </div>
    </main>
  );
}
