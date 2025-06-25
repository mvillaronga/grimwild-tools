import React from "react";
import MonsterDisplay from "./MonsterDisplay";
import MonsterForm from "./MonsterForm";
import ImageActionsWrapper from "../common/ImageActionsWrapper";
import { useMonsterState } from "../../hooks/useMonsterState";
import { useCustomColors } from "../../hooks/useCustomColors";
import styles from "./MonsterBuilder.module.css";

export default function MonsterBuilder() {
  const customColorsState = useCustomColors();
  const monsterState = useMonsterState(customColorsState.customColors);

  const sanitize = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "")
      .replace(/_+/g, "_");
  
  const filename = `${sanitize(monsterState.name) || "grimwild-monster"}.png`;

  return (
    <div className={styles.container}>
      <div className={styles.builderLayout}>
        <MonsterForm {...monsterState} customColorsState={customColorsState} />
        <div className={styles.displayContainer}>
          <h2 className={styles.title}>Monster Builder</h2>
          <ImageActionsWrapper filename={filename}>
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
              sight={monsterState.sight}
              sound={monsterState.sound}
              smell={monsterState.smell}
              flavorTitle={monsterState.flavorTitle}
              flavorItems={monsterState.flavorItems}
              flavorColumns={monsterState.flavorColumns}
              flavorColumn1={monsterState.flavorColumn1}
              flavorColumn2={monsterState.flavorColumn2}
              flavorColumn3={monsterState.flavorColumn3}
            />
          </ImageActionsWrapper>
        </div>
      </div>
    </div>
  );
}
