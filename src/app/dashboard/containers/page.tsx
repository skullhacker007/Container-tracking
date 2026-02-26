"use client";

import { useMemo, useState } from "react";
import { Dropdown } from "@/components/layout/Dropdown";
import { transportSummaryData } from "@/data/dummyData";
import { containersData } from "@/data/containers";
import styles from "./page.module.css";
import { Navigation } from "lucide-react";
import { ContainerBlueprint } from "@/components/visualizations/ContainerBlueprint";

export default function ContainersPage() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedContainer, setSelectedContainer] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const typeOptions = useMemo(() => {
    const types = Array.from(new Set(transportSummaryData.map((t) => t.type)));
    return types.map((t) => ({ label: t, value: t }));
  }, []);
  const routeOptions = useMemo(() => {
    if (!selectedType) return [];
    const filtered = transportSummaryData.filter(
      (t) => t.type === selectedType,
    );
    const uniqueRoutes = new Map();
    filtered.forEach((t) => {
      const key = `${t.from}-${t.to}`;
      if (!uniqueRoutes.has(key)) {
        uniqueRoutes.set(key, { label: `${t.from} → ${t.to}`, value: key });
      }
    });
    return Array.from(uniqueRoutes.values());
  }, [selectedType]);
  const vehicleOptions = useMemo(() => {
    if (!selectedRoute) return [];
    const [from, to] = selectedRoute.split("-");
    const filtered = transportSummaryData.filter(
      (t) => t.type === selectedType && t.from === from && t.to === to,
    );
    return filtered.map((t) => ({
      label: t.vehicleNumber
        ? `${t.vehicleNumber} (${t.transportId})`
        : t.transportId,
      value: t.transportId,
    }));
  }, [selectedType, selectedRoute]);
  const containerOptions = useMemo(() => {
    if (!selectedVehicle) return [];
    const filtered = containersData.filter(
      (c) => c.transportId === selectedVehicle,
    );

    return filtered.map((c) => ({
      label: c.containerId,
      value: c.containerId,
    }));
  }, [selectedVehicle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType && selectedRoute && selectedVehicle && selectedContainer) {
      setIsSubmitted(true);
    }
  };

  const activeContainer = useMemo(() => {
    return containersData.find((c) => c.containerId === selectedContainer);
  }, [selectedContainer]);

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
              setSelectedContainer("");
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
              setSelectedContainer("");
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
              setSelectedContainer("");
              setIsSubmitted(false);
            }}
            disabled={!selectedRoute}
          />

          <Dropdown
            label="Container ID"
            placeholder="Select Container..."
            options={containerOptions}
            value={selectedContainer}
            onChange={(val) => {
              setSelectedContainer(val);
              setIsSubmitted(false);
            }}
            disabled={!selectedVehicle || containerOptions.length === 0}
          />

          <div className={styles.submitWrapper}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={
                !selectedType ||
                !selectedRoute ||
                !selectedVehicle ||
                !selectedContainer
              }
            >
              <Navigation size={18} />
              Track Container
            </button>
          </div>
        </form>
      </div>

      {isSubmitted && activeContainer && (
        <div className={styles.blueprintWrapper}>
          <ContainerBlueprint container={activeContainer} />
        </div>
      )}
    </div>
  );
}
