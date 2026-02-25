"use client";

import React, { useMemo } from "react";
import styles from "./page.module.css";
import { transportSummaryData, shipmentTrendData } from "@/data/dummyData";
import { MetricCard } from "@/components/cards/MetricCard";
import { StatusDonutChart } from "@/components/charts/StatusDonutChart";
import { UtilizationBarChart } from "@/components/charts/UtilizationBarChart";
import { ShipmentTrendChart } from "@/components/charts/ShipmentTrendChart";
import { Activity, Package, CheckCircle, Clock } from "lucide-react";

export default function AnalyticsPage() {
  // --- 1. Calculate Aggegrate KPIs ---
  const kpis = useMemo(() => {
    let activeFleet = 0;
    let idleFleet = 0;
    let reachedFleet = 0;
    let totalCapacity = 0;
    let totalUsedSpace = 0;

    transportSummaryData.forEach((transport) => {
      // Fleet status
      if (transport.status === "Live" || transport.status === "Start") activeFleet++;
      else if (transport.status === "Idle") idleFleet++;
      else if (transport.status === "Reached") reachedFleet++;

      // Volume Capacity
      totalCapacity += transport.totalSpace;
      totalUsedSpace += transport.usedSpace;
    });

    const utilizationPercent = totalCapacity > 0 
      ? Math.round((totalUsedSpace / totalCapacity) * 100) 
      : 0;

    return {
      activeFleet,
      idleFleet,
      reachedFleet,
      utilizationPercent
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Sleek Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Analytics Command Center</h1>
          <p className={styles.subtitle}>Real-time global fleet trajectory and performance metrics.</p>
        </div>
      </div>

      {/* Row 1: KPI Grid */}
      <div className={styles.kpiGrid}>
        <MetricCard 
          title="Active Transports" 
          value={kpis.activeFleet} 
          icon={Activity} 
          accentColor="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard 
          title="Global Utilization" 
          value={`${kpis.utilizationPercent}%`} 
          icon={Package} 
          accentColor="purple"
          trend={{ value: 4, isPositive: true }}
        />
        <MetricCard 
          title="Idle / Scheduled" 
          value={kpis.idleFleet} 
          icon={Clock} 
          accentColor="orange"
          trend={{ value: 2, isPositive: false }}
        />
        <MetricCard 
          title="Completed Deliveries" 
          value={kpis.reachedFleet} 
          icon={CheckCircle} 
          accentColor="green"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Row 2: Trend Chart */}
      <div className={styles.fullWidthCard}>
        <ShipmentTrendChart data={shipmentTrendData} />
      </div>

      {/* Row 3: Split Charts */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Volume Utilization Array</h3>
          <UtilizationBarChart data={transportSummaryData} />
        </div>
        
        <div className={`${styles.chartCard} ${styles.donutCard}`}>
          <StatusDonutChart data={transportSummaryData} />
        </div>
      </div>
      
    </div>
  );
}
