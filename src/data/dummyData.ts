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
  // TRUCKS (3)
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

  // ======================
  // SHIPS (2)
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

  // ======================
  // FLIGHTS (2)
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

  // ======================
  // TRAINS (2)
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
];
