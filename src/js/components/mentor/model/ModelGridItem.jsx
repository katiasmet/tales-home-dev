import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {kebabCase} from 'lodash';

const ModelGridItem = ({image, name, passed, i}) => {

  const pathname = kebabCase(name);
  console.log(image);

  return (
    <article className='models-overview-grid-item'>
      <Link to={`/models/${pathname}`}>
        <figure>

        </figure>

        <footer>
          <p>Model {i + 1}: {name}</p>
          {
            (passed) && (<i className='fa fa-check'></i>)
          }
        </footer>
      </Link>
    </article>
  );
};

ModelGridItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  passed: PropTypes.bool,
  i: PropTypes.number
};


export default ModelGridItem;
