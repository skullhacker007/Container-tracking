"use client";

import { transportSummaryData } from "@/data/dummyData";
import { getUtilization, getTypeIcon, getStatusClass } from "@/lib/utils";
import { useState } from "react";
import { Pagination } from "./Pagination";

const ITEMS_PER_PAGE = 5;

export function DashboardOverviewTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transportSummaryData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = transportSummaryData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
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
          {paginatedData.map((item) => (
            <tr key={item.transportId}>
              <td>{item.transportId}</td>

              {/* TYPE ICON */}
              <td>
                <div className="typeIconWrap">
                  <div className="typeIcon">{getTypeIcon(item.type)}</div>
                </div>
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

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
