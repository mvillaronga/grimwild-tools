import React from 'react';
import GoalItem from './GoalItem';
import styles from './GoalsList.module.css';

function GoalsList({ goals, onUpdateGoals, onAddGoal, onUpdateGoal, onDeleteGoal, onMoveGoal }) {
  const handleAddGoal = () => {
    if (onAddGoal) {
      onAddGoal('4', '');
    }
  };

  const handleUpdateGoal = (updatedGoal) => {
    if (onUpdateGoal) {
      onUpdateGoal(updatedGoal);
    }
  };

  const handleDeleteGoal = (goalId) => {
    if (onDeleteGoal) {
      onDeleteGoal(goalId);
    }
  };

  const handleMoveGoal = (goalId, direction) => {
    if (onMoveGoal) {
      onMoveGoal(goalId, direction);
    }
  };

  return (
    <div className={styles.goalsList}>
      <div className={styles.header}>
        <label className={styles.label}>Goals</label>
      </div>

      <div className={styles.goalsContainer}>
        {goals.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No goals added yet</p>
            <p className={styles.emptyHint}>
              Use the button below to add goals with dice pools
            </p>
          </div>
        ) : (
          goals.map((goal, index) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onUpdate={handleUpdateGoal}
              onDelete={() => handleDeleteGoal(goal.id)}
              onMoveUp={() => handleMoveGoal(goal.id, 'up')}
              onMoveDown={() => handleMoveGoal(goal.id, 'down')}
              canMoveUp={index > 0}
              canMoveDown={index < goals.length - 1}
            />
          ))
        )}

        <div className={styles.addButtons}>
          <button
            type="button"
            onClick={handleAddGoal}
            className={styles.addButton}
            title="Add new goal with dice pool"
          >
            + Add Goal
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalsList;
