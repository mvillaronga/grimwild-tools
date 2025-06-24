import React from "react";
import MonsterDisplay from "./MonsterDisplay";
import MonsterForm from "./MonsterForm";
import ImageActionsWrapper from "../common/ImageActionsWrapper";
import { useMonsterState } from "../../hooks/useMonsterState";
import styles from "./MonsterBuilder.module.css";

export default function MonsterBuilder() {
  const monsterState = useMonsterState();

  return (
    <div className={styles.container}>
      <div className={styles.builderLayout}>
        <MonsterForm {...monsterState} />
        <div className={styles.displayContainer}>
          <h2 className={styles.title}>Monster Builder</h2>
          <ImageActionsWrapper filename={`${monsterState.name}.png`}>
            <MonsterDisplay
              name={monsterState.name}
              type={monsterState.type}
              colors={monsterState.colors}
              colorHexes={monsterState.colorHexes}
              description={monsterState.description}
              traits={monsterState.traits}
              moves={monsterState.moves}
              wants={monsterState.wants}
              dislikes={monsterState.dislikes}
              flavorTitle={monsterState.flavorTitle}
              flavorItems={monsterState.flavorItems}
            />
          </ImageActionsWrapper>
        </div>
      </div>
    </div>
  );
}
