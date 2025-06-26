import React from 'react';
import './EmbodyDisplay.css';

function EmbodyDisplay({ embody }) {
  if (!embody) {
    return null;
  }

  return (
    <div className="embody-display">
      <div className="embody-item">
        <img
          className="embody-icon"
          src="./images/icons/hand.png"
          alt="Embody at the table"
        />
        <span className="embody-text">{embody}</span>
      </div>
    </div>
  );
}

export default EmbodyDisplay;
