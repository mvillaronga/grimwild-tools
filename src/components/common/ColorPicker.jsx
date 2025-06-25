import React, { useState, useEffect } from "react";
import { monsterColourHex } from "../../utils/colors";
import ColorDropdown from "./ColorDropdown";
import styles from "./ColorPicker.module.css";

export default function ColorPicker({
  colorValue,
  onColorChange,
  labelValue,
  onLabelChange
}) {

  return (
    <div className={styles.colorPicker}>
      <ColorDropdown
        colorValue={colorValue}
        onColorChange={onColorChange}
        labelValue={labelValue}
        onLabelChange={onLabelChange}
      />
    </div>
  );
}
