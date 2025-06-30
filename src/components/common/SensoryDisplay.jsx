import React from 'react';
import './SensoryDisplay.css';

function SensoryDisplay({ sight, sound, smell }) {
  const senses = [
    { type: 'sight', value: sight, icon: '/grimwild-tools/images/sensories/sight.png', alt: 'Sight' },
    { type: 'sound', value: sound, icon: '/grimwild-tools/images/sensories/sound.png', alt: 'Sound' },
    { type: 'smell', value: smell, icon: '/grimwild-tools/images/sensories/smell.png', alt: 'Smell' }
  ];

  return (
    <div className="sensory-display">
      {senses.map((sense) => (
        <div key={sense.type} className="sense-item">
          <img
            className="sense-icon"
            src={sense.icon}
            alt={sense.alt}
          />
          <span className="sense-text">{sense.value || `[${sense.alt} description needed]`}</span>
        </div>
      ))}
    </div>
  );
}

export default SensoryDisplay;
