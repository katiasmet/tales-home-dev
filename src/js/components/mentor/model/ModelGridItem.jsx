import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {kebabCase} from 'lodash';

const ModelGridItem = ({_id, image, name, passed, i, handleStartModel, handleIsPassed}) => {

  const pathname = kebabCase(name);
  console.log(image);

  return (
    <article className='models-overview-grid-item' onClick={() => handleStartModel(_id)}>
      <Link to={`/models/${pathname}`}>
        <figure>

        </figure>

        <footer>
          <p>Model {i + 1}: {name}</p>
          {
            (handleIsPassed(_id)) && (<i className='fa fa-check'></i>)
          }
        </footer>
      </Link>
    </article>
  );
};

ModelGridItem.propTypes = {
  _id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  passed: PropTypes.bool,
  i: PropTypes.number,
  handleStartModel: PropTypes.func,
  handleIsPassed: PropTypes.func
};


export default ModelGridItem;
