"use client";

import { useMemo, useState } from "react";
import { Dropdown } from "@/components/layout/Dropdown";
import { RouteMap } from "@/components/maps/RouteMap";
import { transportSummaryData } from "@/data/dummyData";
import styles from "./page.module.css";
import { Navigation } from "lucide-react";

export default function RoutesPage() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- 1. Extract valid TYPES ---
  const typeOptions = useMemo(() => {
    const types = Array.from(new Set(transportSummaryData.map((t) => t.type)));
    return types.map((t) => ({ label: t, value: t }));
  }, []);

  // --- 2. Extract valid ROUTES based on selected TYPE ---
  const routeOptions = useMemo(() => {
    if (!selectedType) return [];
    const filtered = transportSummaryData.filter(
      (t) => t.type === selectedType
    );
    // Unique routes "From - To"
    const uniqueRoutes = new Map();
    filtered.forEach((t) => {
      const key = `${t.from}-${t.to}`;
      if (!uniqueRoutes.has(key)) {
        uniqueRoutes.set(key, { label: `${t.from} → ${t.to}`, value: key });
      }
    });
    return Array.from(uniqueRoutes.values());
  }, [selectedType]);

  // --- 3. Extract valid VEHICLES based on selected TYPE & ROUTE ---
  const vehicleOptions = useMemo(() => {
    if (!selectedRoute) return [];
    const [from, to] = selectedRoute.split("-");
    const filtered = transportSummaryData.filter(
      (t) => t.type === selectedType && t.from === from && t.to === to
    );

    // Map the ID/Vehicle Number. Fallback to ID if no vehicleNum is provided.
    return filtered.map((t) => ({
      label: t.vehicleNumber
        ? `${t.vehicleNumber} (${t.transportId})`
        : t.transportId,
      value: t.transportId,
    }));
  }, [selectedType, selectedRoute]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType && selectedRoute && selectedVehicle) {
      setIsSubmitted(true);
    }
  };

  const getFromTo = () => {
    if (!selectedRoute) return { from: "", to: "" };
    const [from, to] = selectedRoute.split("-");
    return { from, to };
  };

  const routeData = getFromTo();
  
  const selectedTransport = useMemo(() => {
    return transportSummaryData.find((t) => t.transportId === selectedVehicle);
  }, [selectedVehicle]);

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <Dropdown
            label="Transport Type"
            placeholder="Select Type..."
            options={typeOptions}
            value={selectedType}
            onChange={(val) => {
              setSelectedType(val);
              setSelectedRoute(""); // Reset dependents
              setSelectedVehicle("");
              setIsSubmitted(false);
            }}
          />

          <Dropdown
            label="Route (From → To)"
            placeholder="Select Route..."
            options={routeOptions}
            value={selectedRoute}
            onChange={(val) => {
              setSelectedRoute(val);
              setSelectedVehicle(""); // Reset dependent
              setIsSubmitted(false);
            }}
            disabled={!selectedType}
          />

          <Dropdown
            label="Vehicle / Transport ID"
            placeholder="Select Vehicle..."
            options={vehicleOptions}
            value={selectedVehicle}
            onChange={(val) => {
              setSelectedVehicle(val);
              setIsSubmitted(false);
            }}
            disabled={!selectedRoute}
          />

          <div className={styles.submitWrapper}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!selectedType || !selectedRoute || !selectedVehicle}
            >
              <Navigation size={18} />
              Track Route
            </button>
          </div>
        </form>
      </div>

      {isSubmitted && routeData.from && routeData.to && selectedTransport && (
        <div className={styles.mapAnimationWrapper}>
          <RouteMap
            type={selectedType}
            from={routeData.from}
            to={routeData.to}
            status={selectedTransport.status}
            departureDate={selectedTransport.departureDate}
            expectedArrival={selectedTransport.expectedArrival}
          />
        </div>
      )}
    </div>
  );
}
