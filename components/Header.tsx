import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, User, FileCode } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenTelegramSettings: () => void;
  username: string;
  onLogout: () => void;
}

const UserProfileDropdown: React.FC<{ username: string; onLogout: () => void }> = ({ username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 hidden sm:inline">{username}</span>
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <User size={18} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 overflow-hidden animate-fade-in-down">
          <div className="px-4 py-3 border-b dark:border-gray-600">
             <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{username}</p>
             <p className="text-xs text-gray-500 dark:text-gray-400">Authenticated</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.2s ease-out; }
      `}</style>
    </div>
  );
};


const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, isDarkMode, toggleDarkMode, onOpenTelegramSettings, username, onLogout }) => {
  const navItems = [
    { id: 'cleaner', label: 'Email Cleaner' },
    { id: 'extractor', label: 'Gmail Extractor' },
    { id: 'textExtractor', label: 'Text Extractor' },
    { id: 'collector', label: 'Data Collector' },
    { id: 'fileSeparator', label: 'File Separator' },
    { id: 'diff', label: 'Text Compare' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight cursor-pointer" onClick={() => onNavigate('fileSeparator')}>
           EMS3 Tools
          </h1>
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                  currentPage === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenTelegramSettings}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open Telegram Settings"
          >
            <Bell size={20} />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-600"></div>
          <UserProfileDropdown username={username} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;