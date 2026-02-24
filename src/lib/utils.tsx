import { TransportSummary } from "@/data/dummyData";
import { Truck, Ship, Plane, Train } from "lucide-react";

export function getUtilization(item: TransportSummary) {
  if (!item.totalSpace) return "0%";

  const percentage = Math.round((item.usedSpace / item.totalSpace) * 100);
  return `${percentage}%`;
}

export function getTypeIcon(type: TransportSummary["type"] | string) {
  switch (type) {
    case "Truck":
      return <Truck size={18} />;
    case "Ship":
      return <Ship size={18} />;
    case "Flight":
      return <Plane size={18} />;
    case "Train":
      return <Train size={18} />;
    default:
      return null;
  }
}

export function getStatusClass(status: TransportSummary["status"] | string) {
  switch (status) {
    case "Idle":
      return "IDLE";
    case "Start":
      return "STARTING";
    case "Live":
      return "IN_TRANSIT";
    case "Reached":
      return "REACHED";
    default:
      return "";
  }
}
