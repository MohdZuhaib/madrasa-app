import React from 'react';
import { Home, BookOpen, GraduationCap, Heart } from 'lucide-react';

export const Navigation: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: BookOpen, label: 'Quran', active: false },
    { icon: GraduationCap, label: 'Madrasa', active: false },
    { icon: Heart, label: 'Dua', active: false },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-3">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              item.active ? 'text-purple-600' : 'text-gray-500'
            }`}
          >
            <div className={`p-2 rounded-full ${item.active ? 'bg-purple-100' : ''}`}>
              <item.icon size={20} />
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};