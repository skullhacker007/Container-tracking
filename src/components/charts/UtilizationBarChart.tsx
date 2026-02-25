"use client";

import React, { useMemo, useEffect, useState } from "react";
import styles from "./UtilizationBarChart.module.css";
import { TransportSummary } from "@/data/dummyData";

interface UtilizationBarChartProps {
  data: TransportSummary[];
}

export function UtilizationBarChart({ data }: UtilizationBarChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const chartData = useMemo(() => {
    // Group volume data by transport type
    const groups: Record<string, { used: number; total: number }> = {
      Ship: { used: 0, total: 0 },
      Train: { used: 0, total: 0 },
      Flight: { used: 0, total: 0 },
      Truck: { used: 0, total: 0 },
    };

    data.forEach(t => {
      if (groups[t.type]) {
        groups[t.type].used += t.usedSpace;
        groups[t.type].total += t.totalSpace;
      }
    });

    // Calculate percentages and formatting
    return Object.entries(groups).map(([type, stats]) => {
      const percentage = stats.total > 0 ? (stats.used / stats.total) * 100 : 0;
      
      // Assign custom gradient themes based on type
      let gradientClass = styles.blueTheme;
      if (type === "Train") gradientClass = styles.purpleTheme;
      else if (type === "Flight") gradientClass = styles.orangeTheme;
      else if (type === "Truck") gradientClass = styles.greenTheme;

      return {
        type,
        percentage,
        usedFormatted: stats.used.toLocaleString(),
        totalFormatted: stats.total.toLocaleString(),
        theme: gradientClass
      };
    });
  }, [data]);

  return (
    <div className={styles.container}>
      {/* Header handled by parent layout */}
      
      <div className={styles.barsList}>
        {chartData.map((item, i) => (
          <div key={item.type} className={styles.barRow}>
            
            <div className={styles.barInfo}>
              <span className={styles.typeLabel}>{item.type}</span>
              <span className={styles.statsLabel}>
                {item.usedFormatted} <span className={styles.muted}>/ {item.totalFormatted} m³</span>
              </span>
            </div>

            <div className={styles.track}>
              <div 
                className={`${styles.fill} ${item.theme}`}
                style={{ 
                  width: mounted ? `${item.percentage}%` : '0%',
                  transitionDelay: `${i * 100}ms`
                }}
              >
                {mounted && item.percentage > 5 && (
                  <span className={styles.percentageLabel}>
                    {item.percentage.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
