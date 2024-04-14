import React, { useState, useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import getData from '../utils/getData';
import EducationTab from './EducationTab';

const EducationTabs = () => {
  const [degreesData, setDegreesData] = useState([]);
  const [minorsData, setMinorsData] = useState([]);
  const [certificatesData, setCertificatesData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData('degrees/')
      .then((json) => {
        setDegreesData(json);
      })
      .catch((error) => console.error('Error fetching degree data:', error));

    getData('degrees/')
      .then((json) => {
        const certificatesData = json.find(
          (item) => item.degreeName === 'graduate advanced certificates'
        );
        setCertificatesData(certificatesData.availableCertificates);
      })
      .catch((error) => console.error('Error fetching certificate data:', error));

    // Fetch minor data
    getData('minors/')
      .then((json) => {
        setMinorsData(json);
        setLoaded(true);
      })
      .catch((error) => console.error('Error fetching minor data:', error));
  }, []);

  const panes = [
    { menuItem: 'Undergraduate Degrees', render: () => <EducationTab data={degreesData} type="degree" /> },
    { menuItem: 'Graduate Degrees', render: () => <EducationTab data={degreesData} type="degree" /> },
    { menuItem: 'Minors', render: () => <EducationTab data={minorsData} type="minor" /> },
    { menuItem: 'Certificates', render: () => <EducationTab data={certificatesData} type="certificate" /> },
  ];

  return (
    <Tab panes={panes} />
  );
};

export default EducationTabs;
