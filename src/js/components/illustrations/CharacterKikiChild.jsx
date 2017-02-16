import React from 'react';
import * as Snap from 'snapsvg-cjs';

const animatePath = path => {
  console.log(`animate path`);
  path.animate({d: `M130.1,74.8c66.4-27.2,26.4,0,114.4,0c28,0,36.8,2.9,68,0c33-3,44.5-9.7,62.5,0c6.5,3.5,16.1,0,59,0c47,0,39.5,4.5,75.5,0c38.8-4.9,58,0,91,0c24.4,0,39.5,0,104.1,0`}, 1000, Snap.mina.bounce, () => resetPath(path));

};

const resetPath = path => {
  path.animate({d: `M130.1,85.9c58.2-128.4,86.7,71.4,159.7,22.1c22.3-15,23.8-45,52.6-57.3c38.5-16.4,77.3,23.1,76,60.7c-1.4,39.8-78.2,19.9-54.4-15.9c25.6-38.5,83.3-13.2,119.2-17.7C522,73,556.4,12.7,604,48.3c19.5,14.6,68.6,108.1,100.7,23.5`}, 1000, Snap.mina.backout, () => animatePath(path));
};

const CharacterKikiChild = () => {

  /*const s = Snap(this.svg);
  console.log(s);

  const path = Snap.select(`#left-leg`);
  console.log(path);*/
  /*animatePath(path); // start loop*/

  /*<animate
      begin='0s'
     attributeName='d'
     from='M21.4 147.6c-3.3 0-6.1-2.7-6.1-6.1v-22.3c0-1.5-.1-3-.4-4.4l-1.5-8c-.4-2.2-.5-4.3-.4-6.5l2.2-32.7V32.4h12.1v34.1l-2.2 33.3c-.1 2.2 0 4.4.4 6.6L27 114c.3 1.5.4 3 .4 4.5v22.9c.1 3.4-2.7 6.2-6 6.2z'
     to='M20.2 147.6c-3.3 0-6.1-2.7-6.1-6.1l-.4-7.9c-.2-5.6-.3-9.6.2-16 .4-4.8.8-9.4 1-13.7.2-4.7-.5-13.9-.5-16.7 0-2.8.7-19.7.7-19.7V32.4h12.1v34.1l-.7 20.3c0 2.2-.5 13.3-.5 15.4 0 2.2-.9 11.5-1 14-.1 2.8-.4 5.5-.1 11.8l1.3 13.3c.1 3.5-2.7 6.3-6 6.3z'

     dur='2s'
     repeatCount='indefinite' />*/

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 82 157.3'
      className='kiki-child-illustration'
      ref={input => { this.svg = input; }}
    >
      <path id='#left-leg' className='st0' d='M21.4 147.6c-3.3 0-6.1-2.7-6.1-6.1v-22.3c0-1.5-.1-3-.4-4.4l-1.5-8c-.4-2.2-.5-4.3-.4-6.5l2.2-32.7V32.4h12.1v34.1l-2.2 33.3c-.1 2.2 0 4.4.4 6.6L27 114c.3 1.5.4 3 .4 4.5v22.9c.1 3.4-2.7 6.2-6 6.2z' />
      <path className='st1' d='M15.3 67.5L14.6 78l11.8 4.1.6-7.9-11.7-8.4v1.7z' />
      <path className='st2' d='M21.4 147.6c-3.3 0-6.1-2.7-6.1-6.1v-22.3c0-1.5-.1-3-.4-4.4l-1.5-8c-.4-2.2-.5-4.3-.4-6.5l2.2-32.7V32.4h12.1v34.1l-2.2 33.3c-.1 2.2 0 4.4.4 6.6L27 114c.3 1.5.4 3 .4 4.5v22.9c.1 3.4-2.7 6.2-6 6.2z' />
      <path className='st3' d='M39.8 157.3c-3.3 0-6.1-2.7-6.1-6.1v-24.6l-1.1-10.3c-.2-1.9-.2-3.9.1-5.8L34.8 95c.1-1 .2-1.9.1-2.9l-1.2-15v-35h12.1v34.1l.8 10.6c.3 3.4.2 6.8-.2 10.2-.7 5.7-1.6 14-1.6 14-.3 2-.3 4 0 6l1 9v25.2c.1 3.4-2.6 6.1-6 6.1z' />
      <path className='st0' d='M57.3 137.3c-3.3 0-6.1-2.7-6.1-6.1l1.7-21.3c0-.6.1-1.1.1-1.7V107l-1.7-14c-.2-1.5-.3-3.1-.3-4.6l.2-31.2V22.1h12.1v34.1l-.2 32.3c0 1.6.1 3.1.3 4.7l1.6 13.2v2.2c0 .6 0 1.1-.1 1.7l-1.7 20.8c.2 3.5-2.5 6.2-5.9 6.2z' />

      <g className='head'>
        <circle className='st4' cx='40.4' cy='40.4' r='40.4' />
        <path className='st5' d='M49.7 72.7c-22.3 0-40.4-18.1-40.4-40.4C9.3 22.2 13 13.1 19.1 6 7.6 13.2 0 25.9 0 40.4c0 22.3 18.1 40.4 40.4 40.4 12.2 0 23.2-5.5 30.6-14.1-6.2 3.8-13.5 6-21.3 6z' />
        <circle className='st6' cx='40.8' cy='35.3' r='12.4' />
        <path className='st6' d='M45.1 60.6c2.8 0 4.5 3.2 2.9 5.5-1.8 2.6-4.8 4.4-8.2 4.4s-6.4-1.7-8.2-4.4c-1.6-2.3.1-5.5 2.9-5.5h10.6z' />
        <path className='st8' d='M40.2 47.7c-5.7 0-10.4-4.7-10.4-10.4s4.7-10.4 10.4-10.4 10.4 4.7 10.4 10.4S46 47.7 40.2 47.7zm0-16.2c-3.2 0-5.7 2.6-5.7 5.7s2.6 5.7 5.7 5.7 5.7-2.6 5.7-5.7-2.5-5.7-5.7-5.7z' />
        <path className='st9' d='M39.8 71c-3.5 0-6.7-1.7-8.6-4.6-.8-1.2-.9-2.8-.2-4.1.7-1.3 2-2.1 3.5-2.1h10.6c1.5 0 2.8.8 3.5 2.1s.6 2.9-.2 4.1c-1.9 2.8-5.1 4.6-8.6 4.6zm-5.2-9.9c-1.2 0-2.2.6-2.7 1.6s-.5 2.2.2 3.2c1.8 2.6 4.7 4.2 7.8 4.2s6.1-1.6 7.8-4.2c.6-1 .7-2.1.2-3.2-.5-1-1.6-1.6-2.7-1.6H34.6z' />
        <path className='st10' d='M46 67.8c-1.5-.6-3.6-.9-5.9-.9-2.4 0-4.6.4-6.2 1 .2.2.5.4.8.6 1.3.8 2.7 1.5 5.1 1.6 1.8 0 3.5-.6 5-1.5.5-.2.9-.5 1.2-.8z' />
        <ellipse transform='rotate(-50.913 24.288 10.163)' className='st11' cx='24.3' cy='10.2' rx='.9' ry='1.4' />
        <ellipse transform='rotate(-50.913 46.217 2.413)' className='st11' cx='46.2' cy='2.4' rx='.7' ry='.8' />
        <ellipse transform='rotate(-50.913 72.082 63.212)' className='st12' cx='72.1' cy='63.2' rx='.7' ry='.8' />
        <ellipse transform='rotate(-50.913 27.567 6.39)' className='st12' cx='27.6' cy='6.4' rx='.7' ry='.8' />
        <ellipse transform='rotate(-50.913 40.33 4.577)' className='st11' cx='40.3' cy='4.6' rx='.7' ry='.8' />
        <ellipse transform='rotate(-50.913 33.065 4.504)' className='st11' cx='33.1' cy='4.5' rx='.7' ry='.8' />
        <ellipse transform='rotate(-50.913 45.017 1.7)' className='st12' cx='45' cy='1.7' rx='.7' ry='.8' />
        <ellipse transform='rotate(-50.913 24.976 10.783)' className='st12' cx='25' cy='10.8' rx='1' ry='.9' />
        <ellipse transform='rotate(-50.913 23.023 52.593)' className='st12' cx='23' cy='52.6' rx='.8' ry='.7' />
        <ellipse transform='rotate(-50.913 37.185 1.963)' className='st11' cx='37.2' cy='2' rx='1.5' ry='1' />
        <ellipse transform='rotate(-50.913 36.3 2.532)' className='st11' cx='36.3' cy='2.5' rx='.8' ry='.7' />
        <path className='st12' d='M27.7 3.5c.4.3 1.1.2 1.6-.4.4-.5.5-1.2.2-1.5l-1.8.6c-.4.4-.4 1 0 1.3z' />
        <ellipse transform='rotate(-50.913 39.5 5.54)' className='st12' cx='39.5' cy='5.5' rx='1.1' ry='1' />
        <ellipse transform='rotate(-50.913 71.443 58.597)' className='st12' cx='71.4' cy='58.6' rx='1.1' ry='1' />
        <g className='pupil'>
          <circle className='st7' cx='40.2' cy='37.3' r='8.1' />
          <circle className='st8' cx='39.6' cy='32.9' r='2.3' />
        </g>
        <path className='eyelid eyelid-top' d='M28.1 35.3c0-7 5.7-12.7 12.7-12.7s12.7 5.7 12.7 12.7H28.1z' />
        <path className='eyelid eyelid-bottom' d='M53.5 35.3c0 7-5.7 12.7-12.7 12.7s-12.7-5.7-12.7-12.7h25.4z' />
      </g>

    </svg>
  );
};

export default CharacterKikiChild;
