"use client";

import { transportSummaryData } from "@/data/dummyData";
import { Truck, Ship, Plane, Train } from "lucide-react";

function getTypeIcon(type: string) {
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

export default function TransportsPage() {
  return (
    <div className="container">
      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Vehicle</th>
              <th>Route</th>
              <th>Containers</th>
              <th>Driver</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transportSummaryData.map((transport) => (
              <tr key={transport.transportId}>
                {/* ID */}
                <td>{transport.transportId}</td>

                {/* TYPE WITH ICON */}
                <td>
                  <div className="typeIcon">{getTypeIcon(transport.type)}</div>
                </td>

                {/* VEHICLE */}
                <td>{transport.vehicleNumber || "-"}</td>

                {/* ROUTE */}
                <td className="route">
                  {transport.from} → {transport.to}
                </td>

                {/* TOTAL CONTAINERS */}
                <td>{transport.totalContainers}</td>

                {/* DRIVER */}
                <td>{transport.captainOrDriver || "-"}</td>

                {/* CONTACT */}
                <td>{transport.contactNumber || "-"}</td>

                {/* STATUS */}
                <td>
                  <span className={`status ${transport.status}`}>
                    {transport.status === "Live" && (
                      <span className="liveDot" />
                    )}
                    {transport.status}
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
