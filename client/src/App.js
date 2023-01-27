import './App.scss';
import MainMap from './MainMap';
import React from 'react';

export default function WeatherApp() {
  return (
    <div className="mainDiv">
      <h1>Choose Location</h1>
      <MainMap className="mainMap"/>
    </div>
  )
}


