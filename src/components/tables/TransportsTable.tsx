"use client";

import { transportSummaryData } from "@/data/dummyData";
import { getTypeIcon, getStatusClass } from "@/lib/utils";
import { useState, useMemo } from "react";
import { Pagination } from "./Pagination";
import { useFilters } from "@/context/FilterContext";

const ITEMS_PER_PAGE = 5;

export function TransportsTable() {
  const { filters } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on context
  const filteredData = useMemo(() => {
    return transportSummaryData.filter((item) => {
      const matchType = filters.type ? item.type === filters.type : true;
      const matchStatus = filters.status ? item.status === filters.status : true;
      return matchType && matchStatus;
    });
  }, [filters]);

  // Reset page when filters change without using useEffect
  // We keep track of the previous filter string to know when to reset
  const filtersString = JSON.stringify(filters);
  const [prevFilters, setPrevFilters] = useState(filtersString);
  
  if (filtersString !== prevFilters) {
    setCurrentPage(1);
    setPrevFilters(filtersString);
  }

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return (
    <div>
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
          {paginatedData.map((transport) => (
            <tr key={transport.transportId}>
              {/* ID */}
              <td>{transport.transportId}</td>

              {/* TYPE WITH ICON */}
              <td>
                <div className="typeIconWrap">
                  <div className="typeIcon">{getTypeIcon(transport.type)}</div>
                </div>
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
                <span className={`status ${getStatusClass(transport.status)}`}>
                  {transport.status === "Live" && <span className="liveDot" />}
                  {transport.status}
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
    </div>
  );
}
