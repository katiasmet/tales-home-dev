import React from 'react';

import {Airplane, Cloud2, Cloud, Car, RoadSigns, Truck} from './';

const ModelDistanceBg = () => {

  return (
    <section className='model-distance-background'>
      <div className='street-signs'><RoadSigns /></div>
      <div className='sun'></div>
      <div className='airplane'><Airplane /></div>
      <div className='cloud cloud-left'><Cloud /></div>
      <div className='cloud cloud-right'><Cloud2 /></div>
      <div className='smoke smoke-truck'>
        <div className='smoke-cloud smoke-cloud-1'></div>
        <div className='smoke-cloud smoke-cloud-2'></div>
        <div className='smoke-cloud smoke-cloud-3'></div>
        <div className='smoke-cloud smoke-cloud-4'></div>
        <div className='smoke-cloud smoke-cloud-5'></div>
        <div className='smoke-cloud smoke-cloud-6'></div>
        <div className='smoke-cloud smoke-cloud-7'></div>
        <div className='smoke-cloud smoke-cloud-8'></div>
        <div className='smoke-cloud smoke-cloud-9'></div>
      </div>
      <div className='truck'><Truck /></div>
        <div className='smoke smoke-car'>
          <div className='smoke-cloud smoke-cloud-1'></div>
          <div className='smoke-cloud smoke-cloud-2'></div>
          <div className='smoke-cloud smoke-cloud-3'></div>
          <div className='smoke-cloud smoke-cloud-4'></div>
          <div className='smoke-cloud smoke-cloud-5'></div>
          <div className='smoke-cloud smoke-cloud-6'></div>
          <div className='smoke-cloud smoke-cloud-7'></div>
          <div className='smoke-cloud smoke-cloud-8'></div>
          <div className='smoke-cloud smoke-cloud-9'></div>
        </div>
      <div className='car'><Car /></div>
    </section>
  );
};

export default ModelDistanceBg;
