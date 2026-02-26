import styles from "./ContainerBlueprint.module.css";
import { Container } from "@/data/containers";

interface ContainerBlueprintProps {
  container: Container;
}

export function ContainerBlueprint({ container }: ContainerBlueprintProps) {
  const TOTAL_CAPACITY = 33.2;
  const usedSpace = container.volumeM3;
  const percentageFull = Math.min((usedSpace / TOTAL_CAPACITY) * 100, 100);
  const remainingSpace = Math.max(TOTAL_CAPACITY - usedSpace, 0);

  return (
    <div className={styles.wrapper}>
      {}
      <div className={styles.visualizerPanel}>
        <div className={styles.scene}>
          <div className={styles.cube}>
            {}
            <div className={`${styles.face} ${styles.front}`}></div>
            <div className={`${styles.face} ${styles.back}`}></div>
            <div className={`${styles.face} ${styles.right}`}></div>
            <div className={`${styles.face} ${styles.left}`}></div>
            <div className={`${styles.face} ${styles.top}`}></div>
            <div className={`${styles.face} ${styles.bottom}`}></div>

            {}
            <div
              className={styles.fillVolume}
              style={{ width: `${percentageFull}%` }}
            >
              <div className={`${styles.fillFace} ${styles.fillTop}`}></div>
              <div className={`${styles.fillFace} ${styles.fillFront}`}></div>
              <div className={`${styles.fillFace} ${styles.fillLeft}`}></div>
              <div className={`${styles.fillFace} ${styles.fillBack}`}></div>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className={styles.dataPanel}>
        <div className={styles.metricGroup}>
          <p className={styles.label}>Status</p>
          <p className={`${styles.value} ${styles.statusBadge}`}>
            {container.status}
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <p className={styles.statLabel}>Total Capacity</p>
            <p className={styles.statValue}>
              {TOTAL_CAPACITY.toFixed(1)}{" "}
              <span className={styles.unit}>m³</span>
            </p>
          </div>

          <div className={styles.statBox}>
            <p className={styles.statLabel}>Used Space</p>
            <p className={styles.statValue}>
              {usedSpace.toFixed(1)} <span className={styles.unit}>m³</span>
            </p>
          </div>

          <div className={styles.statBox}>
            <p className={styles.statLabel}>Remaining</p>
            <p className={`${styles.statValue} ${styles.remainingValue}`}>
              {remainingSpace.toFixed(1)}{" "}
              <span className={styles.unit}>m³</span>
            </p>
          </div>

          <div className={styles.statBox}>
            <p className={styles.statLabel}>Weight (Net)</p>
            <p className={styles.statValue}>
              {(container.weightKg / 1000).toFixed(2)}{" "}
              <span className={styles.unit}>Tonnes</span>
            </p>
          </div>
        </div>

        <div className={styles.progressBarWrapper}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Volume Utilization</span>
            <span className={styles.progressValue}>
              {percentageFull.toFixed(1)}%
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${percentageFull}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
