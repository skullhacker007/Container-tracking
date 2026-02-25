export type TransportSummary = {
  transportId: string;
  type: "Truck" | "Ship" | "Flight" | "Train";

  vehicleNumber?: string;
  carrierName?: string;
  captainOrDriver?: string;
  contactNumber?: string;

  departureDate: string;
  expectedArrival: string;

  from: string;
  to: string;

  totalContainers: number;
  totalSpace: number;
  usedSpace: number;
  emptySpace: number;

  status: "Live" | "Start" | "Idle" | "Reached";
};

export const transportSummaryData: TransportSummary[] = [
  // ======================
  // TRUCKS
  // ======================
  {
    transportId: "TRK-483921",
    type: "Truck",
    vehicleNumber: "AP09 AB 4839",
    carrierName: "Phoenix Logistics",
    captainOrDriver: "Ramesh Kumar",
    contactNumber: "+91 9876543210",
    departureDate: "2026-02-20T08:00:00Z",
    expectedArrival: "2026-02-25T18:00:00Z",
    from: "CHN",
    to: "MUM",
    totalContainers: 2,
    totalSpace: 120,
    usedSpace: 85,
    emptySpace: 35,
    status: "Live",
  },
  {
    transportId: "TRK-174205",
    type: "Truck",
    vehicleNumber: "TS07 CD 2205",
    carrierName: "Dot Phoenix Transport",
    captainOrDriver: "Suresh Naik",
    contactNumber: "+91 9123456780",
    departureDate: "2026-02-23T06:00:00Z",
    expectedArrival: "2026-02-24T15:00:00Z",
    from: "HYD",
    to: "BLR",
    totalContainers: 1,
    totalSpace: 100,
    usedSpace: 60,
    emptySpace: 40,
    status: "Start",
  },
  {
    transportId: "TRK-981023",
    type: "Truck",
    vehicleNumber: "KA01 EF 8920",
    carrierName: "Express Roadways",
    captainOrDriver: "Manish Reddy",
    contactNumber: "+91 9001122334",
    departureDate: "2026-02-18T05:00:00Z",
    expectedArrival: "2026-02-21T14:00:00Z",
    from: "BLR",
    to: "CHN",
    totalContainers: 2,
    totalSpace: 150,
    usedSpace: 150,
    emptySpace: 0,
    status: "Reached",
  },
  {
    transportId: "TRK-552190",
    type: "Truck",
    vehicleNumber: "MH12 GZ 1022",
    carrierName: "Western Carriers",
    captainOrDriver: "Santosh Patil",
    contactNumber: "+91 9988112233",
    departureDate: "2026-02-24T09:00:00Z",
    expectedArrival: "2026-02-26T20:00:00Z",
    from: "MUM",
    to: "PNQ",
    totalContainers: 2,
    totalSpace: 100,
    usedSpace: 45,
    emptySpace: 55,
    status: "Live",
  },

  // ======================
  // SHIPS
  // ======================
  {
    transportId: "SHP-309582",
    type: "Ship",
    carrierName: "Oceanic Freight",
    captainOrDriver: "Captain Arjun",
    contactNumber: "+971 501234567",
    departureDate: "2026-02-15T04:00:00Z",
    expectedArrival: "2026-03-02T09:00:00Z",
    from: "MUM",
    to: "DXB",
    totalContainers: 6,
    totalSpace: 32000,
    usedSpace: 24500,
    emptySpace: 7500,
    status: "Live",
  },
  {
    transportId: "SHP-781044",
    type: "Ship",
    carrierName: "BlueWave Marine",
    captainOrDriver: "Captain Ibrahim",
    contactNumber: "+971 556789012",
    departureDate: "2026-02-01T04:00:00Z",
    expectedArrival: "2026-02-18T09:00:00Z",
    from: "CHN",
    to: "SGP",
    totalContainers: 4,
    totalSpace: 35000,
    usedSpace: 35000,
    emptySpace: 0,
    status: "Reached",
  },
  {
    transportId: "SHP-112093",
    type: "Ship",
    carrierName: "Pacific Traders",
    captainOrDriver: "Captain Zhao",
    contactNumber: "+65 8123 4567",
    departureDate: "2026-02-20T10:00:00Z",
    expectedArrival: "2026-03-10T12:00:00Z",
    from: "SGP",
    to: "HKG",
    totalContainers: 5,
    totalSpace: 40000,
    usedSpace: 12000,
    emptySpace: 28000,
    status: "Live",
  },
  {
    transportId: "SHP-661240",
    type: "Ship",
    carrierName: "Atlantic Movers",
    captainOrDriver: "Captain Smith",
    contactNumber: "+44 7700 900123",
    departureDate: "2026-02-28T08:00:00Z",
    expectedArrival: "2026-03-25T14:00:00Z",
    from: "DXB",
    to: "LHR",
    totalContainers: 2,
    totalSpace: 20000,
    usedSpace: 5000,
    emptySpace: 15000,
    status: "Idle",
  },

  // ======================
  // FLIGHTS
  // ======================
  {
    transportId: "FLT-902134",
    type: "Flight",
    vehicleNumber: "AI-902",
    carrierName: "Air India Cargo",
    captainOrDriver: "Captain Verma",
    contactNumber: "+91 9988776655",
    departureDate: "2026-02-24T02:00:00Z",
    expectedArrival: "2026-02-24T09:00:00Z",
    from: "DEL",
    to: "SIN",
    totalContainers: 4,
    totalSpace: 3000,
    usedSpace: 2100,
    emptySpace: 900,
    status: "Live",
  },
  {
    transportId: "FLT-450817",
    type: "Flight",
    vehicleNumber: "AI-451",
    carrierName: "IndiGo Cargo",
    captainOrDriver: "Captain Joseph",
    contactNumber: "+91 9012345678",
    departureDate: "2026-02-25T02:00:00Z",
    expectedArrival: "2026-02-25T09:00:00Z",
    from: "BLR",
    to: "DXB",
    totalContainers: 3,
    totalSpace: 2800,
    usedSpace: 1500,
    emptySpace: 1300,
    status: "Start",
  },
  {
    transportId: "FLT-118230",
    type: "Flight",
    vehicleNumber: "EK-99",
    carrierName: "Emirates SkyCargo",
    captainOrDriver: "Captain Al-Maktoum",
    contactNumber: "+971 509876543",
    departureDate: "2026-02-20T01:00:00Z",
    expectedArrival: "2026-02-20T05:00:00Z",
    from: "DXB",
    to: "MUM",
    totalContainers: 6,
    totalSpace: 4500,
    usedSpace: 4500,
    emptySpace: 0,
    status: "Reached",
  },

  // ======================
  // TRAINS
  // ======================
  {
    transportId: "TRN-216759",
    type: "Train",
    vehicleNumber: "WR-216759",
    carrierName: "Indian Rail Cargo",
    captainOrDriver: "Lokesh Sharma",
    contactNumber: "+91 9090909090",
    departureDate: "2026-02-22T07:00:00Z",
    expectedArrival: "2026-02-26T18:00:00Z",
    from: "CCU",
    to: "CHN",
    totalContainers: 4,
    totalSpace: 2200,
    usedSpace: 1450,
    emptySpace: 750,
    status: "Live",
  },
  {
    transportId: "TRN-554321",
    type: "Train",
    vehicleNumber: "SR-554321",
    carrierName: "South Rail Freight",
    captainOrDriver: "Pradeep Singh",
    contactNumber: "+91 9786543210",
    departureDate: "2026-02-21T06:00:00Z",
    expectedArrival: "2026-02-27T12:00:00Z",
    from: "MUM",
    to: "DEL",
    totalContainers: 5,
    totalSpace: 3000,
    usedSpace: 1800,
    emptySpace: 1200,
    status: "Idle",
  },
  {
    transportId: "TRN-901824",
    type: "Train",
    vehicleNumber: "NR-901824",
    carrierName: "Northern Rail Express",
    captainOrDriver: "Harit Kumar",
    contactNumber: "+91 9005001000",
    departureDate: "2026-02-19T05:00:00Z",
    expectedArrival: "2026-02-21T02:00:00Z",
    from: "DEL",
    to: "CCU",
    totalContainers: 6,
    totalSpace: 3500,
    usedSpace: 3400,
    emptySpace: 100,
    status: "Reached",
  },
];

