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
      // Fleet status based on TOTAL CONTAINERS in that transport
      // The user wants Active Transports to reflect the number of active CONTAINERS, not just the vehicle count.
      if (transport.status === "Live" || transport.status === "Start") {
        activeFleet += transport.totalContainers;
      }
      else if (transport.status === "Idle") {
        idleFleet += transport.totalContainers;
      }
      else if (transport.status === "Reached") {
        reachedFleet += transport.totalContainers;
      }

      // Volume Capacity
      totalCapacity += transport.totalSpace;
      totalUsedSpace += transport.usedSpace;
    });

    const utilizationPercent = totalCapacity > 0 
      ? Math.round((totalUsedSpace / totalCapacity) * 100) 
      : 0;

    // Calculate Dynamic Trends based on shipmentTrendData
    // We compare the last 7 days vs the previous 7 days
    const totalDays = shipmentTrendData.length;
    let recentActive = 0, previousActive = 0;
    let recentReach = 0, previousReach = 0;
    
    if (totalDays >= 14) {
      for (let i = totalDays - 7; i < totalDays; i++) {
        recentActive += shipmentTrendData[i].shipments;
        recentReach += Math.floor(shipmentTrendData[i].shipments * 0.8); // mock completed
      }
      for (let i = totalDays - 14; i < totalDays - 7; i++) {
        previousActive += shipmentTrendData[i].shipments;
        previousReach += Math.floor(shipmentTrendData[i].shipments * 0.8);
      }
    }

    const calcTrend = (current: number, previous: number) => {
      if (previous === 0) return { value: 0, isPositive: true };
      const diff = current - previous;
      const perc = Math.round((diff / previous) * 100);
      return { value: Math.abs(perc), isPositive: perc >= 0 };
    };

    return {
      activeFleet,
      idleFleet,
      reachedFleet,
      utilizationPercent,
      trends: {
        active: calcTrend(recentActive, previousActive),
        utilization: { value: 4, isPositive: true }, // Keeping static for now as we don't have historical capacity
        idle: { value: 2, isPositive: false }, // Lower idle is better, but this relies on live data
        reached: calcTrend(recentReach, previousReach)
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Sleek Header */}
      {/* <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Analytics Command Center</h1>
          <p className={styles.subtitle}>Real-time global fleet trajectory and performance metrics.</p>
        </div>
      </div> */}

      {/* Row 1: KPI Grid */}
      <div className={styles.kpiGrid}>
        <MetricCard 
          title="Active Containers" 
          value={kpis.activeFleet} 
          icon={Activity} 
          accentColor="blue"
          trend={kpis.trends.active}
        />
        <MetricCard 
          title="Global Utilization" 
          value={`${kpis.utilizationPercent}%`} 
          icon={Package} 
          accentColor="purple"
          trend={kpis.trends.utilization}
        />
        <MetricCard 
          title="Idle / Scheduled" 
          value={kpis.idleFleet} 
          icon={Clock} 
          accentColor="orange"
          trend={kpis.trends.idle}
        />
        <MetricCard 
          title="Completed Deliveries" 
          value={kpis.reachedFleet} 
          icon={CheckCircle} 
          accentColor="green"
          trend={kpis.trends.reached}
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
