import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { arts } from "@/data/arts.js";
import styles from "./page.module.scss";

export async function generateStaticParams() {
  return arts.map((art) => ({ slug: art.slug }));
}

function getArtBySlug(slug) {
  return arts.find((a) => a.slug === slug) ?? null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const art = getArtBySlug(slug);
  if (!art) return { title: "Œuvre – La Chaleur Humaine" };
  return {
    title: `${art.title} – La Chaleur Humaine`,
    description: art.description,
  };
}

export default async function ArtSlugPage({ params }) {
  const { slug } = await params;
  const art = getArtBySlug(slug);
  if (!art) notFound();

  return (
    <div className={styles.page}>
      <Link href="/art" className={styles.back}>
        ← Retour aux œuvres
      </Link>
      <article className={styles.article}>
        <div className={styles.imageWrap}>
          <Image
            src={art.image}
            alt={art.title}
            fill
            sizes="100vw"
            priority
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>{art.title}</h1>
          <p className={styles.description}>{art.description}</p>
        </div>
      </article>
    </div>
  );
}