// ======================
// NEW ANALYTICS DATA
// ======================

export type TrendDataPoint = {
  day: string;
  shipments: number;
  revenue: number;
};

// Represents 14 days of historical trend data
export const shipmentTrendData: TrendDataPoint[] = [
  { day: "Feb 12", shipments: 120, revenue: 45000 },
  { day: "Feb 13", shipments: 135, revenue: 52000 },
  { day: "Feb 14", shipments: 125, revenue: 48000 },
  { day: "Feb 15", shipments: 150, revenue: 61000 },
  { day: "Feb 16", shipments: 180, revenue: 75000 },
  { day: "Feb 17", shipments: 175, revenue: 72000 },
  { day: "Feb 18", shipments: 190, revenue: 81000 },
  { day: "Feb 19", shipments: 210, revenue: 89000 },
  { day: "Feb 20", shipments: 205, revenue: 86000 },
  { day: "Feb 21", shipments: 230, revenue: 95000 },
  { day: "Feb 22", shipments: 250, revenue: 105000 },
  { day: "Feb 23", shipments: 240, revenue: 99000 },
  { day: "Feb 24", shipments: 265, revenue: 112000 },
  { day: "Feb 25", shipments: 290, revenue: 125000 },
];

// ======================
// ORDERS DATA
// ======================

