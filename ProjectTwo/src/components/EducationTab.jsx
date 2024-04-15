import React from 'react';
import { Tab } from 'semantic-ui-react';
import UndergradDegree from './UndergradDegree';
import GraduateDegree from './GraduateDegree';
import Minor from './Minor';
import Certificate from './Certificate';
import "./EducationTab.css"

// This component is a tab that contains the UndergradDegree, GraduateDegree, Minor, and Certificate components
const EducationTab = () => {
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

export default EducationTab;
