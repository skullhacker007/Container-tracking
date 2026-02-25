import React from "react";
import { LucideIcon } from "lucide-react";
import styles from "./MetricCard.module.css";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  accentColor?: "blue" | "green" | "purple" | "orange";
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  accentColor = "blue",
}: MetricCardProps) {
  return (
    <div className={`${styles.card} ${styles[accentColor]}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} size={20} />
        </div>
      </div>
      
      <div className={styles.content}>
        <p className={styles.value}>{value}</p>
        
        {trend && (
          <div className={`${styles.trend} ${trend.isPositive ? styles.positive : styles.negative}`}>
            <span className={styles.trendArrow}>
              {trend.isPositive ? "↑" : "↓"}
            </span>
            <span className={styles.trendValue}>{Math.abs(trend.value)}%</span>
            <span className={styles.trendLabel}>vs last week</span>
          </div>
        )}
      </div>
      
      {/* Decorative accent glow */}
      <div className={styles.glow} />
    </div>
  );
}
