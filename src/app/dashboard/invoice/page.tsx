"use client";

import { useState, useRef, useMemo } from "react";
import styles from "./page.module.css";
import { invoiceData, Invoice, podData, InvoiceStatus } from "@/data/dummyData";
import {
  Download,
  Plus,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Truck,
  Ship,
  Plane,
  Train,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formatUSD = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function InvoicePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPodId, setSelectedPodId] = useState("");
  const [invoiceDate, setInvoiceDate] = useState<Date | null>(new Date());
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatus>("Pending");

  const pdfRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 5;
  const { totalOutstanding, totalPaid, totalPending, totalOverdue } =
    useMemo(() => {
      let out = 0,
        paid = 0,
        pend = 0,
        over = 0;
      invoiceData.forEach((inv) => {
        out += inv.amount;
        if (inv.status === "Paid") paid += inv.amount;
        else if (inv.status === "Pending") pend += inv.amount;
        else if (inv.status === "Overdue") over += inv.amount;
      });
      return {
        totalOutstanding: out,
        totalPaid: paid,
        totalPending: pend,
        totalOverdue: over,
      };
    }, []);

  const approvedPODsWithoutInvoice = useMemo(() => {
    return podData.filter((pod) => pod.status === "APPROVED");
  }, []);

  const selectedPod = useMemo(() => {
    return (
      approvedPODsWithoutInvoice.find((p) => p.id === selectedPodId) || null
    );
  }, [selectedPodId, approvedPODsWithoutInvoice]);

  const nextInvoiceId = useMemo(() => {
    if (!selectedPod) return `INV-2026-00${invoiceData.length + 1}`;
    const duplicateInvoices = invoiceData.filter(
      (inv) => inv.orderId === selectedPod.orderId,
    ).length;
    return duplicateInvoices > 0
      ? `INV${duplicateInvoices + 1}`
      : `INV-2026-00${invoiceData.length + 1}`;
  }, [selectedPod]);

  const totalPages = Math.ceil(invoiceData.length / ITEMS_PER_PAGE) || 1;
  const paginatedInvoices = invoiceData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDownload = async (invoice: Invoice) => {
    if (!previewInvoice || previewInvoice.id !== invoice.id) {
      setPreviewInvoice(invoice);
      setTimeout(() => executeDownload(invoice), 300);
    } else {
      executeDownload(invoice);
    }
  };

  const executeDownload = async (invoice: Invoice) => {
    if (!pdfRef.current || isDownloading) return;
    try {
      setIsDownloading(true);
      const input = pdfRef.current;
      const canvas = await html2canvas(input, {
        scale: 2, // 2x resolution
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save(`${invoice.id}_Screenshot.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF snapshot", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleExportCsv = () => {
    const headers = [
      "Invoice ID",
      "POD ID",
      "Load ID",
      "Type",
      "Customer",
      "Email",
      "Contact",
      "Amount",
      "Due Date",
      "Status",
    ];
    const rows = invoiceData.map((inv) => [
      inv.id,
      inv.podId,
      inv.orderId,
      inv.type,
      `"${inv.customerName}"`,
      inv.customerEmail,
      `"${inv.customerContact}"`,
      inv.amount.toString(),
      inv.dueDate,
      inv.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoices_Export.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateInvoice = () => {
    if (!selectedPodId || !invoiceDate || !dueDate) {
      toast.error("Please fill in all required fields", {
        style: { background: "#1e293b", color: "#fff" },
      });
      return;
    }
    toast.success(`Invoice created for ${selectedPod?.orderId}`, {
      position: "bottom-right",
      style: {
        background: "linear-gradient(to right, #1e3a8a, #3b82f6)",
        color: "#ffffff",
        border: "0.0625rem solid #60a5fa",
        padding: "1rem",
        fontWeight: "bold",
      },
      iconTheme: {
        primary: "#fcd34d",
        secondary: "#1e3a8a",
      },
    });

    setIsDrawerOpen(false);
    setSelectedPodId("");
  };

  return (
    <div className={styles.container}>
      <Toaster />

      {}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h2>BILLING & INVOICES</h2>
          <p>Manage invoices, track payments, and handle customer billing</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary} onClick={handleExportCsv}>
            <Download size={16} /> Export Data
          </button>
          <button
            className={styles.btnPrimary}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Plus size={16} /> Create Invoice
          </button>
        </div>
      </div>

      {}
      <div className={styles.metricsBar}>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div className={styles.metricItem}>
            Total Outstanding:{" "}
            <span className={styles.metricValue}>
              {formatUSD(totalOutstanding)}
            </span>
          </div>
          <div className={styles.metricItem}>
            Paid:{" "}
            <span className={`${styles.metricBadge} ${styles.badgePaid}`}>
              {formatUSD(totalPaid)}
            </span>
          </div>
          <div className={styles.metricItem}>
            Pending:{" "}
            <span className={`${styles.metricBadge} ${styles.badgePending}`}>
              {formatUSD(totalPending)}
            </span>
          </div>
          <div className={styles.metricItem}>
            Overdue:{" "}
            <span className={`${styles.metricBadge} ${styles.badgeOverdue}`}>
              {formatUSD(totalOverdue)}
            </span>
          </div>
        </div>
      </div>

      {}
      <div className={styles.listContainer}>
        {}
        <div className={styles.listHeader}>
          <div className={styles.headerCell}>INVOICE #</div>
          <div className={styles.headerCell}>POD ID</div>
          <div className={styles.headerCell}>LOAD ID</div>
          <div className={styles.headerCell} style={{ textAlign: "center" }}>
            TYPE
          </div>
          <div className={styles.headerCell}>CUSTOMER</div>
          <div className={styles.headerCell}>AMOUNT</div>
          <div className={styles.headerCell}>DUE DATE</div>
          <div className={styles.headerCell}>STATUS</div>
          <div className={styles.headerCell} style={{ textAlign: "center" }}>
            ACTIONS
          </div>
        </div>

        {}
        {paginatedInvoices.length > 0 ? (
          paginatedInvoices.map((invoice) => (
            <div key={invoice.id} className={styles.listItem}>
              {}
              <div className={styles.cellContent}>
                <span className={styles.primaryText}>{invoice.id}</span>
              </div>

              {}
              <div className={styles.cellContent}>
                <span className={styles.primaryText}>{invoice.podId}</span>
              </div>

              {}
              <div className={styles.cellContent}>
                <span className={styles.primaryText}>{invoice.orderId}</span>
              </div>

              {}
              <div
                className={styles.cellContent}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                {invoice.type === "Truck" && (
                  <Truck size={20} className={styles.secondaryText} />
                )}
                {invoice.type === "Ship" && (
                  <Ship size={20} className={styles.secondaryText} />
                )}
                {invoice.type === "Flight" && (
                  <Plane size={20} className={styles.secondaryText} />
                )}
                {invoice.type === "Train" && (
                  <Train size={20} className={styles.secondaryText} />
                )}
              </div>

              {}
              <div className={styles.customerCell}>
                <div className={styles.cellContent}>
                  <span className={styles.primaryText}>
                    {invoice.customerName}
                  </span>
                  <span className={styles.secondaryText}>
                    {invoice.customerEmail}
                  </span>
                  <span className={styles.secondaryText}>
                    {invoice.customerContact}
                  </span>
                </div>
              </div>

              {}
              <div className={styles.cellContent}>
                <span className={styles.amountText}>
                  {formatUSD(invoice.amount)}
                </span>
              </div>

              {}
              <div className={styles.cellContent}>
                <span className={styles.primaryText}>{invoice.dueDate}</span>
                {}
                <span
                  className={
                    invoice.daysInfo?.includes("overdue")
                      ? styles.statusOverdueText
                      : invoice.daysInfo?.includes("on time")
                        ? styles.statusPaidText
                        : styles.secondaryText
                  }
                >
                  {invoice.daysInfo}
                </span>
              </div>

              {}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <span
                  className={`${styles.metricBadge} ${styles[`badge${invoice.status}`]}`}
                >
                  {invoice.status}
                </span>
              </div>

              {}
              <div className={styles.actionsCell}>
                <button
                  className={styles.actionBtn}
                  onClick={() => setPreviewInvoice(invoice)}
                >
                  <Eye size={18} />
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={() => handleDownload(invoice)}
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}
          >
            No invoices found.
          </div>
        )}

        {}
        {totalPages > 1 && (
          <div
            className="paginationContainer"
            style={{ borderTop: "0.0625rem solid #334155" }}
          >
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

      {}
      {previewInvoice && (
        <div
          className={styles.modalOverlay}
          onClick={() => setPreviewInvoice(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {}
            <div className={styles.modalHeader}>
              <h3>Invoice Preview</h3>
              <button
                className={styles.modalCloseBtn}
                onClick={() => setPreviewInvoice(null)}
              >
                <X size={20} />
              </button>
            </div>

            {}
            <div className={styles.modalBody}>
              <div
                ref={pdfRef}
                className={`${styles.invoiceTemplate} ${styles.printableArea}`}
                style={{ padding: "3rem" }} // ensure exact styles for screenshot
              >
                <div className={styles.invoiceHeader}>
                  <div className={styles.invoiceLogo}>
                    <h1>CARGO</h1>
                  </div>
                  <div className={styles.invoiceMeta}>
                    <h2>INVOICE {previewInvoice.id}</h2>
                    <p>Date: {previewInvoice.createdDate}</p>
                    <p>Due: {previewInvoice.dueDate}</p>
                    <p style={{ marginTop: "0.25rem" }}>
                      <strong>Transport:</strong> {previewInvoice.type}
                    </p>
                  </div>
                </div>

                <div className={styles.invoiceGrid}>
                  <div className={styles.invoiceCol}>
                    <h4>Billed To</h4>
                    <p>
                      <strong>{previewInvoice.customerName}</strong>
                      <br />
                      {previewInvoice.customerEmail}
                      <br />
                      {previewInvoice.customerContact}
                    </p>
                  </div>
                  <div className={styles.invoiceCol}>
                    <h4>From</h4>
                    <p>
                      <strong>Cargo Logistics Inc.</strong>
                      <br />
                      billing@cargo.com
                      <br />
                      123 Freight Ave.
                    </p>
                  </div>
                </div>

                <table className={styles.invoiceTable}>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Reference Load</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Standard Freight Delivery Services</td>
                      <td>{previewInvoice.orderId}</td>
                      <td>{formatUSD(previewInvoice.amount)}</td>
                    </tr>
                  </tbody>
                </table>

                <div className={styles.invoiceTotalRow}>
                  <span>Total Amount Due</span>
                  <span className={styles.bigAmount}>
                    {formatUSD(previewInvoice.amount)}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.btnSecondary}
                onClick={() => setPreviewInvoice(null)}
                disabled={isDownloading}
              >
                Close
              </button>
              <button
                className={styles.btnPrimary}
                onClick={() => handleDownload(previewInvoice)}
                disabled={isDownloading}
              >
                <Download size={16} />{" "}
                {isDownloading ? "Generating..." : "Download Screenshot"}
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {isDrawerOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className={styles.drawerContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <h3>Create New Invoice</h3>
              <button
                className={styles.modalCloseBtn}
                onClick={() => setIsDrawerOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.drawerBody}>
              {}
              <div
                className={styles.autoFetchBox}
                style={{
                  borderColor: "#4ade80",
                  background: "rgba(34, 197, 94, 0.05)",
                }}
              >
                <div className={styles.autoRow}>
                  <span style={{ color: "#4ade80" }}>
                    Next Invoice ID (Auto):
                  </span>
                  <strong style={{ fontSize: "1.1rem" }}>
                    {nextInvoiceId}
                  </strong>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Select Approved Load ID</label>
                <select
                  className={styles.drawerSelect}
                  value={selectedPodId}
                  onChange={(e) => setSelectedPodId(e.target.value)}
                >
                  <option value="">-- Choose an Approved Load --</option>
                  {approvedPODsWithoutInvoice.map((pod) => (
                    <option key={pod.id} value={pod.id}>
                      {pod.orderId} - {pod.customerName}
                    </option>
                  ))}
                </select>
              </div>

              {}
              {selectedPod && (
                <div className={styles.autoFetchBox}>
                  <div className={styles.autoRow}>
                    <span>Transport Type:</span>
                    <strong>{selectedPod.type}</strong>
                  </div>
                  <div className={styles.autoRow}>
                    <span>Customer:</span>
                    <strong>{selectedPod.customerName}</strong>
                  </div>
                  <div className={styles.autoRow}>
                    <span>Est. Amount:</span>
                    <strong>{formatUSD(1000)}</strong>
                  </div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label>Invoice Date</label>
                <DatePicker
                  selected={invoiceDate}
                  onChange={(date: Date | null) => setInvoiceDate(date)}
                  className={styles.drawerInput}
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Due Date</label>
                <DatePicker
                  selected={dueDate}
                  onChange={(date: Date | null) => setDueDate(date)}
                  className={styles.drawerInput}
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  className={styles.drawerSelect}
                  value={invoiceStatus}
                  onChange={(e) =>
                    setInvoiceStatus(e.target.value as InvoiceStatus)
                  }
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Additional Notes</label>
                <textarea
                  className={styles.drawerInput}
                  rows={3}
                  placeholder="Standard terms apply..."
                ></textarea>
              </div>
            </div>
            <div className={styles.drawerFooter}>
              <button
                className={styles.btnSecondary}
                onClick={() => setIsDrawerOpen(false)}
              >
                Cancel
              </button>
              <button
                className={styles.btnPrimary}
                onClick={handleCreateInvoice}
              >
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
