import React from 'react';
import {Link} from 'react-router';

const Home = () => {
  return (
    <div className='page-home'>
      <header>

        <h1>Tales@Home</h1>

        <ul className='navigation'>
          <li><Link to='/login'>login</Link></li>
        </ul>

      </header>
    </div>

  );
};

export default Home;
