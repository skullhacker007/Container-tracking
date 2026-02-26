"use client";

import { useState, useMemo } from "react";
import styles from "./page.module.css";
import { ordersData, OrderStatus } from "@/data/orders";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TabType = OrderStatus | "ALL";

const TABS: { label: string; value: TabType }[] = [
  { label: "All Orders", value: "ALL" },
  { label: "Active Orders", value: "ACTIVE" },
  { label: "Closed Orders", value: "CLOSED" },
  { label: "Upcoming Orders", value: "UPCOMING" },
  { label: "Cancelled Orders", value: "CANCELLED" },
];

const ITEMS_PER_PAGE = 5;

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    let result = ordersData;
    if (activeTab !== "ALL") {
      result = ordersData.filter((order) => order.status === activeTab);
    }
    return result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [activeTab]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getCount = (status: TabType) => {
    if (status === "ALL") return ordersData.length;
    return ordersData.filter((order) => order.status === status).length;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const setTab = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page on tab change
  };

  return (
    <div className={styles.container}>
      {}

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`${styles.tabBtn} ${activeTab === tab.value ? styles.active : ""}`}
            onClick={() => setTab(tab.value)}
          >
            {tab.label}
            <span className={styles.tabCount}>{getCount(tab.value)}</span>
          </button>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Destination</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.orderId}>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.customerName}</td>
                  <td>{order.destination}</td>
                  <td>{order.items}</td>
                  <td className={styles.amount}>
                    {formatCurrency(order.amount)}
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  No orders found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {}
        {totalPages > 1 && (
          <div className="paginationContainer">
            <button
              className="paginationBtn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <div className="pageNumbers">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`pageNumberBtn ${
                      currentPage === pageNum ? "activePage" : ""
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              className="paginationBtn"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
