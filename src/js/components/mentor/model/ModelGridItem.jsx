import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {kebabCase} from 'lodash';

const ModelGridItem = ({_id, image, name, i, handleStartModel, handleIsPassed}) => {

  const pathname = kebabCase(name);

  return (
    <article className='models-overview-grid-item' onClick={() => handleStartModel(_id)}>
      <Link to={`/models/${pathname}`}>

        <figure>
          <img src={`assets/img/models/${image}.png`} alt={name} />
        </figure>

        <div className='model-info'>
          <p><span className='model-count'>Model {i + 1}:</span> {name}</p>
          {
            (handleIsPassed(_id)) && (<span className='btn'><i className='fa fa-check'></i></span>)
          }
        </div>
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
