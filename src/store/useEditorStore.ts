import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Block, BlockType, Asset, Project } from '../types';

export const defaultBlocks: Block[] = [
  {
    id: 'b1',
    type: 'header_tri',
    logo1: 'https://raw.githubusercontent.com/DA-itd/web/main/logo_itdurango.png',
    logo2: 'https://raw.githubusercontent.com/DA-itd/A/main/tecnm1.jpg',
    line1: 'Instituto Tecnológico de Durango',
    line2: 'Departamento de Desarrollo Académico',
    logoWidth: 60,
  },
  {
    id: 'b2',
    type: 'text',
    content: 'Inicia tu correo aquí.',
    align: 'left',
  },
];

interface EditorState {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  addBlock: (block: Block) => void;
  updateBlock: (index: number, updates: Partial<Block>) => void;
  moveBlock: (index: number, direction: -1 | 1) => void;
  removeBlock: (index: number) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      blocks: defaultBlocks,
      setBlocks: (blocks) => set({ blocks }),
      addBlock: (block) => set((state) => ({ blocks: [...state.blocks, block] })),
      updateBlock: (index, updates) => set((state) => {
        const newBlocks = [...state.blocks];
        newBlocks[index] = { ...newBlocks[index], ...updates };
        return { blocks: newBlocks };
      }),
      moveBlock: (index, direction) => set((state) => {
        if ((direction === -1 && index > 0) || (direction === 1 && index < state.blocks.length - 1)) {
          const newBlocks = [...state.blocks];
          const temp = newBlocks[index];
          newBlocks[index] = newBlocks[index + direction];
          newBlocks[index + direction] = temp;
          return { blocks: newBlocks };
        }
        return state;
      }),
      removeBlock: (index) => set((state) => {
        const newBlocks = [...state.blocks];
        newBlocks.splice(index, 1);
        return { blocks: newBlocks };
      }),
    }),
    {
      name: 'itd_email_v23_blocks_store',
    }
  )
);

const defaultAssets: Asset[] = [
  { id: '1', name: 'Escudo ITD', type: 'logo', url: 'https://raw.githubusercontent.com/DA-itd/web/main/logo_itdurango.png' },
  { id: '2', name: 'Logo TecNM', type: 'logo', url: 'https://raw.githubusercontent.com/DA-itd/A/main/tecnm1.jpg' },
  { id: '3', name: 'Pola', type: 'logo', url: 'https://raw.githubusercontent.com/DA-itd/web/main/pola.png' },
  { id: '4', name: 'Fondo TecNM', type: 'background', url: 'https://raw.githubusercontent.com/DA-itd/web/main/TecNM.jpg' },
];

interface LibraryState {
  assets: Asset[];
  addAsset: (asset: Asset) => void;
  removeAsset: (id: string) => void;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      assets: defaultAssets,
      addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
      removeAsset: (id) => set((state) => ({ assets: state.assets.filter(a => a.id !== id) })),
    }),
    {
      name: 'itd_email_v23_assets_store'
    }
  )
);
