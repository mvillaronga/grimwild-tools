import React from "react";
import styles from "./FormField.module.css";

/**
 * Reusable form field component with consistent styling
 */
export function FormField({
  label,
  children,
  style = {},
  labelStyle = {},
  required = false
}) {
  return (
    <div className={styles.formField} style={style}>
      <label className={styles.label} style={labelStyle}>
        <span className={styles.labelText}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
        {children}
      </label>
    </div>
  );
}

/**
 * Text input field with consistent styling
 */
export function TextField({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  style = {},
  inputStyle = {}
}) {
  return (
    <FormField label={label} required={required} style={style}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.textInput}
        style={inputStyle}
      />
    </FormField>
  );
}

/**
 * Number input field with validation
 */
export function NumberField({ 
  label, 
  value, 
  onChange, 
  min = 1, 
  max = 99,
  required = false,
  style = {},
  inputStyle = {}
}) {
  const handleChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length > 2) val = val.slice(0, 2);
    onChange({ target: { value: val } });
  };

  return (
    <FormField label={label} required={required} style={style}>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={styles.numberInput}
        style={inputStyle}
      />
    </FormField>
  );
}

/**
 * Textarea field with consistent styling
 */
export function TextAreaField({ 
  label, 
  value, 
  onChange, 
  rows = 3,
  placeholder = "",
  required = false,
  style = {},
  textareaStyle = {}
}) {
  return (
    <FormField label={label} required={required} style={style}>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={styles.textareaInput}
        style={textareaStyle}
      />
    </FormField>
  );
}
