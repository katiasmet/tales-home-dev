import React, {PropTypes} from 'react';

const ModelGridItem = ({image, name, passed, i}) => {

  return (
    <article className='models-overview-grid-item'>

      <figure>

      </figure>

      <footer>
        <p>Model {i + 1}: {name}</p>
        {
          (passed) && (<i className='fa fa-check'></i>)
        }
      </footer>
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
