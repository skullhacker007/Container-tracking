"use client";

import React, { useMemo, useState } from "react";
import styles from "./ShipmentTrendChart.module.css";
import { TrendDataPoint } from "@/data/dummyData";

interface ShipmentTrendChartProps {
  data: TrendDataPoint[];
}

export function ShipmentTrendChart({ data }: ShipmentTrendChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { maxRevenue, points, polylinePoints, areaPoints } = useMemo(() => {
    if (!data.length) return { maxRevenue: 0, points: [], polylinePoints: "", areaPoints: "" };

    const maxRev = Math.max(...data.map((d) => d.revenue)) * 1.1; // Add 10% ceiling padding
    
    // SVG Coordinate Space: 800 width, 250 height
    const width = 800;
    const height = 200;
    const paddingX = 40;
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - 40; // padding top/bottom

    const stepX = usableWidth / (data.length - 1);

    const calculatedPoints = data.map((d, i) => {
      const x = paddingX + i * stepX;
      // Invert Y because SVG 0,0 is top-left
      const y = height - 20 - (d.revenue / maxRev) * usableHeight;
      return { x, y, data: d };
    });

    const polyStr = calculatedPoints.map((p) => `${p.x},${p.y}`).join(" ");
    
    // Area path closes down to the bottom
    const areaStr = `M ${calculatedPoints[0].x},${height} 
                     L ${polyStr} 
                     L ${calculatedPoints[calculatedPoints.length - 1].x},${height} Z`;

    return { maxRevenue: maxRev, points: calculatedPoints, polylinePoints: polyStr, areaPoints: areaStr };
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Revenue & Shipment Trends</h3>
        <p className={styles.subtitle}>Last 14 Days Historical Performance</p>
      </div>

      <div className={styles.chartWrapper}>
        <svg viewBox="0 0 800 250" className={styles.svg} preserveAspectRatio="none">
          {/* Gradients */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.4)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.0)" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = 20 + ratio * (200 - 40);
            return (
              <g key={`grid-${i}`}>
                <line x1="40" y1={y} x2="760" y2={y} stroke="rgba(51, 65, 85, 0.3)" strokeDasharray="4 4" />
                <text x="30" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">
                  ${Math.round((maxRevenue * (1 - ratio)) / 1000)}k
                </text>
              </g>
            );
          })}

          {/* Data Area & Line */}
          <path d={areaPoints} fill="url(#areaGradient)" className={styles.areaAnimation} />
          <polyline points={polylinePoints} fill="none" stroke="url(#lineGradient)" strokeWidth="3" className={styles.lineAnimation} />

          {/* Interactive Points */}
          {points.map((p, i) => (
            <g 
              key={`point-${i}`} 
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className={styles.pointGroup}
            >
              {/* Invisible interaction hit box */}
              <rect x={p.x - 15} y="0" width="30" height="250" fill="transparent" />
              
              {/* Visible Data Dot */}
              <circle 
                cx={p.x} 
                cy={p.y} 
                r={hoverIndex === i ? 6 : 4} 
                fill="#0f172a" 
                stroke="#38bdf8" 
                strokeWidth={hoverIndex === i ? 3 : 2} 
                className={styles.dot}
              />
              
              {/* X-Axis Label (Only show every 2nd or if hovered to prevent crowding) */}
              {(i % 2 === 0 || hoverIndex === i) && (
                <text x={p.x} y="220" fill={hoverIndex === i ? "#f8fafc" : "#64748b"} fontSize="10" textAnchor="middle">
                  {p.data.day}
                </text>
              )}
            </g>
          ))}
        </svg>

        {/* HTML Tooltip for Hover */}
        {hoverIndex !== null && points[hoverIndex] && (
          <div 
            className={styles.tooltip}
            style={{ 
              left: `calc(${(points[hoverIndex].x / 800) * 100}% - 60px)`, 
              top: `${(points[hoverIndex].y / 250) * 100}%` 
            }}
          >
            <div className={styles.ttDate}>{points[hoverIndex].data.day}</div>
            <div className={styles.ttRev}>${points[hoverIndex].data.revenue.toLocaleString()}</div>
            <div className={styles.ttShip}>{points[hoverIndex].data.shipments} Shipments</div>
          </div>
        )}

      </div>
    </div>
  );
}
