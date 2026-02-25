"use client";

import { useState } from "react";
import { Bell, User, Filter } from "lucide-react";
import layoutStyles from "@/app/dashboard/layout.module.css";
import { RouteFilters } from "@/components/common/RouteFilters";

export function Topbar() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className={layoutStyles.topBar}>
      <div>
        <h1 className={layoutStyles.pageTitle}>Container Tracking</h1>
      </div>
      
      <div className={layoutStyles.headerActions}>
        <button 
          className={layoutStyles.iconBtn}
          onClick={() => setFilterOpen(!filterOpen)}
          style={{ backgroundColor: filterOpen ? "rgba(255,255,255,0.1)" : "transparent" }}
        >
          <Filter size={18} />
        </button>
        <button className={layoutStyles.iconBtn}>
          <Bell size={18} />
        </button>
        <button className={layoutStyles.iconBtn}>
          <User size={18} />
        </button>
      </div>

      <RouteFilters isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}
