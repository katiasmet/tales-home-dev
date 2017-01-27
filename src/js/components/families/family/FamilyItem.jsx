import React, {PropTypes} from 'react';

const FamilyItem = ({name, origins, homeLocation}) => {
  return (
    <article>
      {name}
    </article>
  );
};

FamilyItem.propTypes = {
  name: PropTypes.string.isRequired,
  origins: PropTypes.string,
  homeLocation: PropTypes.string
};

export default FamilyItem;
