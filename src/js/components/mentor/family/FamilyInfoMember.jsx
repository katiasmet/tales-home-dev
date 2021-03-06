import React, {PropTypes} from 'react';

const FamilyInfoMember = ({firstName, languages, role}) => {
  return (
    <li className='family-info-member'>
      <span className='member-name'>
        {firstName}
        <span className='role'>, {role}</span>
      </span>

      <ul className='languages'>

        {
          languages.map((language, key) => {
            return <li className='language' key={key}>{language}</li>;
          })
        }

      </ul>
    </li>
  );
};

FamilyInfoMember.propTypes = {
  firstName: PropTypes.string,
  role: PropTypes.string,
  languages: PropTypes.array
};

export default FamilyInfoMember;
