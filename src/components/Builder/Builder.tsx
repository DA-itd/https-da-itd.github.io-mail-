import React, { useRef } from 'react';
import { Block, BlockType, InstitutionSettings } from '../../types';
import BlockEditor from './BlockEditor';
import Preview from './Preview';
import { 
  Type, Box, Image as ImageIcon, Link, Minus, Code, Square, Columns, 
  Save, FolderOpen, Copy, Mail 
} from 'lucide-react';
import { buildEmailHTML } from '../../utils/emailGenerator';

interface BuilderProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  settings: InstitutionSettings;
}

export default function Builder({ blocks, setBlocks, settings }: BuilderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = { id: Date.now().toString(), type };
    if (type === 'text') { newBlock.content = 'Escribe aquí...'; newBlock.align = 'left'; newBlock.bgImage = ''; newBlock.bgOpacity = 0.06; newBlock.bgSize = 'contain'; }
    if (type === 'box') { newBlock.content = 'DESTACADO'; newBlock.bgColor = '#e0f2fe'; newBlock.textColor = '#0c4a6e'; newBlock.align = 'center'; }
    if (type === 'image') { newBlock.url = ''; newBlock.align = 'center'; newBlock.width = 100; }
    if (type === 'button') { newBlock.text = 'Click'; newBlock.btnColor = '#1b396a'; }
    if (type === 'columns') { newBlock.col1Type = 'text'; newBlock.col1Content = 'Izq...'; newBlock.col1Align = 'left'; newBlock.col1Width = 100; newBlock.col2Type = 'text'; newBlock.col2Content = 'Der...'; newBlock.col2Align = 'left'; newBlock.col2Width = 100; }
    if (type === 'separator') { newBlock.color = '#cbd5e1'; newBlock.width = 90; newBlock.thickness = 2; newBlock.style = 'solid'; }
    if (type === 'header_tri') {
      newBlock.logo1 = settings.logoLeft;
      newBlock.logo2 = settings.logoRight;
      newBlock.line1 = settings.name;
      newBlock.line2 = settings.department;
      newBlock.logoWidth = 60;
    }
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (index: number, updates: Partial<Block>) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    setBlocks(newBlocks);
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    if ((direction === -1 && index > 0) || (direction === 1 && index < blocks.length - 1)) {
      const newBlocks = [...blocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index + direction];
      newBlocks[index + direction] = temp;
      setBlocks(newBlocks);
    }
  };

  const removeBlock = (index: number) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  const handleSaveJson = () => {
    const data = JSON.stringify({ blocks, accentColor: settings.accentColor });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); 
    a.href = url; 
    a.download = 'plantilla_itd.json';
    document.body.appendChild(a); 
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 100);
  };

  const handleLoadJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.blocks) {
          setBlocks(data.blocks);
        }
      } catch (err) {
        alert('Error al cargar archivo JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const copyToClipboard = async () => {
    const htmlContent = buildEmailHTML(blocks, settings);
    const temp = document.createElement('div');
    temp.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none;';
    temp.innerHTML = htmlContent;
    document.body.appendChild(temp);
    try {
      if (navigator.clipboard && navigator.clipboard.write) {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        await navigator.clipboard.write([new ClipboardItem({ 'text/html': blob })]);
      } else {
        const r = document.createRange(), s = window.getSelection();
        r.selectNode(temp); s?.removeAllRanges(); s?.addRange(r);
        document.execCommand('copy'); s?.removeAllRanges();
      }
      alert('¡Copiado al portapapeles!');
    } catch (e) {
      alert('Error al copiar. Usa el código fuente.');
    }
    document.body.removeChild(temp);
  };

  return (
    <div className="flex h-full w-full">
      {/* Controls Panel */}
      <div className="w-[450px] bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-10 shrink-0">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-white flex justify-between items-center">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Constructor</h2>
            <h1 className="text-lg font-semibold text-slate-800">Mail Studio</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSaveJson} className="p-2 rounded border border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors" title="Guardar Proyecto">
              <Save size={16} />
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded border border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors" title="Cargar Proyecto">
              <FolderOpen size={16} />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleLoadJson} />
          </div>
        </div>

        {/* Blocks List */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-100/50">
          {blocks.map((block, i) => (
            <BlockEditor 
              key={block.id} 
              block={block} 
              index={i} 
              totalBlocks={blocks.length}
              updateBlock={updateBlock}
              moveBlock={moveBlock}
              removeBlock={removeBlock}
            />
          ))}
        </div>

        {/* Add Blocks Toolbar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="grid grid-cols-4 gap-3 mb-4">
            <button onClick={() => addBlock('header_tri')} className="col-span-4 p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center gap-2 hover:border-blue-300 transition-colors">
              <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-600">
                <Box size={16} />
              </div>
              <span className="text-xs font-bold text-slate-600">Encabezado Oficial</span>
            </button>
            
            <button onClick={() => addBlock('text')} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-colors">
              <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-600"><Type size={16} /></div>
              <span className="text-[10px] font-medium text-slate-600">Texto</span>
            </button>
            <button onClick={() => addBlock('columns')} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-colors">
              <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-600"><Columns size={16} /></div>
              <span className="text-[10px] font-medium text-slate-600">Fila 50/50</span>
            </button>
            <button onClick={() => addBlock('image')} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-colors">
              <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-600"><ImageIcon size={16} /></div>
              <span className="text-[10px] font-medium text-slate-600">Imagen</span>
            </button>
            <button onClick={() => addBlock('box')} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-colors">
              <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-600"><Square size={16} /></div>
              <span className="text-[10px] font-medium text-slate-600">Caja</span>
            </button>
            <button onClick={() => addBlock('button')} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-colors">
              <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-600"><Link size={16} /></div>
              <span className="text-[10px] font-medium text-slate-600">Botón</span>
            </button>
            <button onClick={() => addBlock('separator')} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-colors">
              <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-600"><Minus size={16} /></div>
              <span className="text-[10px] font-medium text-slate-600">Línea</span>
            </button>
            <button onClick={() => addBlock('html')} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-colors">
              <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-600"><Code size={16} /></div>
              <span className="text-[10px] font-medium text-slate-600">HTML</span>
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={copyToClipboard} className="flex-1 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold shadow-sm transition-colors hover:bg-slate-50 flex items-center justify-center gap-2">
              <Copy size={16} /> Previsualizar
            </button>
            <button onClick={copyToClipboard} className="flex-1 py-3 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-700 flex items-center justify-center gap-2" title="Compatible con Gmail">
              <Mail size={16} /> Exportar HTML
            </button>
          </div>
        </div>

      </div>

      {/* Preview Area */}
      <Preview blocks={blocks} settings={settings} />
    </div>
  );
}
