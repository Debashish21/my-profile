import React from 'react';
import AlterEgoHero from './AlterEgoHero';
import AlterEgoSection from './AlterEgoSection';
import AlterEgoNav from './AlterEgoNav';
import AudioController from './AudioController';
import { alterEgoData } from '../../alterEgoData';

const AlterEgoApp = ({ onExit }) => {
  return (
    <div className="AlterEgo relative min-h-screen">
      {/* CyberBackground is managed globally in App.js */}
      <AlterEgoNav onExit={onExit} />
      <AudioController />
      <AlterEgoHero data={alterEgoData} />
      
      {/* All Sections */}
      {Object.entries(alterEgoData.sections).map(([key, section]) => (
        <AlterEgoSection 
          key={key} 
          section={section} 
          sectionKey={key}
        />
      ))}

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-cyan-400/30 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 font-mono text-sm">
            <span className="text-cyan-400">{'> '}</span>
            SYSTEM_STATUS: <span className="text-green-400">OPERATIONAL</span>
          </p>
          <p className="text-gray-600 font-mono text-xs mt-2">
            © 2025 {alterEgoData.personal.name} | ALL_RIGHTS_RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AlterEgoApp;
