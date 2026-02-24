import { transportSummaryData } from "./dummyData";

export type ContainerStatus = "Loaded" | "Empty" | "InTransit" | "Available";

export interface Container {
  containerId: string;
  transportId: string | null;
  status: ContainerStatus;
  origin: string;
  destination: string;
  weightKg: number;
  volumeM3: number;
  assignedDate: string | null;
}

const TRANSPORT_IDS = transportSummaryData.map((t) => t.transportId);
const LOCATIONS = Array.from(
  new Set(transportSummaryData.flatMap((t) => [t.from, t.to])),
);

function pad6(n: number) {
  return String(n).padStart(6, "0");
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniqueContainerId(existing: Set<string>) {
  let id: string;
  do {
    id = `CNT-${pad6(randomInt(100000, 999999))}`;
  } while (existing.has(id));
  existing.add(id);
  return id;
}

export function generateContainers(
  count = 200,
  assignEvenly = true,
): Container[] {
  const results: Container[] = [];
  const seen = new Set<string>();
  const transportCount = TRANSPORT_IDS.length || 1;

  for (let i = 0; i < count; i++) {
    const containerId = uniqueContainerId(seen);

    // assign transport evenly across available transports
    const transportId = assignEvenly
      ? TRANSPORT_IDS[i % transportCount]
      : TRANSPORT_IDS[randomInt(0, transportCount - 1)];

    const origin = LOCATIONS[randomInt(0, LOCATIONS.length - 1)];
    let destination = LOCATIONS[randomInt(0, LOCATIONS.length - 1)];
    if (destination === origin) {
      destination =
        LOCATIONS[(LOCATIONS.indexOf(origin) + 1) % LOCATIONS.length];
    }

    const statusPool: ContainerStatus[] = [
      "Loaded",
      "InTransit",
      "Empty",
      "Available",
    ];
    const status = statusPool[randomInt(0, statusPool.length - 1)];

    const weightKg = randomInt(100, 30000);
    const volumeM3 = parseFloat((weightKg / 1000).toFixed(2));

    // some containers may not have an assigned date
    const assignedDate =
      Math.random() > 0.2
        ? new Date(Date.now() - randomInt(0, 14) * 86400000).toISOString()
        : null;

    results.push({
      containerId,
      transportId,
      status,
      origin,
      destination,
      weightKg,
      volumeM3,
      assignedDate,
    });
  }

  return results;
}

export const containersData = generateContainers(200, true);

export default containersData;
