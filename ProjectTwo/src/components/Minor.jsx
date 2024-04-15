import React, { useState, useEffect } from 'react';
import getData from '../utils/getData';

const Minor = () => {
  const [minorsData, setMinorsData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData('minors/')
      .then((json) => {
        console.log(json);
        const minorsArray = json.UgMinors;
        setMinorsData(minorsArray);
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='minor'>
      {minorsData.map((minor, index) => (
        <div key={index}>
          <h2>{minor.name}</h2>
          <p>{minor.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Minor;
