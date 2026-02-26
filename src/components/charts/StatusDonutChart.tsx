"use client";

import React, { useMemo, useEffect, useState } from "react";
import styles from "./StatusDonutChart.module.css";
import { TransportSummary } from "@/data/dummyData";

interface StatusDonutChartProps {
  data: TransportSummary[];
}

export function StatusDonutChart({ data }: StatusDonutChartProps) {
  const [mounted, setMounted] = useState(false);
  const RADIUS = 60;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const chartData = useMemo(() => {
    let live = 0,
      start = 0,
      idle = 0,
      reached = 0;

    data.forEach((t) => {
      if (t.status === "Live") live += t.totalContainers;
      if (t.status === "Start") start += t.totalContainers;
      if (t.status === "Idle") idle += t.totalContainers;
      if (t.status === "Reached") reached += t.totalContainers;
    });

    const total = live + start + idle + reached;
    const pLive = (live / total) * 100 || 0;
    const pStart = (start / total) * 100 || 0;
    const pIdle = (idle / total) * 100 || 0;
    const pReached = (reached / total) * 100 || 0;
    const cLive = (pLive / 100) * CIRCUMFERENCE;
    const cStart = (pStart / 100) * CIRCUMFERENCE;
    const cIdle = (pIdle / 100) * CIRCUMFERENCE;
    const cReached = (pReached / 100) * CIRCUMFERENCE;

    return {
      total,
      slices: [
        {
          label: "Live",
          value: live,
          color: "#38bdf8",
          stroke: cLive,
          offset: 0,
        },
        {
          label: "Start",
          value: start,
          color: "#a855f7",
          stroke: cStart,
          offset: -cLive,
        },
        {
          label: "Idle",
          value: idle,
          color: "#f97316",
          stroke: cIdle,
          offset: -(cLive + cStart),
        },
        {
          label: "Reached",
          value: reached,
          color: "#22c55e",
          stroke: cReached,
          offset: -(cLive + cStart + cIdle),
        },
      ],
    };
  }, [data, CIRCUMFERENCE]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Status Distribution</h3>

      <div className={styles.chartWrapper}>
        <svg viewBox="0 0 160 160" className={styles.svg}>
          {}
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="transparent"
            stroke="rgba(51, 65, 85, 0.4)"
            strokeWidth="20"
          />

          {}
          {chartData.slices.map(
            (slice, i) =>
              slice.value > 0 && (
                <circle
                  key={slice.label}
                  cx="80"
                  cy="80"
                  r={RADIUS}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth="20"
                  strokeDasharray={`${slice.stroke} ${CIRCUMFERENCE}`}
                  strokeDashoffset={mounted ? slice.offset : 0}
                  className={styles.slice}
                  style={{
                    transitionDelay: `${i * 150}ms`,
                    opacity: mounted ? 1 : 0,
                  }}
                />
              ),
          )}
        </svg>

        {}
        <div className={styles.centerText}>
          <span className={styles.totalValue}>{chartData.total}</span>
          <span className={styles.totalLabel}>Total</span>
        </div>
      </div>

      {}
      <div className={styles.legend}>
        {chartData.slices.map((slice) => (
          <div key={slice.label} className={styles.legendItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: slice.color }}
            ></span>
            <span className={styles.legendLabel}>{slice.label}</span>
            <span className={styles.legendValue}>{slice.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
