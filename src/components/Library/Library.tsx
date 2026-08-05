import React, { useState } from 'react';
import { Asset } from '../../types';
import { useLibraryStore } from '../../store/useEditorStore';
import { Plus, Trash2, Image as ImageIcon, Copy } from 'lucide-react';

export default function Library() {
  const { assets, addAsset, removeAsset } = useLibraryStore();
  const [filter, setFilter] = useState<'all' | 'logo' | 'banner' | 'background' | 'photo'>('all');
  const [newAssetUrl, setNewAssetUrl] = useState('');
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetType, setNewAssetType] = useState<'logo' | 'banner' | 'background' | 'photo'>('logo');

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetUrl || !newAssetName) return;
    
    const newAsset: Asset = {
      id: Date.now().toString(),
      name: newAssetName,
      url: newAssetUrl,
      type: newAssetType,
    };
    
    addAsset(newAsset);
    setNewAssetUrl('');
    setNewAssetName('');
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copiada');
  };

  const filteredAssets = filter === 'all' ? assets : assets.filter(a => a.type === filter);

  return (
    <div className="flex-1 bg-slate-50 h-full overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Biblioteca de Recursos</h2>
            <p className="text-sm text-slate-500">Administra imágenes, logos y banners para tus correos.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 mb-8">
          <h3 className="font-bold text-slate-700 mb-4">Añadir Nuevo Recurso</h3>
          <form onSubmit={handleAddAsset} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-slate-500 mb-1">Nombre</label>
              <input type="text" required value={newAssetName} onChange={e => setNewAssetName(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej. Banner Convocatoria" />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-slate-500 mb-1">URL de la Imagen</label>
              <input type="url" required value={newAssetUrl} onChange={e => setNewAssetUrl(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://..." />
            </div>
            <div className="w-full md:w-48">
              <label className="block text-xs font-bold text-slate-500 mb-1">Categoría</label>
              <select value={newAssetType} onChange={e => setNewAssetType(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="logo">Logos</option>
                <option value="banner">Banners</option>
                <option value="background">Fondos</option>
                <option value="photo">Fotografías</option>
              </select>
            </div>
            <button type="submit" className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded font-medium flex items-center justify-center gap-2 hover:bg-blue-700">
              <Plus size={18} /> Añadir
            </button>
          </form>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'all' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Todos</button>
          <button onClick={() => setFilter('logo')} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'logo' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Logos</button>
          <button onClick={() => setFilter('banner')} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'banner' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Banners</button>
          <button onClick={() => setFilter('background')} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'background' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Fondos</button>
          <button onClick={() => setFilter('photo')} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'photo' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Fotografías</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredAssets.map(asset => (
            <div key={asset.id} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col group">
              <div className="h-32 bg-slate-100 p-4 flex items-center justify-center relative">
                <img src={asset.url} alt={asset.name} className="max-h-full max-w-full object-contain" />
                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(asset.url)} className="p-2 bg-white rounded-full text-slate-800 hover:bg-blue-50" title="Copiar URL">
                    <Copy size={16} />
                  </button>
                  <button onClick={() => removeAsset(asset.id)} className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50" title="Eliminar">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-3 border-t border-slate-100">
                <h4 className="font-bold text-sm text-slate-800 truncate">{asset.name}</h4>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <ImageIcon size={12} /> <span className="capitalize">{asset.type}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredAssets.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              No hay recursos en esta categoría.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
