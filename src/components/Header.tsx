import React from 'react';
import { MapPinIcon } from "@phosphor-icons/react";
import logo from '../assets/logo.svg';
import useLocationStore from '../store/locationStore';

export const Header: React.FC = () => {

  const { city, country } = useLocationStore();
  return (

    <div id='navbar' className="flex items-center justify-between mb-4 px-4 py-4 lg:py-6 w-screen lg:px-10 bg-header">

      <img src={logo} alt="App Logo" height={37} />


      <button className="space-y-0.5 self-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">

        <p className="text-primary-800 font-bold tracking-tight text-sm text-right lg:text-left">{city ? 'Your' : 'Select'} location</p>
        <div className="flex items-center gap-0.5 text-primary-500 font-bold">
          <MapPinIcon size={14} weight="fill" />
          <p className="font-medium text-xs">{city ? `${city}, ${country}` : 'Get accurate namaz time'}</p>
        </div>
      </button>
    </div>



  );
};