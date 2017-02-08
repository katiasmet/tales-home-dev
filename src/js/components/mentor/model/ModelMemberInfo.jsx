import React, {PropTypes} from 'react';

const ModelMemberInfo = ({firstname, languages}) => {

  return (
    <section className='member-info'>

      <p>{firstname}</p>

      <ul className='languages'>
        {
          languages.map((language, key) => {
            return <li className='language' key={key}>{language}</li>;
          })
        }
      </ul>



    </section>
  );
};

ModelMemberInfo.propTypes = {
  firstname: PropTypes.string,
  languages: PropTypes.array
};

export default ModelMemberInfo;
