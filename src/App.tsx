/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Builder from './components/Builder/Builder';
import SettingsView from './components/Settings/Settings';
import LibraryView from './components/Library/Library';
import ProjectsView from './components/Projects/Projects';
import TemplatesView from './components/Templates/Templates';
import { useLocalStorage, defaultBlocks, defaultSettings } from './store';
import { Block, InstitutionSettings } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('builder');
  const [blocks, setBlocks] = useLocalStorage<Block[]>('itd_email_v23_blocks', defaultBlocks);
  const [settings, setSettings] = useLocalStorage<InstitutionSettings>('itd_email_v23_settings', defaultSettings);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 overflow-hidden">
        {currentView === 'builder' && (
          <Builder 
            blocks={blocks} 
            setBlocks={setBlocks} 
            settings={settings} 
          />
        )}
        {currentView === 'settings' && (
          <SettingsView 
            settings={settings} 
            setSettings={setSettings} 
          />
        )}
        {currentView === 'library' && (
          <LibraryView />
        )}
        {currentView === 'templates' && (
          <TemplatesView />
        )}
        {currentView === 'projects' && (
          <ProjectsView />
        )}
      </main>
    </div>
  );
}

