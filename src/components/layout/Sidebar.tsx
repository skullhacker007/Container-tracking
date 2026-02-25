"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Truck,
  Box,
  Map,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Navigation,
  FileCheck2,
  ReceiptText,
} from "lucide-react";

import styles from "@/app/dashboard/layout.module.css";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Transports", href: "/dashboard/transports", icon: Truck },
  { label: "Containers", href: "/dashboard/containers", icon: Box },
  { label: "Routes", href: "/dashboard/routes", icon: Map },
  { label: "Tracking", href: "/dashboard/tracking", icon: Navigation },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Proof of delivery", href: "/dashboard/pod", icon: FileCheck2 },
  { label: "Invoice", href: "/dashboard/invoice", icon: ReceiptText },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}
    >
      <div className={styles.topSection}>
        {!collapsed && <h2 className={styles.logo}>Dot Phoenix Solutions</h2>}
        <button
          className={styles.toggleBtn}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${active ? styles.active : ""}`}
            >
              <span className={styles.icon}>
                <Icon size={18} />
              </span>
              {!collapsed && (
                <span className={styles.label}>{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
