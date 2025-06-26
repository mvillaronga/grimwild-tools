import React, { useState } from "react";
import ChallengeBuilder from "./components/challenge/ChallengeBuilder";
import MonsterBuilder from "./components/monster/MonsterBuilder";
import CombatKitBuilder from "./components/combatkit/CombatKitBuilder";
import FactionPoolBuilder from "./components/factionpool/FactionPoolBuilder";
import FictionPillarBuilder from "./components/fictionpillar/FictionPillarBuilder";
import styles from "./App.module.css";

function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
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
    <div className={styles.app}>
      <h1 className={styles.title}>Grimwild Tools</h1>
      <Tabs
        tabs={["Challenge", "Monsters", "Combat Kit", "Faction Pools", "Fiction Pillars"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className={styles.tabContent}>
        {activeTab === "Challenge" && <ChallengeBuilder />}
        {activeTab === "Monsters" && <MonsterBuilder />}
        {activeTab === "Combat Kit" && <CombatKitBuilder />}
        {activeTab === "Faction Pools" && <FactionPoolBuilder />}
        {activeTab === "Fiction Pillars" && <FictionPillarBuilder />}
      </div>
    </div>
  );
}

export default App;
