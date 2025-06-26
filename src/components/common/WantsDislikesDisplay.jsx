import React from 'react';
import './WantsDislikesDisplay.css';

function WantsDislikesDisplay({ wants, doesntWant }) {
  // Clean the input text to remove any prefixes
  const cleanedWants = wants ? wants.replace(/^\s*Wants\s*/i, "").trim() : "";
  const cleanedDoesntWant = doesntWant ? doesntWant.replace(/^\s*Doesn't want\s*/i, "").trim() : "";

  if (!cleanedWants && !cleanedDoesntWant) {
    return null;
  }

  return (
    <div className="wants-dislikes-display">
      {cleanedWants && (
        <p>
          <em className="bold">
            <strong>Wants</strong>
          </em>{" "}
          <em>{cleanedWants}</em>
        </p>
      )}
      {cleanedDoesntWant && (
        <p>
          <em className="bold">
            <strong>Doesn't want</strong>
          </em>{" "}
          <em>{cleanedDoesntWant}</em>
        </p>
      )}
    </div>
  );
}

export default WantsDislikesDisplay;
