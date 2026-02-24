"use client";

import { transportSummaryData, type TransportSummary } from "@/data/dummyData";
import { Truck, Ship, Plane, Train } from "lucide-react";

/* ===============================
   Helpers
=============================== */

function getUtilization(item: TransportSummary) {
  if (!item.totalSpace) return "0%";

  const percentage = Math.round((item.usedSpace / item.totalSpace) * 100);
  return `${percentage}%`;
}

function getTypeIcon(type: TransportSummary["type"]) {
  switch (type) {
    case "Truck":
      return <Truck size={18} />;

    case "Ship":
      return <Ship size={18} />;

    case "Flight":
      return <Plane size={18} />;

    case "Train":
      return <Train size={18} />;

    default:
      return null;
  }
}

function getStatusClass(status: TransportSummary["status"]) {
  switch (status) {
    case "Idle":
      return "IDLE";
    case "Start":
      return "STARTING";
    case "Live":
      return "IN_TRANSIT";
    case "Reached":
      return "REACHED";
    default:
      return "";
  }
}

/* ===============================
   Component
=============================== */

export default function DashboardPage() {
  return (
    <div className="container">
      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Route</th>
              <th>Containers</th>
              <th>Used</th>
              <th>Empty</th>
              <th>Utilization</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transportSummaryData.map((item) => (
              <tr key={item.transportId}>
                <td>{item.transportId}</td>

                {/* TYPE ICON */}
                <td>
                  <div className="typeIcon">{getTypeIcon(item.type)}</div>
                </td>

                {/* ROUTE */}
                <td className="route">
                  {item.from} → {item.to}
                </td>

                <td>{item.totalContainers}</td>
                <td>{item.usedSpace}</td>
                <td>{item.emptySpace}</td>

                {/* UTILIZATION */}
                <td className="utilization">{getUtilization(item)}</td>

                {/* STATUS */}
                <td>
                  <span className={`status ${item.status}`}>
                    {item.status === "Live" && <span className="liveDot" />}
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