export type OrderStatus = "ACTIVE" | "CLOSED" | "UPCOMING" | "CANCELLED";

export interface Order {
  id: string;
  customerName: string;
  date: string; // ISO or YYYY-MM-DD
  amount: number;
  destination: string;
  status: OrderStatus;
  items: number;
}

export const ordersData: Order[] = [
  // ACTIVE
  { id: "ORD-9001", customerName: "Global Tech Supplies", date: "2026-02-28", amount: 14500.0, destination: "Shanghai, CHN", status: "ACTIVE", items: 450 },
  { id: "ORD-9002", customerName: "Apex Manufacturing", date: "2026-02-27", amount: 8250.5, destination: "Rotterdam, NLD", status: "ACTIVE", items: 120 },
  { id: "ORD-9003", customerName: "Nexus Electronics", date: "2026-02-26", amount: 32400.0, destination: "Los Angeles, USA", status: "ACTIVE", items: 890 },
  { id: "ORD-9004", customerName: "Nova Energy", date: "2026-02-25", amount: 42100.5, destination: "Houston, USA", status: "ACTIVE", items: 950 },
  { id: "ORD-9005", customerName: "Quantum Devices", date: "2026-02-25", amount: 27600.0, destination: "Tokyo, JPN", status: "ACTIVE", items: 640 },
  { id: "ORD-9006", customerName: "Blue Ocean Traders", date: "2026-02-24", amount: 18500.0, destination: "Hamburg, DEU", status: "ACTIVE", items: 300 },
  { id: "ORD-9007", customerName: "Silver Logistics", date: "2026-02-23", amount: 9400.0, destination: "Singapore, SGP", status: "ACTIVE", items: 150 },
  { id: "ORD-9008", customerName: "Dynamic Freight", date: "2026-02-22", amount: 56000.0, destination: "Dubai, ARE", status: "ACTIVE", items: 1100 },
  { id: "ORD-9009", customerName: "Horizon Retail", date: "2026-02-21", amount: 3100.0, destination: "Sydney, AUS", status: "ACTIVE", items: 45 },
  { id: "ORD-9010", customerName: "Pacific Imports", date: "2026-02-20", amount: 22000.0, destination: "London, GBR", status: "ACTIVE", items: 500 },
  { id: "ORD-9011", customerName: "Bright Future Co.", date: "2026-02-20", amount: 12500.0, destination: "New York, USA", status: "ACTIVE", items: 230 },

  // CLOSED
  { id: "ORD-8001", customerName: "Meridian Foods", date: "2026-02-15", amount: 1250.25, destination: "Sydney, AUS", status: "CLOSED", items: 80 },
  { id: "ORD-8002", customerName: "Vanguard Motors", date: "2026-02-14", amount: 105000.0, destination: "Antwerp, BEL", status: "CLOSED", items: 2050 },
  { id: "ORD-8003", customerName: "Alpha Industries", date: "2026-02-13", amount: 8900.0, destination: "Mumbai, IND", status: "CLOSED", items: 190 },
  { id: "ORD-8004", customerName: "Beta Solutions", date: "2026-02-12", amount: 45000.0, destination: "Shanghai, CHN", status: "CLOSED", items: 800 },
  { id: "ORD-8005", customerName: "Gamma Holdings", date: "2026-02-11", amount: 32000.0, destination: "Rotterdam, NLD", status: "CLOSED", items: 600 },
  { id: "ORD-8006", customerName: "Delta Corp", date: "2026-02-10", amount: 15000.0, destination: "Los Angeles, USA", status: "CLOSED", items: 300 },
  { id: "ORD-8007", customerName: "Epsilon Ventures", date: "2026-02-09", amount: 21000.0, destination: "Houston, USA", status: "CLOSED", items: 450 },
  { id: "ORD-8008", customerName: "Zeta Enterprises", date: "2026-02-08", amount: 11000.0, destination: "Tokyo, JPN", status: "CLOSED", items: 200 },
  { id: "ORD-8009", customerName: "Eta Group", date: "2026-02-07", amount: 18000.0, destination: "Hamburg, DEU", status: "CLOSED", items: 350 },
  { id: "ORD-8010", customerName: "Theta Logistics", date: "2026-02-06", amount: 27000.0, destination: "Singapore, SGP", status: "CLOSED", items: 550 },
  { id: "ORD-8011", customerName: "Apex Manufacturing", date: "2026-02-05", amount: 31000.0, destination: "Rotterdam, NLD", status: "CLOSED", items: 400 },
  { id: "ORD-8012", customerName: "Nexus Electronics", date: "2026-02-04", amount: 42000.0, destination: "Los Angeles, USA", status: "CLOSED", items: 800 },
  { id: "ORD-8013", customerName: "Horizon Retail", date: "2026-02-03", amount: 12000.0, destination: "Sydney, AUS", status: "CLOSED", items: 250 },
  { id: "ORD-8014", customerName: "Pacific Imports", date: "2026-02-02", amount: 56000.0, destination: "London, GBR", status: "CLOSED", items: 1100 },
  { id: "ORD-8015", customerName: "Meridian Foods", date: "2026-02-01", amount: 8900.0, destination: "Sydney, AUS", status: "CLOSED", items: 120 },
  { id: "ORD-8016", customerName: "Quantum Devices", date: "2026-01-30", amount: 67000.0, destination: "Tokyo, JPN", status: "CLOSED", items: 1500 },
  { id: "ORD-8017", customerName: "Global Tech Supplies", date: "2026-01-28", amount: 23000.0, destination: "Shanghai, CHN", status: "CLOSED", items: 450 },
  { id: "ORD-8018", customerName: "Silver Logistics", date: "2026-01-25", amount: 14500.0, destination: "Singapore, SGP", status: "CLOSED", items: 300 },
  { id: "ORD-8019", customerName: "Blue Ocean Traders", date: "2026-01-22", amount: 39000.0, destination: "Hamburg, DEU", status: "CLOSED", items: 650 },
  { id: "ORD-8020", customerName: "Bright Future Co.", date: "2026-01-20", amount: 21000.0, destination: "New York, USA", status: "CLOSED", items: 400 },
  { id: "ORD-8021", customerName: "Vanguard Motors", date: "2026-01-18", amount: 88000.0, destination: "Antwerp, BEL", status: "CLOSED", items: 1700 },
  { id: "ORD-8022", customerName: "Dynamic Freight", date: "2026-01-15", amount: 45000.0, destination: "Dubai, ARE", status: "CLOSED", items: 900 },
  { id: "ORD-8023", customerName: "Nova Energy", date: "2026-01-12", amount: 62000.0, destination: "Houston, USA", status: "CLOSED", items: 1200 },
  { id: "ORD-8024", customerName: "Alpha Industries", date: "2026-01-10", amount: 17500.0, destination: "Mumbai, IND", status: "CLOSED", items: 350 },

  // UPCOMING
  { id: "ORD-7001", customerName: "Pioneer Logistics", date: "2026-03-01", amount: 19800.75, destination: "Hamburg, DEU", status: "UPCOMING", items: 310 },
  { id: "ORD-7002", customerName: "Zenith Pharmaceuticals", date: "2026-03-02", amount: 55000.0, destination: "Dubai, ARE", status: "UPCOMING", items: 1200 },
  { id: "ORD-7003", customerName: "Stellar Imports", date: "2026-03-03", amount: 8900.0, destination: "London, GBR", status: "UPCOMING", items: 215 },
  { id: "ORD-7004", customerName: "Omega Shipping", date: "2026-03-04", amount: 42000.0, destination: "New York, USA", status: "UPCOMING", items: 900 },
  { id: "ORD-7005", customerName: "Sigma Trading", date: "2026-03-05", amount: 28000.0, destination: "Sydney, AUS", status: "UPCOMING", items: 600 },
  { id: "ORD-7006", customerName: "Kappa Corp", date: "2026-03-06", amount: 16000.0, destination: "Antwerp, BEL", status: "UPCOMING", items: 350 },
  { id: "ORD-7007", customerName: "Lambda Inc", date: "2026-03-07", amount: 33000.0, destination: "Mumbai, IND", status: "UPCOMING", items: 700 },
  { id: "ORD-7008", customerName: "Mu Exports", date: "2026-03-08", amount: 14000.0, destination: "Shanghai, CHN", status: "UPCOMING", items: 250 },
  { id: "ORD-7009", customerName: "Nu Logistics", date: "2026-03-09", amount: 25000.0, destination: "Rotterdam, NLD", status: "UPCOMING", items: 500 },
  { id: "ORD-7010", customerName: "Xi Solutions", date: "2026-03-10", amount: 38000.0, destination: "Los Angeles, USA", status: "UPCOMING", items: 850 },

  // CANCELLED
  { id: "ORD-6001", customerName: "Summit Apparel", date: "2026-02-25", amount: 3400.0, destination: "Mumbai, IND", status: "CANCELLED", items: 400 },
  { id: "ORD-6002", customerName: "Horizon Retail", date: "2026-02-20", amount: 4100.0, destination: "Singapore, SGP", status: "CANCELLED", items: 55 },
  { id: "ORD-6003", customerName: "Omicron Group", date: "2026-02-18", amount: 15000.0, destination: "Houston, USA", status: "CANCELLED", items: 300 },
  { id: "ORD-6004", customerName: "Pi Ventures", date: "2026-02-15", amount: 22000.0, destination: "Tokyo, JPN", status: "CANCELLED", items: 450 },
  { id: "ORD-6005", customerName: "Rho Holdings", date: "2026-02-10", amount: 9000.0, destination: "Hamburg, DEU", status: "CANCELLED", items: 150 },
  { id: "ORD-6006", customerName: "Sigma Corp", date: "2026-02-05", amount: 31000.0, destination: "Dubai, ARE", status: "CANCELLED", items: 650 },
  { id: "ORD-6007", customerName: "Tau Logistics", date: "2026-02-01", amount: 12000.0, destination: "London, GBR", status: "CANCELLED", items: 200 },
  { id: "ORD-6008", customerName: "Upsilon Trading", date: "2026-01-25", amount: 26000.0, destination: "New York, USA", status: "CANCELLED", items: 500 },
  { id: "ORD-6009", customerName: "Phi Exports", date: "2026-01-20", amount: 19000.0, destination: "Sydney, AUS", status: "CANCELLED", items: 350 },
  { id: "ORD-6010", customerName: "Chi Solutions", date: "2026-01-15", amount: 40000.0, destination: "Antwerp, BEL", status: "CANCELLED", items: 800 },
];

