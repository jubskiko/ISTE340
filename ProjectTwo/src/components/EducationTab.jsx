import React from 'react';
import { Tab } from 'semantic-ui-react';
import UndergradDegree from './UndergradDegree';
import GraduateDegree from './GraduateDegree';
import Minor from './Minor';
import Certificate from './Certificate';

const EducationTabs = () => {
  const panes = [
    { menuItem: 'Undergraduate Degrees', render: () => <UndergradDegree /> },
    { menuItem: 'Graduate Degrees', render: () => <GraduateDegree /> },
    { menuItem: 'Minors', render: () => <Minor /> },
    { menuItem: 'Certificates', render: () => <Certificate /> },
  ];

  return (
    <Tab panes={panes} />
  );
};

export default EducationTabs;
