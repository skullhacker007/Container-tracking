"use client";

import { Filter, Bell, User } from "lucide-react";
import styles from "@/app/dashboard/layout.module.css";

export function Topbar() {
  return (
    <div className={styles.topBar}>
      <div>
        <h1 className={styles.pageTitle}>Container Tracking</h1>
      </div>

      <div className={styles.headerActions}>
        <button className={styles.iconBtn}>
          <Filter size={18} />
        </button>
        <button className={styles.iconBtn}>
          <Bell size={18} />
        </button>
        <button className={styles.iconBtn}>
          <User size={18} />
        </button>
      </div>
    </div>
  );
}