// ======================
// PROOF OF DELIVERY (POD) DATA
// ======================

export type PODStatus = "VERIFICATION" | "APPROVED" | "CANCELED" | "HOLD" | "CALL_BACK";

export interface POD {
  id: string;
  orderId: string;
  transportId: string; // New: linking back to vehicle
  containerId: string; // New: specifying cargo container
  customerName: string;
  deliveryDate: string;
  location: string;
  receiverName: string;
  receiverContact: string;
  driverName: string;
  type: "Truck" | "Ship" | "Flight" | "Train";
  status: PODStatus;
  notes?: string;
}

export const podData: POD[] = [
  // --- TRK-981023 (Truck) - 2 Containers ---
  { id: "POD-1001", orderId: "ORD-8001", transportId: "TRK-981023", containerId: "CONT-8920-A", customerName: "Meridian Foods", deliveryDate: "2026-02-21", location: "Sydney, AUS", receiverName: "Sarah Jones", receiverContact: "+61 412-345-679", driverName: "Manish Reddy", type: "Truck", status: "VERIFICATION", notes: "Delivered safely" },
  { id: "POD-1002", orderId: "ORD-8001", transportId: "TRK-981023", containerId: "CONT-8920-B", customerName: "Meridian Foods", deliveryDate: "2026-02-21", location: "Sydney, AUS", receiverName: "Sarah Jones", receiverContact: "+61 412-345-679", driverName: "Manish Reddy", type: "Truck", status: "VERIFICATION" },

  // --- SHP-781044 (Ship) - 4 Containers ---
  { id: "POD-1003", orderId: "ORD-8002", transportId: "SHP-781044", containerId: "CONT-1044-1", customerName: "Vanguard Motors", deliveryDate: "2026-02-18", location: "Antwerp, BEL", receiverName: "Pieter Maes", receiverContact: "+32 470-12-34-56", driverName: "Captain Ibrahim", type: "Ship", status: "VERIFICATION", notes: "Signed by security" },
  { id: "POD-1004", orderId: "ORD-8002", transportId: "SHP-781044", containerId: "CONT-1044-2", customerName: "Vanguard Motors", deliveryDate: "2026-02-18", location: "Antwerp, BEL", receiverName: "Pieter Maes", receiverContact: "+32 470-12-34-56", driverName: "Captain Ibrahim", type: "Ship", status: "VERIFICATION" },
  { id: "POD-1005", orderId: "ORD-8002", transportId: "SHP-781044", containerId: "CONT-1044-3", customerName: "Vanguard Motors", deliveryDate: "2026-02-18", location: "Antwerp, BEL", receiverName: "Pieter Maes", receiverContact: "+32 470-12-34-56", driverName: "Captain Ibrahim", type: "Ship", status: "VERIFICATION" },
  { id: "POD-1006", orderId: "ORD-8002", transportId: "SHP-781044", containerId: "CONT-1044-4", customerName: "Vanguard Motors", deliveryDate: "2026-02-18", location: "Antwerp, BEL", receiverName: "Pieter Maes", receiverContact: "+32 470-12-34-56", driverName: "Captain Ibrahim", type: "Ship", status: "VERIFICATION" },

  // --- FLT-118230 (Flight) - 6 Containers ---
  { id: "POD-1007", orderId: "ORD-9001", transportId: "FLT-118230", containerId: "CONT-8230-01", customerName: "Global Tech Supplies", deliveryDate: "2026-02-20", location: "Mumbai, IND", receiverName: "John Smith", receiverContact: "+91 99887-76655", driverName: "Captain Al-Maktoum", type: "Flight", status: "VERIFICATION" },
  { id: "POD-1008", orderId: "ORD-9001", transportId: "FLT-118230", containerId: "CONT-8230-02", customerName: "Global Tech Supplies", deliveryDate: "2026-02-20", location: "Mumbai, IND", receiverName: "John Smith", receiverContact: "+91 99887-76655", driverName: "Captain Al-Maktoum", type: "Flight", status: "VERIFICATION" },
  { id: "POD-1009", orderId: "ORD-9001", transportId: "FLT-118230", containerId: "CONT-8230-03", customerName: "Global Tech Supplies", deliveryDate: "2026-02-20", location: "Mumbai, IND", receiverName: "John Smith", receiverContact: "+91 99887-76655", driverName: "Captain Al-Maktoum", type: "Flight", status: "VERIFICATION" },
  { id: "POD-1010", orderId: "ORD-9001", transportId: "FLT-118230", containerId: "CONT-8230-04", customerName: "Global Tech Supplies", deliveryDate: "2026-02-20", location: "Mumbai, IND", receiverName: "John Smith", receiverContact: "+91 99887-76655", driverName: "Captain Al-Maktoum", type: "Flight", status: "VERIFICATION" },
  { id: "POD-1011", orderId: "ORD-9001", transportId: "FLT-118230", containerId: "CONT-8230-05", customerName: "Global Tech Supplies", deliveryDate: "2026-02-20", location: "Mumbai, IND", receiverName: "John Smith", receiverContact: "+91 99887-76655", driverName: "Captain Al-Maktoum", type: "Flight", status: "VERIFICATION" },
  { id: "POD-1012", orderId: "ORD-9001", transportId: "FLT-118230", containerId: "CONT-8230-06", customerName: "Global Tech Supplies", deliveryDate: "2026-02-20", location: "Mumbai, IND", receiverName: "John Smith", receiverContact: "+91 99887-76655", driverName: "Captain Al-Maktoum", type: "Flight", status: "VERIFICATION" },

  // --- TRN-901824 (Train) - 6 Containers ---
  { id: "POD-1013", orderId: "ORD-9002", transportId: "TRN-901824", containerId: "CONT-1824-A", customerName: "Apex Manufacturing", deliveryDate: "2026-02-21", location: "Kolkata, IND", receiverName: "Amit Kumar", receiverContact: "+91 90050-01000", driverName: "Harit Kumar", type: "Train", status: "VERIFICATION" },
  { id: "POD-1014", orderId: "ORD-9002", transportId: "TRN-901824", containerId: "CONT-1824-B", customerName: "Apex Manufacturing", deliveryDate: "2026-02-21", location: "Kolkata, IND", receiverName: "Amit Kumar", receiverContact: "+91 90050-01000", driverName: "Harit Kumar", type: "Train", status: "VERIFICATION" },
  { id: "POD-1015", orderId: "ORD-9002", transportId: "TRN-901824", containerId: "CONT-1824-C", customerName: "Apex Manufacturing", deliveryDate: "2026-02-21", location: "Kolkata, IND", receiverName: "Amit Kumar", receiverContact: "+91 90050-01000", driverName: "Harit Kumar", type: "Train", status: "VERIFICATION" },
  { id: "POD-1016", orderId: "ORD-9002", transportId: "TRN-901824", containerId: "CONT-1824-D", customerName: "Apex Manufacturing", deliveryDate: "2026-02-21", location: "Kolkata, IND", receiverName: "Amit Kumar", receiverContact: "+91 90050-01000", driverName: "Harit Kumar", type: "Train", status: "VERIFICATION" },
  { id: "POD-1017", orderId: "ORD-9002", transportId: "TRN-901824", containerId: "CONT-1824-E", customerName: "Apex Manufacturing", deliveryDate: "2026-02-21", location: "Kolkata, IND", receiverName: "Amit Kumar", receiverContact: "+91 90050-01000", driverName: "Harit Kumar", type: "Train", status: "VERIFICATION" },
  { id: "POD-1018", orderId: "ORD-9002", transportId: "TRN-901824", containerId: "CONT-1824-F", customerName: "Apex Manufacturing", deliveryDate: "2026-02-21", location: "Kolkata, IND", receiverName: "Amit Kumar", receiverContact: "+91 90050-01000", driverName: "Harit Kumar", type: "Train", status: "VERIFICATION" },
];

