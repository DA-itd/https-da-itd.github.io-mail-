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

export default function App() {
  const [currentView, setCurrentView] = useState('builder');

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 overflow-hidden">
        {currentView === 'builder' && <Builder />}
        {currentView === 'settings' && <SettingsView />}
        {currentView === 'library' && <LibraryView />}
        {currentView === 'templates' && <TemplatesView />}
        {currentView === 'projects' && <ProjectsView />}
      </main>
    </div>
  );
}

