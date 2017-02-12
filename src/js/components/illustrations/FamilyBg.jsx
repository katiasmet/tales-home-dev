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
      <div className='house'><House /></div>
    </section>
  );
};

export default FamilyBg;
