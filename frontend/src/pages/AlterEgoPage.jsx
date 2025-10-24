import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AlterEgo.css';
import AlterEgoApp from '../components/alterego/AlterEgoApp';

const AlterEgoPage = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Fade in on mount
  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handleExit = () => {
    setIsTransitioning(true);
    setShowContent(false);
    
    // Smooth fade and navigate back
    setTimeout(() => {
      navigate('/');
    }, 600);
  };

  return (
    <div className="relative">
      {/* Transition Overlay */}
      {isTransitioning && (
        <div 
          className="fixed inset-0 z-[100] bg-black animate-fadeIn"
          style={{ 
            animation: 'fadeIn 0.6s ease-in-out forwards'
          }}
        />
      )}

      {/* Alter Ego Content */}
      <div 
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <AlterEgoApp onExit={handleExit} />
      </div>
    </div>
  );
};

export default AlterEgoPage;