// ======================
// INVOICE DATA
// ======================
// Fulfills the requirement: "only approved data will provide invoice"

export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export interface Invoice {
  id: string; // E.g., INV-2024-001
  podId: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerContact: string;
  amount: number;
  createdDate: string;
  dueDate: string;
  status: InvoiceStatus;
  type: "Truck" | "Ship" | "Flight" | "Train";
  daysInfo?: string; // E.g., "15 days remaining", "Net 30"
}

// Helper to determine status based on due date (mock logic)
const getMockInvoiceStatus = (index: number): { status: InvoiceStatus; daysInfo: string } => {
  if (index % 3 === 0) return { status: "Paid", daysInfo: "Paid on time" };
  if (index % 3 === 1) return { status: "Overdue", daysInfo: "45 days overdue" };
  return { status: "Pending", daysInfo: "15 days remaining" };
};

// Generate invoices ONLY from APPROVED PODs
export const invoiceData: Invoice[] = podData
  .filter((pod) => pod.status === "APPROVED")
  .map((pod, index) => {
    // Generate a determinisic mock amount based on orderId length and characters
    const mockAmount = 1000;
    const { status, daysInfo } = getMockInvoiceStatus(index);
    
    // Create email from customer name (e.g. "Meridian Foods" -> "billing@meridianfoods.com")
    const emailPrefix = pod.customerName.split(" ")[0].toLowerCase();
    const customerEmail = `billing@${emailPrefix}.com`;

    return {
      id: `INV-2026-00${index + 1}`,
      podId: pod.id,
      orderId: pod.orderId,
      customerName: pod.customerName,
      customerEmail,
      customerContact: pod.receiverContact,
      amount: mockAmount,
      createdDate: pod.deliveryDate, // using delivery date as creation date for mock
      dueDate: "2026-03-15", // fixed mock future date
      status,
      type: pod.type,
      daysInfo,
    };
  });
