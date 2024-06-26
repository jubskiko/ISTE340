import React, { useState, useEffect } from 'react';
import getData from '../utils/getData';

// This component displays the undergraduate degree information
const UndergradDegree = () => {
  const [degreesData, setDegreesData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData('degrees/')
      .then((json) => {
        console.log(json.undergraduate);
        setDegreesData(json.undergraduate);
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='undergrad-degree'>
      {degreesData.map((degree, index) => (
        <div key={index}>
          <h2>{degree.title}</h2>
          <p>{degree.description}</p>
          <h3>Concentrations:</h3>
          <ul>
            {degree.concentrations.map((concentration, index) => (
              <li key={index}>{concentration}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UndergradDegree;
