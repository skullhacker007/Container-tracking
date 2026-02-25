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
    totalContainers: 3,
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
    totalContainers: 850,
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
    totalContainers: 920,
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
    totalContainers: 1100,
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
    totalContainers: 500,
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
    totalContainers: 14,
    totalSpace: 300,
    usedSpace: 210,
    emptySpace: 90,
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
    totalContainers: 10,
    totalSpace: 280,
    usedSpace: 150,
    emptySpace: 130,
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
    totalContainers: 22,
    totalSpace: 450,
    usedSpace: 450,
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
    totalContainers: 32,
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
    totalContainers: 40,
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
    totalContainers: 50,
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
