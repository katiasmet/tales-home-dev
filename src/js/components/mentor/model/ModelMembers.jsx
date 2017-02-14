import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty, filter} from 'lodash';

import {ModelMemberInfo} from './';
import {CharacterGigiMother, CharacterKikiChild, CharacterChrisFather} from '../../illustrations';

const ModelMembers = inject(`families`)(observer(({families}) => {

  const {activeFamily, handleActiveFamilyMember, showInfo} = families;
  const {familymembers} = activeFamily;

  return (
    <section className='model-members-overview'>

      <ul className='model-members'>

        {
          familymembers.slice().map((familymember, i) => {
            return (<li className={(showInfo === familymember._id) ? `model-member ${familymember.character} active` : `model-member ${familymember.character}`}
                        key={i}
                        onClick={() => handleActiveFamilyMember(familymember._id)}>
                        {renderCharacter(familymember.character, familymember._id, handleActiveFamilyMember)}
                  </li>);
          })
        }

      </ul>

      {
        (!isEmpty(showInfo)) && renderMemberInfo(showInfo, familymembers)
      }

    </section>
  );
}));

const renderCharacter = (character, id, handleActiveFamilyMember) => {
  if (character === `kiki`) {
    return <CharacterKikiChild onClick={() => handleActiveFamilyMember(id)} />;
  } else if (character === `chris`) {
    return <CharacterChrisFather onClick={() => handleActiveFamilyMember(id)} />;
  } else {
    return <CharacterGigiMother onClick={() => handleActiveFamilyMember(id)} />;
  }
};

const renderMemberInfo = (id, members) => {

  const activeMember = filter(members, member => {
    return member._id === id;
  })[0];

  return <ModelMemberInfo languages={activeMember.languages} firstname={activeMember.firstName} />;
};

ModelMembers.propTypes = {
  families: PropTypes.shape({
    activeFamily: PropTypes.object,
    activeFamilyMember: PropTypes.string,
    showInfo: PropTypes.string
  })
};

export default ModelMembers;
