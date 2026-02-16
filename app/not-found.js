import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Cette page n’existe pas.</p>
      <Link href="/" className={styles.link}>
        Retour à l’accueil
      </Link>
    </div>
  );
}
