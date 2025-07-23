import { HouseSimpleIcon, BookOpenTextIcon, MosqueIcon, ListHeartIcon, CirclesThreePlusIcon } from '@phosphor-icons/react';
import React from 'react';

export const Navigation: React.FC = () => {
  const navItems = [
    { icon: HouseSimpleIcon, label: 'Home', active: true },
    { icon: BookOpenTextIcon, label: 'Quran', active: false },
    { icon: CirclesThreePlusIcon, label: 'App', active: false },
    { icon: MosqueIcon, label: 'Madrasa', active: false },
    { icon: ListHeartIcon, label: 'Dua', active: false },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-3">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${item.active ? 'text-purple-600' : 'text-gray-500'
              }`}
          >
            <div className={`p-2 rounded-full ${item.active ? 'bg-purple-100' : ''}`}>
              <item.icon size={22} />
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};