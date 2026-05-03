import { Link } from "react-router-dom";
import { useRecords } from "../context/RecordsContext";
import styles from "./LandingPage.module.css";

const FEATURES = [
  {
    icon: "📅",
    title: "Track by Date",
    description:
      "Filter your meals by any date with a precise UTC-safe date picker — no timezone surprises.",
  },
  {
    icon: "🥗",
    title: "Meal Categories",
    description:
      "Organize entries as Breakfast, Lunch, Dinner, or Snack with colour-coded pills.",
  },
  {
    icon: "🏃",
    title: "Sport Support",
    description:
      "Log exercise as negative calories — the daily total reflects true net intake.",
  },
  {
    icon: "💾",
    title: "Persisted Data",
    description:
      "Records survive page refresh via localStorage — no account required.",
  },
];

export function LandingPage() {
  const { records } = useRecords();

  const totalEntries = records.length;
  const uniqueDays = new Set(
    records.map((r) => r.date.toISOString().split("T")[0])
  ).size;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroIcon}>🥗</div>
        <h1 className={styles.heroTitle}>Calorie Tracker</h1>
        <p className={styles.heroSub}>
          A clean, distraction-free way to log your meals, monitor daily intake,
          and stay on top of your nutrition goals.
        </p>
        <Link to="/track" className={styles.cta}>
          Start Tracking →
        </Link>
      </section>

      {totalEntries > 0 && (
        <section className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{totalEntries}</span>
            <span className={styles.statLabel}>Total entries</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{uniqueDays}</span>
            <span className={styles.statLabel}>Days tracked</span>
          </div>
        </section>
      )}

      <section className={styles.features}>
        {FEATURES.map((f) => (
          <div key={f.title} className={styles.featureCard}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
