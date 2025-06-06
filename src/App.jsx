import React, { useState } from "react";
import ChallengeBuilder from "./components/challenge/ChallengeBuilder";
import MonsterBuilder from "./components/monster/MonsterBuilder";

function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", borderBottom: "2px solid #c9c4b4" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "#ede9dd" : "transparent",
              border: "none",
              borderBottom: activeTab === tab ? "3px solid #3d2e2a" : "none",
              fontWeight: activeTab === tab ? 700 : 400,
              fontSize: "1.1em",
              padding: "0.5em 1.5em",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("Challenge");

  return (
    <div>
      <h1>Grimwild Tools</h1>
      <Tabs
        tabs={["Challenge", "Monsters"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "Challenge" && <ChallengeBuilder />}
      {activeTab === "Monsters" && <MonsterBuilder />}
    </div>
  );
}

export default App;
