import React from "react";
import styles from "./Dropdown.module.css";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
}: DropdownProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.selectWrapper}>
        <select
          className={`${styles.select} ${disabled ? styles.disabled : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.icon}>
          <ChevronDown size={18} />
        </span>
      </div>
    </div>
  );
}
