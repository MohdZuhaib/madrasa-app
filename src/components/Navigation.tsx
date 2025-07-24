import React from 'react';
import { activeLinkChecker, navItems } from '../helpers';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="bottom-0 left-0 right-0 bg-white shadow-custom-top">
      <div className="flex justify-around py-3">
        {navItems.map((item, index) => (
          <Link
            to={item.route}
            key={index}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeLinkChecker(pathname, item.route) ? 'text-primary-500' : 'text-gray-500'
              }`}
          >
            {item.label === 'Menu' ? <div className='bg-gradient-button p-2 rounded-full'>
              <item.icon size={22} color='#fff' weight="fill" />
            </div> : <>
              <div>
                <item.icon size={22} />
              </div>
              <span className={`text-xs ${activeLinkChecker(pathname, item.route) && 'font-bold'}`}>{item.label}</span>
            </>}

          </Link>
        ))}
      </div>
    </div>
  );
};