"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useFilters } from "@/context/FilterContext";
import styles from "./RouteFilters.module.css";

interface RouteFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RouteFilters({ isOpen, onClose }: RouteFiltersProps) {
  const { filters, setFilters } = useFilters();
  const [localType, setLocalType] = useState(filters.type);
  const [localStatus, setLocalStatus] = useState(filters.status);
  useEffect(() => {
    setLocalType(filters.type);
    setLocalStatus(filters.status);
  }, [filters]);

  const handleApplyFilter = () => {
    setFilters({ type: localType, status: localStatus });
    onClose();
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
      />
      <div
        className={`${styles.dropdownPanel} ${isOpen ? styles.dropdownOpen : ""}`}
      >
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Type</span>
            <div className={styles.selectWrapper}>
              <select
                className={styles.filterSelect}
                value={localType}
                onChange={(e) => setLocalType(e.target.value)}
              >
                <option value="">Select All</option>
                <option value="Truck">Truck</option>
                <option value="Ship">Ship</option>
                <option value="Flight">Flight</option>
                <option value="Train">Train</option>
              </select>
              <ChevronDown className={styles.selectIcon} size={14} />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Status</span>
            <div className={styles.selectWrapper}>
              <select
                className={styles.filterSelect}
                value={localStatus}
                onChange={(e) => setLocalStatus(e.target.value)}
              >
                <option value="">Select All</option>
                <option value="Live">Live</option>
                <option value="Start">Start</option>
                <option value="Reached">Reached</option>
                <option value="Idle">Idle</option>
              </select>
              <ChevronDown className={styles.selectIcon} size={14} />
            </div>
          </div>

          <div className={styles.actionGroup}>
            <button className={styles.submitBtn} onClick={handleApplyFilter}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
