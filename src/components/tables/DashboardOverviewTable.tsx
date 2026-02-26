"use client";

import { transportSummaryData } from "@/data/dummyData";
import { getUtilization, getTypeIcon, getStatusClass } from "@/lib/utils";
import { useState, useMemo } from "react";
import { Pagination } from "./Pagination";
import { useFilters } from "@/context/FilterContext";

const ITEMS_PER_PAGE = 5;

export function DashboardOverviewTable() {
  const { filters } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const filteredData = useMemo(() => {
    return transportSummaryData.filter((item) => {
      const matchType = filters.type ? item.type === filters.type : true;
      const matchStatus = filters.status
        ? item.status === filters.status
        : true;
      return matchType && matchStatus;
    });
  }, [filters]);
  const filtersString = JSON.stringify(filters);
  const [prevFilters, setPrevFilters] = useState(filtersString);

  if (filtersString !== prevFilters) {
    setCurrentPage(1);
    setPrevFilters(filtersString);
  }

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  return (
    <div>
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

                {}
                <td>
                  <div className="typeIconWrap">
                    <div className="typeIcon">{getTypeIcon(item.type)}</div>
                  </div>
                </td>

                {}
                <td className="route">
                  {item.from} → {item.to}
                </td>

                <td>{item.totalContainers}</td>
                <td>{item.usedSpace}</td>
                <td>{item.emptySpace}</td>

                {}
                <td className="utilization">{getUtilization(item)}</td>

                {}
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
    </div>
  );
}
