import React from 'react';
import MonsterItem from './MonsterItem';
import { createMonster, reorderMonsters } from '../../utils/monsterUtils';
import styles from './MonstersList.module.css';

function MonstersList({ monsters, onUpdateMonsters }) {
  const handleAddMonster = () => {
    const newMonster = createMonster('4', '', 'Mook', 'Brute');
    onUpdateMonsters([...monsters, newMonster]);
  };

  const handleUpdateMonster = (updatedMonster) => {
    const updatedMonsters = monsters.map(monster =>
      monster.id === updatedMonster.id ? updatedMonster : monster
    );
    onUpdateMonsters(updatedMonsters);
  };

  const handleDeleteMonster = (monsterId) => {
    const updatedMonsters = monsters.filter(monster => monster.id !== monsterId);
    onUpdateMonsters(updatedMonsters);
  };

  const handleMoveMonster = (monsterId, direction) => {
    const currentIndex = monsters.findIndex(monster => monster.id === monsterId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= monsters.length) return;

    const reorderedMonsters = reorderMonsters(monsters, currentIndex, newIndex);
    onUpdateMonsters(reorderedMonsters);
  };

  return (
    <div className={styles.monstersList}>
      <div className={styles.header}>
        <span className={styles.label}>Monsters</span>
      </div>

      <div className={styles.monstersContainer}>
        {monsters.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No monsters added yet</p>
            <p className={styles.emptyHint}>
              Use the button below to add monsters
            </p>
          </div>
        ) : (
          monsters.map((monster, index) => (
            <MonsterItem
              key={monster.id}
              monster={monster}
              onUpdate={handleUpdateMonster}
              onDelete={() => handleDeleteMonster(monster.id)}
              onMoveUp={() => handleMoveMonster(monster.id, 'up')}
              onMoveDown={() => handleMoveMonster(monster.id, 'down')}
              canMoveUp={index > 0}
              canMoveDown={index < monsters.length - 1}
            />
          ))
        )}
        
        <div className={styles.addButtons}>
          <button
            type="button"
            onClick={handleAddMonster}
            className={styles.addButton}
            title="Add Monster"
          >
            ⚔️ Add Monster
          </button>
        </div>
      </div>
    </div>
  );
}

export default MonstersList;
