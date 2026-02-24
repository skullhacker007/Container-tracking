"use client";

import { Truck, Ship, Plane, Train } from "lucide-react";
import styles from "./RouteMap.module.css";
import { useEffect, useState } from "react";

interface RouteMapProps {
  type: string;
  from: string;
  to: string;
  status: string;
  departureDate: string;
  expectedArrival: string;
}

export function RouteMap({ type, from, to, status, departureDate, expectedArrival }: RouteMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay ensures the browser paints at 0% before transitioning to actual progress
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });
  };

  const getProgressPercentage = () => {
    if (status !== "Live") return null;
    if (!departureDate || !expectedArrival) return 50; // Fallback

    const start = new Date(departureDate).getTime();
    const end = new Date(expectedArrival).getTime();
    const now = new Date().getTime();

    if (now <= start) return 0;
    if (now >= end) return 100;

    const totalDuration = end - start;
    const elapsed = now - start;
    
    // Calculate percentage, keeping it within 0-100 range.
    // We adjust the max position slightly (e.g., 95%) so the icon doesn't overflow the container exactly like the CSS animation did `calc(100% - 3rem)`
    const rawPercentage = (elapsed / totalDuration) * 100;
    return Math.min(Math.max(rawPercentage, 0), 95); 
  };

  const liveProgress = getProgressPercentage();

  const renderIcon = () => {
    switch (type) {
      case "Truck":
        return <Truck size={28} className={styles.vehicleIcon} />;
      case "Ship":
        return <Ship size={28} className={styles.vehicleIcon} />;
      case "Flight":
        return <Plane size={28} className={styles.vehicleIcon} />;
      case "Train":
        return <Train size={28} className={styles.vehicleIcon} />;
      default:
        return null;
    }
  };

  const getPathStyle = () => {
    switch (type) {
      case "Flight":
        return styles.flightPath;
      case "Ship":
        return styles.shipPath;
      default:
        return styles.solidPath;
    }
  };

  return (
    <div className={styles.mapContainer}>
      <h3 className={styles.title}>Live Route Tracking</h3>
      
      <div className={styles.visualizer}>
        {/* Origin */}
        <div className={styles.marker}>
          <div className={`${styles.markerDot} ${status === 'Idle' ? styles.idleDot : ''}`} />
          <span className={styles.markerLabel}>{from}</span>
          <span className={styles.dateText}>{formatDate(departureDate)}</span>
        </div>

        {/* Path and animations */}
        <div className={styles.pathContainer}>
          <div className={`${styles.pathLine} ${getPathStyle()}`} />
          
          <div 
            key={`${type}-${from}-${to}-${status}`} 
            className={`${styles.animatingElement} ${
              status === "Start" ? styles.startPosition : 
              status === "Idle" ? styles.startPosition :
              status === "Reached" ? styles.endPosition : 
              status === "Live" ? styles.livePosition :
              ""
            }`}
            style={status === "Live" && liveProgress !== null ? { 
              left: mounted ? `${liveProgress}%` : '0%' 
            } : undefined}
          >
            {renderIcon()}
          </div>
        </div>

        {/* Destination */}
        <div className={styles.marker}>
          <div className={`${styles.markerDot} ${styles.destinationDot}`} />
          <span className={styles.markerLabel}>{to}</span>
          <span className={styles.dateText}>{formatDate(expectedArrival)}</span>
        </div>
      </div>
    </div>
  );
}
