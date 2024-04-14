import React from 'react';

const GradDegree = ({ degree }) => {
  return (
    <div>
      <h2>{degree.title}</h2>
      <p>{degree.description}</p>
      <h3>Concentrations:</h3>
      <ul>
        {degree.concentrations.map((concentration, index) => (
          <li key={index}>{concentration}</li>
        ))}
      </ul>
    </div>
  );
};

export default GradDegree;
