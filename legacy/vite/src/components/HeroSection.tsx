import React from "react";
import styles from "./HeroSection.module.css";

type Props = {
  onDistributorClick: () => void;
  onContractorClick: () => void;
  onProjectClick: () => void;
  onInvestorClick: () => void;
  isDark?: boolean;
};

export default function HeroSection({
  onDistributorClick,
  onContractorClick,
  onProjectClick,
  onInvestorClick,
  isDark = false,
}: Props) {
  const rootClass = isDark ? `${styles.hero} ${styles["hero--dark"]}` : styles.hero;

  return (
    <section className={rootClass} aria-label="Landing hero section">
      <div className={styles["hero__glow"]} aria-hidden="true" />
      <div className={styles["hero__container"]}>
        <div className={styles["hero__content"]}>
          <h1 className={styles["hero__headline"]}>
            Manufacturing Scale. Building Northern India's Future.
          </h1>

          <h2 className={styles["hero__subheadline"]}>
            Structural Steel & TMT Bars. ₹18Cr → ₹1000Cr Growth.
          </h2>

          <div className={styles["hero__cta-grid"]} role="group" aria-label="Primary actions">
            <button
              className={`${styles.btn} ${styles["btn--distributor"]}`}
              onClick={onDistributorClick}
              type="button"
              aria-label="I'm a Distributor"
            >
              I'm a Distributor
            </button>

            <button
              className={`${styles.btn} ${styles["btn--contractor"]}`}
              onClick={onContractorClick}
              type="button"
              aria-label="I'm a Contractor or Fabricator"
            >
              I'm a Contractor / Fabricator
            </button>

            <button
              className={`${styles.btn} ${styles["btn--project"]}`}
              onClick={onProjectClick}
              type="button"
              aria-label="I'm a Large Project"
            >
              I'm a Large Project
            </button>

            <button
              className={`${styles.btn} ${styles["btn--investor"]}`}
              onClick={onInvestorClick}
              type="button"
              aria-label="Explore Our Growth"
            >
              Explore Our Growth
            </button>
          </div>

          <p className={styles["hero__trust"]} aria-hidden={false}>
            <strong className={styles["hero__trust-highlight"]}>₹203 Cr Revenue.</strong>{" "}
            180,000 MT Capacity. Northern India's Trusted Partner.
          </p>
        </div>
      </div>
    </section>
  );
}
