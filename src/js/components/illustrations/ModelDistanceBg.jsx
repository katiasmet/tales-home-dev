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
      <div className='truck'><Truck /></div>
      <div className='car'><Car /></div>
    </section>
  );
};

export default ModelDistanceBg;
