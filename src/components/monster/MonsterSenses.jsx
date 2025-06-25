import React from "react";
import "./MonsterSenses.css";

export default function MonsterSenses({ sight, sound, smell }) {
  const senses = [
    { type: 'sight', value: sight, icon: './images/sensories/sight.png', alt: 'Sight' },
    { type: 'sound', value: sound, icon: './images/sensories/sound.png', alt: 'Sound' },
    { type: 'smell', value: smell, icon: './images/sensories/smell.png', alt: 'Smell' }
  ];

  return (
    <div className="monster-senses">
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
