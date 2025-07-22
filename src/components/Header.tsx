import React from 'react';
import { MapPinIcon } from "@phosphor-icons/react";
import logo from '../assets/logo.svg';

export const Header: React.FC = () => {
  return (

    <div id='navbar' className="flex items-center justify-between mb-4 px-6 py-1.5 lg:py-2.5 w-screen lg:px-10 bg-header">
      <div className="flex items-center gap-2">
        <img src={logo} alt="App Logo" height={37} />
      </div>

      <button className="space-y-0.5 self-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">

        <p className="text-primary-800 font-bold tracking-tight text-sm text-right lg:text-left">Select location</p>
        <div className="flex items-center gap-0.5 text-primary-500 font-bold">
          <MapPinIcon size={14} weight="fill" />
          <p className="font-medium text-xs">Get accurate namaz time</p>
        </div>
      </button>
    </div>



  );
};