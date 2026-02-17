"use client";

import { useState } from "react";
import { arts } from "@/data/arts.js";
import ArtCard from "@/components/ArtCard/ArtCard.jsx";
import Container from "@/components/Container/Container.jsx";
import styles from "./page.module.scss";

const FILTERS = [
  { id: "all", label: "All work" },
  { id: "painting", label: "Paintings" },
  { id: "textile", label: "Textiles" },
];

function uniqueBySlug(items) {
  const seen = new Set();
  return items.filter((art) => {
    if (seen.has(art.slug)) return false;
    seen.add(art.slug);
    return true;
  });
}

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function ArtPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredArts = uniqueBySlug(
    activeFilter === "all"
      ? arts
      : arts.filter((art) => (art.category || "").toLowerCase() === activeFilter)
  );

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="art-page-title">
        <div className={styles.heroOverlay} />
        <Container variant="content" className={styles.heroContainer}>
          <h1 id="art-page-title" className={`section-heading ${styles.heroTitle}`}>
            The Art
          </h1>
        </Container>
        <div className={styles.filtersWrap}>
          <div className={styles.filters} role="tablist" aria-label="Filter artworks">
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={activeFilter === id}
                className={activeFilter === id ? `${styles.filterBtn} ${styles.filterBtnActive}` : styles.filterBtn}
                onClick={() => setActiveFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <Container variant="content" className={styles.contentContainer}>
          <p className="body-copy">{LOREM}</p>
          <div className={styles.grid}>
            {filteredArts.map((art) => (
              <ArtCard key={art.slug} slug={art.slug} title={art.title} image={art.image} />
            ))}
          </div>
          <div className={styles.loadMoreWrap}>
            <button type="button" className={styles.loadMoreBtn}>
              Load more
            </button>
          </div>
        </Container>
      </section>
    </div>
  );
}
