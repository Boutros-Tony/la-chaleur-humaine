import { arts } from "@/data/arts.js";
import ArtCard from "@/components/ArtCard/ArtCard.jsx";
import styles from "./page.module.scss";

export const metadata = {
  title: "Art – La Chaleur Humaine",
  description: "Toutes les œuvres – La Chaleur Humaine",
};

export default function ArtPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Art</h1>
      <div className={styles.grid}>
        {arts.map((art) => (
          <ArtCard
            key={art.slug}
            slug={art.slug}
            title={art.title}
            image={art.image}
          />
        ))}
      </div>
    </div>
  );
}
