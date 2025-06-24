import React from "react";
import ChallengeCard from "./ChallengeCard";
import ChallengeForm from "./ChallengeForm";
import ImageActionsWrapper from "../common/ImageActionsWrapper";
import { useChallengeState } from "../../hooks/useChallengeState";
import styles from "./ChallengeBuilder.module.css";

export default function ChallengeBuilder() {
  const challengeState = useChallengeState();

  const sanitize = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "")
      .replace(/_+/g, "_");
  const filename = `${sanitize(challengeState.title) || "grimwild-challenge"}.png`;

  return (
    <div className={styles.container}>
      <div className={styles.builderLayout}>
        <ChallengeForm {...challengeState} />
        <div>
          <ImageActionsWrapper filename={filename}>
            <ChallengeCard
              pool={challengeState.pool}
              title={challengeState.title}
              traits={challengeState.traitsArr}
              moves={challengeState.movesArr}
              failPool={challengeState.failPool}
              failDesc={challengeState.failDesc}
            />
          </ImageActionsWrapper>
        </div>
      </div>
    </div>
  );
}
