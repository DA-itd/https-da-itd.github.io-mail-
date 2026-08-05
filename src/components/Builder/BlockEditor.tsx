import React from 'react';
import { Block } from '../../types';
import { ChevronUp, ChevronDown, Trash2, Box, Image as ImageIcon, Type, Link, Minus, Code, Square, Columns } from 'lucide-react';
import { useEditorStore } from '../../store/useEditorStore';

interface BlockEditorProps {
  block: Block;
  index: number;
  totalBlocks: number;
}

export default function BlockEditor({ block, index, totalBlocks }: BlockEditorProps) {
  const { updateBlock, moveBlock, removeBlock } = useEditorStore();
  
  const handleUpdate = (key: keyof Block, value: any) => {
    updateBlock(index, { [key]: value });
  };

  const renderIcon = () => {
    switch (block.type) {
      case 'text': return <Type size={16} />;
      case 'box': return <Square size={16} />;
      case 'header_tri': return <Box size={16} />;
      case 'columns': return <Columns size={16} />;
      case 'image': return <ImageIcon size={16} />;
      case 'button': return <Link size={16} />;
      case 'separator': return <Minus size={16} />;
      case 'html': return <Code size={16} />;
      default: return <Box size={16} />;
    }
  };

  const execFormat = (cmd: string) => {
    document.execCommand(cmd, false, undefined);
  };
  
  const execClean = () => {
    document.execCommand('removeFormat', false, undefined);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center bg-slate-50 p-2 border-b border-slate-100 rounded-t-lg">
        <div className="font-bold text-xs text-blue-800 uppercase flex items-center gap-2">
          {renderIcon()}
          {block.type.replace('_', ' ')}
        </div>
        <div className="flex items-center gap-1">
          <button 
            disabled={index === 0}
            onClick={() => moveBlock(index, -1)} 
            className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-30"
          >
            <ChevronUp size={16} />
          </button>
          <button 
            disabled={index === totalBlocks - 1}
            onClick={() => moveBlock(index, 1)} 
            className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-30"
          >
            <ChevronDown size={16} />
          </button>
          <button 
            onClick={() => removeBlock(index)} 
            className="p-1 hover:bg-red-100 rounded text-red-500 ml-2"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-3 text-sm">
        {block.type === 'text' && (
          <div className="space-y-2">
            <select 
              value={block.align || 'left'} 
              onChange={(e) => handleUpdate('align', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded text-sm"
            >
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
              <option value="justify">Justificado</option>
            </select>
            
            <div className="flex gap-2 p-1 bg-slate-100 rounded">
              <button onMouseDown={(e) => { e.preventDefault(); execFormat('bold'); }} className="px-2 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50"><b>B</b></button>
              <button onMouseDown={(e) => { e.preventDefault(); execFormat('italic'); }} className="px-2 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50"><i>I</i></button>
              <button onMouseDown={(e) => { e.preventDefault(); execClean(); }} className="px-2 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50">🧹 Limpiar</button>
            </div>
            
            <div 
              contentEditable 
              className="min-h-[60px] border border-slate-300 p-2 rounded bg-white text-slate-800"
              onBlur={(e) => handleUpdate('content', e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: block.content || '' }}
            />
          </div>
        )}

        {block.type === 'header_tri' && (
          <div className="space-y-2 bg-blue-50 p-2 border border-blue-200 rounded">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Logo Izq</label>
                <input type="text" value={block.logo1 || ''} onChange={e => handleUpdate('logo1', e.target.value)} className="w-full p-1.5 border border-slate-300 rounded text-xs" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Logo Der</label>
                <input type="text" value={block.logo2 || ''} onChange={e => handleUpdate('logo2', e.target.value)} className="w-full p-1.5 border border-slate-300 rounded text-xs" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Línea 1 (Negrita)</label>
              <input type="text" value={block.line1 || ''} onChange={e => handleUpdate('line1', e.target.value)} className="w-full p-1.5 border border-slate-300 rounded font-bold text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Línea 2</label>
              <input type="text" value={block.line2 || ''} onChange={e => handleUpdate('line2', e.target.value)} className="w-full p-1.5 border border-slate-300 rounded text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Tamaño Logos: {block.logoWidth || 60}%</label>
              <input type="range" min="20" max="100" value={block.logoWidth || 60} onChange={e => handleUpdate('logoWidth', parseInt(e.target.value))} className="w-full" />
            </div>
          </div>
        )}

        {block.type === 'box' && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Fondo</label>
                <input type="color" value={block.bgColor || '#e0f2fe'} onChange={e => handleUpdate('bgColor', e.target.value)} className="w-full h-8" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Texto</label>
                <input type="color" value={block.textColor || '#1e3a8a'} onChange={e => handleUpdate('textColor', e.target.value)} className="w-full h-8" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Alineación</label>
              <select value={block.align || 'center'} onChange={e => handleUpdate('align', e.target.value)} className="w-full p-2 border border-slate-300 rounded">
                <option value="left">Izquierda</option>
                <option value="center">Centro</option>
                <option value="right">Derecha</option>
                <option value="justify">Justificado</option>
              </select>
            </div>
            <div 
              contentEditable 
              className="min-h-[60px] border border-slate-300 p-2 rounded bg-white text-slate-800"
              onBlur={(e) => handleUpdate('content', e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: block.content || '' }}
            />
          </div>
        )}

        {block.type === 'image' && (
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">URL Imagen</label>
              <input type="text" value={block.url || ''} onChange={e => handleUpdate('url', e.target.value)} className="w-full p-2 border border-slate-300 rounded text-sm" />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Alineación</label>
                <select value={block.align || 'center'} onChange={e => handleUpdate('align', e.target.value)} className="w-full p-2 border border-slate-300 rounded">
                  <option value="left">Izquierda</option>
                  <option value="center">Centro</option>
                  <option value="right">Derecha</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Tamaño: {block.width || 100}%</label>
                <input type="range" min="10" max="100" value={block.width || 100} onChange={e => handleUpdate('width', parseInt(e.target.value))} className="w-full" />
              </div>
            </div>
          </div>
        )}

        {block.type === 'separator' && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Color</label>
                <input type="color" value={block.color || '#cbd5e1'} onChange={e => handleUpdate('color', e.target.value)} className="w-full h-8" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Estilo</label>
                <select value={block.style || 'solid'} onChange={e => handleUpdate('style', e.target.value)} className="w-full p-1 border border-slate-300 rounded">
                  <option value="solid">Sólida</option>
                  <option value="dashed">Guiones</option>
                  <option value="dotted">Puntos</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Ancho: {block.width || 90}%</label>
                <input type="range" min="10" max="100" value={block.width || 90} onChange={e => handleUpdate('width', parseInt(e.target.value))} className="w-full" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Grosor: {block.thickness || 2}px</label>
                <input type="range" min="1" max="10" value={block.thickness || 2} onChange={e => handleUpdate('thickness', parseInt(e.target.value))} className="w-full" />
              </div>
            </div>
          </div>
        )}

        {block.type === 'button' && (
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Texto</label>
              <input type="text" value={block.text || ''} onChange={e => handleUpdate('text', e.target.value)} className="w-full p-2 border border-slate-300 rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">URL</label>
              <input type="text" value={block.link || ''} onChange={e => handleUpdate('link', e.target.value)} className="w-full p-2 border border-slate-300 rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Color de Botón</label>
              <input type="color" value={block.btnColor || '#1b396a'} onChange={e => handleUpdate('btnColor', e.target.value)} className="w-full h-8" />
            </div>
          </div>
        )}

        {block.type === 'columns' && (
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-50 p-2 border border-slate-200 rounded">
              <span className="block text-xs font-bold text-blue-700 mb-1">⬅️ Izquierda</span>
              <select value={block.col1Type || 'text'} onChange={e => handleUpdate('col1Type', e.target.value)} className="w-full mb-2 p-1 border rounded text-xs">
                <option value="text">Texto</option>
                <option value="image">Imagen</option>
              </select>
              {block.col1Type === 'image' ? (
                <>
                  <input type="text" placeholder="URL" value={block.col1Content || ''} onChange={e => handleUpdate('col1Content', e.target.value)} className="w-full p-1 border rounded text-xs mb-1" />
                  <input type="range" min="10" max="100" value={block.col1Width || 100} onChange={e => handleUpdate('col1Width', parseInt(e.target.value))} className="w-full" />
                </>
              ) : (
                <textarea rows={3} value={block.col1Content || ''} onChange={e => handleUpdate('col1Content', e.target.value)} className="w-full p-1 border rounded text-xs" />
              )}
            </div>
            <div className="flex-1 bg-slate-50 p-2 border border-slate-200 rounded">
              <span className="block text-xs font-bold text-blue-700 mb-1">➡️ Derecha</span>
              <select value={block.col2Type || 'text'} onChange={e => handleUpdate('col2Type', e.target.value)} className="w-full mb-2 p-1 border rounded text-xs">
                <option value="text">Texto</option>
                <option value="image">Imagen</option>
              </select>
              {block.col2Type === 'image' ? (
                <>
                  <input type="text" placeholder="URL" value={block.col2Content || ''} onChange={e => handleUpdate('col2Content', e.target.value)} className="w-full p-1 border rounded text-xs mb-1" />
                  <input type="range" min="10" max="100" value={block.col2Width || 100} onChange={e => handleUpdate('col2Width', parseInt(e.target.value))} className="w-full" />
                </>
              ) : (
                <textarea rows={3} value={block.col2Content || ''} onChange={e => handleUpdate('col2Content', e.target.value)} className="w-full p-1 border rounded text-xs" />
              )}
            </div>
          </div>
        )}
        
        {block.type === 'html' && (
          <div>
            <textarea 
              rows={4} 
              value={block.content || ''} 
              onChange={e => handleUpdate('content', e.target.value)} 
              className="w-full p-2 bg-slate-800 text-indigo-300 font-mono text-xs rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
