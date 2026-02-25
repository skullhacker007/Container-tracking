"use client";

import { useState, useMemo } from "react";
import styles from "./page.module.css";
import { podData, PODStatus, POD } from "@/data/pod";
import { ChevronLeft, ChevronRight, FileCheck2, X, Truck, Ship, Plane, Train } from "lucide-react";
import Image from "next/image";

type TabType = PODStatus | "ALL";

const TABS: { label: string; value: TabType }[] = [
  { label: "All Loads", value: "ALL" },
  { label: "Verification", value: "VERIFICATION" },
  { label: "Approved", value: "APPROVED" },
  { label: "Canceled", value: "CANCELED" },
  { label: "Hold", value: "HOLD" },
  { label: "Call Back", value: "CALL_BACK" },
];

const ITEMS_PER_PAGE = 5;

// Helper to extract initials for avatar
const getInitials = (name: string) => {
  if (!name) return "??";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function ProofOfDeliveryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPOD, setSelectedPOD] = useState<POD | null>(null);

  const filteredPODs = useMemo(() => {
    let result = podData;
    if (activeTab !== "ALL") {
      result = podData.filter((pod) => pod.status === activeTab);
    }
    // Sort by delivery date descending
    return result.sort(
      (a, b) => new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime()
    );
  }, [activeTab]);

  const totalPages = Math.ceil(filteredPODs.length / ITEMS_PER_PAGE);
  const paginatedPODs = filteredPODs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getCount = (status: TabType) => {
    if (status === "ALL") return podData.length;
    return podData.filter((pod) => pod.status === status).length;
  };

  const setTab = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedPOD(null); // Close panel on tab change
  };

  const handleRowClick = (pod: POD) => {
    // Toggle selection if clicking the same row
    if (selectedPOD?.id === pod.id) {
      setSelectedPOD(null);
    } else {
      setSelectedPOD(pod);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header and Summary Counters */}
      <div className={styles.header}>
        <h2>Proof of Delivery (POD)</h2>
        <p>Logistics queue showing strictly Reached transport loads awaiting Proof of Delivery processing</p>
        
     
      </div>

      {/* Pill Tabs Navigation */}
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`${styles.tabBtn} ${activeTab === tab.value ? styles.active : ""}`}
            onClick={() => setTab(tab.value)}
          >
            {tab.label}
            <span className={styles.tabCountBtn}>{getCount(tab.value)}</span>
          </button>
        ))}
      </div>

      {/* Main Layout Area */}
      <div className={styles.contentArea}>
        
        {/* Left Side: List View */}
        <div className={styles.listWrapper}>
          <div className={styles.listHeader}>
            <div className={styles.headerCell}>Transport ID</div>
            <div className={styles.headerCell}>Customer</div>
            <div className={styles.headerCell}>Container ID</div>
            <div className={styles.headerCell}>Driver</div>
            <div className={styles.headerCell}>Contact</div>
            <div className={styles.headerCell} style={{ textAlign: "center" }}>Transport</div>
            <div className={styles.headerCell} style={{ textAlign: "center" }}>Status</div>
          </div>
          
          <div className={styles.listBody}>
            {paginatedPODs.length > 0 ? (
              paginatedPODs.map((pod) => (
                <div 
                  key={pod.id} 
                  className={`${styles.listItem} ${selectedPOD?.id === pod.id ? styles.selected : ""}`}
                  onClick={() => handleRowClick(pod)}
                >
                  {/* Transport ID */}
                  <div className={styles.cellContent}>
                    <span className={styles.primaryText}>{pod.transportId}</span>
                  </div>

                  {/* Customer Info */}
                  <div className={styles.cellContent}>
                    <span className={styles.primaryText}>{pod.customerName}</span>
                    <span className={styles.secondaryText}>{pod.location}</span>
                  </div>

                  {/* Container/POD IDs */}
                  <div className={styles.cellContent}>
                    <span className={styles.primaryText}>{pod.containerId}</span>
                    {pod.status === "APPROVED" && (
                      <span className={styles.secondaryText}>POD ID: {pod.id}</span>
                    )}
                  </div>

                  {/* Driver Avatar */}
                  <div className={styles.driverCell}>
                    <div className={styles.avatar}>
                      {getInitials(pod.driverName)}
                    </div>
                    <div className={styles.cellContent}>
                      <span className={styles.primaryText}>{pod.driverName}</span>
                      <span className={styles.secondaryText}>{pod.receiverName} (Recv)</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className={styles.cellContent}>
                    <span className={styles.primaryText}>{pod.receiverContact}</span>
                  </div>

                  {/* Transport Type */}
                  <div className={styles.cellContent} style={{ alignItems: "center", justifyContent: "center" }}>
                     {pod.type === "Truck" && <Truck size={20} className={styles.secondaryText} />}
                     {pod.type === "Ship" && <Ship size={20} className={styles.secondaryText} />}
                     {pod.type === "Flight" && <Plane size={20} className={styles.secondaryText} />}
                     {pod.type === "Train" && <Train size={20} className={styles.secondaryText} />}
                  </div>

                  {/* Status Box */}
                  <div className={styles.cellContent} style={{ justifyContent: "center", alignItems: "center" }}>
                    <span className={`${styles.badge} ${styles[pod.status]}`}>
                      {pod.status === "CALL_BACK" ? "CALL BACK" : pod.status === "VERIFICATION" ? "NOT VERIFIED" : pod.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <FileCheck2 size={48} className={styles.emptyIcon} />
                <p>No proof of delivery records found in this category.</p>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="paginationContainer" style={{ borderTop: "1px solid #334155" }}>
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

        {/* Right Side: Details Panel */}
        {selectedPOD && (
          <div className={styles.sidePanel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitleGroup}>
                <span className={styles.panelTitle}>{selectedPOD.orderId}</span>
                <span className={`${styles.badge} ${styles[selectedPOD.status]}`}>
                  {selectedPOD.status === "CALL_BACK" ? "CALL BACK" : selectedPOD.status}
                </span>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedPOD(null)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.panelBody}>
              {/* Identity Header */}
              <div className={styles.identityBlock}>
                <div className={styles.identityIcon}>
                   {selectedPOD.type === "Truck" && <Truck size={24} />}
                   {selectedPOD.type === "Ship" && <Ship size={24} />}
                   {selectedPOD.type === "Flight" && <Plane size={24} />}
                   {selectedPOD.type === "Train" && <Train size={24} />}
                </div>
                <div className={styles.cellContent}>
                  <span className={styles.primaryText}>{selectedPOD.orderId}</span>
                  <span className={styles.secondaryText}>{selectedPOD.customerName}</span>
                </div>
              </div>

              {/* Data Grid */}
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Delivery Date:</span>
                  <span className={styles.infoValue}>{selectedPOD.deliveryDate}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Driver:</span>
                  <span className={styles.infoValue}>{selectedPOD.driverName}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Transport Type:</span>
                  <span className={styles.infoValue}>{selectedPOD.type}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Receiver:</span>
                  <span className={styles.infoValue}>{selectedPOD.receiverName}</span>
                </div>
                <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
                  <span className={styles.infoLabel}>Delivery Address:</span>
                  <span className={styles.infoValue}>{selectedPOD.location}</span>
                </div>
              </div>

              {selectedPOD.notes && (
                <div className={styles.docSection}>
                  <div className={styles.docTitle}>Notes</div>
                  <span className={styles.secondaryText}>{selectedPOD.notes}</span>
                </div>
              )}

              {/* POD Documents */}
              <div className={styles.docSection}>
                <div className={styles.docTitle}>
                  POD Documents
                  <span className={styles.downloadLink}>Download</span>
                </div>
                <div className={styles.docPreview}>
                  <FileCheck2 size={32} />
                  <span style={{ marginLeft: "0.5rem" }}>Document Attached</span>
                </div>
              </div>

              {/* Photo Evidence */}
              <div className={styles.docSection}>
                <div className={styles.docTitle}>
                  Photo Evidence
                  <span className={styles.downloadLink}>Download</span>
                </div>
                <div className={styles.photoPreview}>
                  <Image 
                    src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=400" 
                    alt="Warehouse loading bay" 
                    width={400}
                    height={250}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
