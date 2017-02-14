import React from 'react';

import {Bench, Cloud2, Cloud, House, Tree} from './';

const FamilyBg = () => {

  return (
    <section className='family-background'>
      <div className='sun'></div>
      <div className='cloud cloud-left'><Cloud /></div>
      <div className='cloud cloud-right'><Cloud2 /></div>
      <div className='tree'><Tree /></div>
      <div className='bench'><Bench /></div>
      <div className='smoke'>
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
      <div className='house'><House /></div>
    </section>
  );
};

export default FamilyBg;
