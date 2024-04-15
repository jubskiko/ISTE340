import React, { useState, useEffect } from 'react';
import getData from '../utils/getData';

const Certificate = () => {
  const [certificateData, setCertificateData] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData('degrees/')
      .then((json) => {
        //Gets only the certificate data from the JSON object
        const certificate = json.graduate.find(degree => degree.degreeName === 'graduate advanced certificates');
        console.log(certificate);
        setCertificateData(certificate);
        setLoaded(true);
      })
  }, []);

  if (!loaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='certificate'>
      <h2>{certificateData.title}</h2>
      <p>{certificateData.description}</p>
      <ul>
        {certificateData.availableCertificates.map((certificate, index) => (
          <li key={index}>{certificate}</li>
        ))}
      </ul>
    </div>
  );
};

export default Certificate;
