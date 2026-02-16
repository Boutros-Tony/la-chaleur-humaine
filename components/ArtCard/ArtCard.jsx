import Link from "next/link";
import Image from "next/image";
import styles from "./ArtCard.module.scss";

export default function ArtCard({ slug, title, image }) {
  return (
    <Link href={`/art/${slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
}
