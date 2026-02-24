"use client";

import { transportSummaryData } from "@/data/dummyData";
import { getUtilization, getTypeIcon, getStatusClass } from "@/lib/utils";

export function DashboardOverviewTable() {
  return (
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
                <span className={`status ${getStatusClass(item.status)}`}>
                  {item.status === "Live" && <span className="liveDot" />}
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
