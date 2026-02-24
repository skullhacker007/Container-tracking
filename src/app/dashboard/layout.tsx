import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import styles from "./layout.module.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentArea}>
        <Topbar />
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
}
