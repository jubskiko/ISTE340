import React from 'react';

const Certificate = ({ certificates }) => {
  return (
    <div>
      <h2>Graduate Advanced Certificates</h2>
      <ul>
        {certificates.map((certificate, index) => (
          <li key={index}>{certificate}</li>
        ))}
      </ul>
    </div>
  );
};

export default Certificate;
