"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { arts } from "@/data/arts.js";
import Button from "@/components/Button/Button.jsx";
import Container from "@/components/Container/Container.jsx";
import styles from "./TheArt.module.scss";

const FILTERS = [
  { id: "all", label: "All work" },
  { id: "painting", label: "Paintings" },
  { id: "textile", label: "Textiles" },
];

const SLIDE_SIZE = 3;

function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// Deduplicate by slug so filtering never shows duplicate entries
function uniqueBySlug(items) {
  const seen = new Set();
  return items.filter((art) => {
    if (seen.has(art.slug)) return false;
    seen.add(art.slug);
    return true;
  });
}

export default function TheArt() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [hasNavigated, setHasNavigated] = useState(false);

  const filteredArts = useMemo(() => {
    const list =
      activeFilter === "all"
        ? arts
        : arts.filter(
            (art) => (art.category || "").toLowerCase() === activeFilter,
          );
    return uniqueBySlug(list);
  }, [activeFilter]);

  const slides = useMemo(() => chunk(filteredArts, SLIDE_SIZE), [filteredArts]);
  const totalSlides = Math.max(1, slides.length);
  const currentSlideArts = slides[currentSlide] ?? slides[0] ?? [];

  const goPrev = () => {
    setSlideDirection("prev");
    setHasNavigated(true);
    setCurrentSlide((s) => (s <= 0 ? totalSlides - 1 : s - 1));
  };
  const goNext = () => {
    setSlideDirection("next");
    setHasNavigated(true);
    setCurrentSlide((s) => (s >= totalSlides - 1 ? 0 : s + 1));
  };

  const handleFilterChange = (id) => {
    setActiveFilter(id);
    setCurrentSlide(0);
  };

  const slideAnimationClass = hasNavigated
    ? slideDirection === "next"
      ? styles.slideFromNext
      : styles.slideFromPrev
    : "";

  return (
    <section
      className={styles.section}
      aria-labelledby="the-art-title"
      id="the-art"
    >
      <div className={styles.overlay} />
      <Container variant="content" className={styles.container}>
        <h2 id="the-art-title" className={`section-heading ${styles.title}`}>
          The Art
        </h2>

        <div className={styles.filtersWrap}>
          <div
            className={styles.filters}
            role="tablist"
            aria-label="Filter artworks"
          >
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={activeFilter === id}
                className={
                  activeFilter === id
                    ? `${styles.filterBtn} ${styles.filterBtnActive}`
                    : styles.filterBtn
                }
                onClick={() => handleFilterChange(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sliderWrap}>
          <div className={styles.sliderInner}>
            <button
              type="button"
              className={styles.arrowLeft}
              onClick={goPrev}
              aria-label="Previous slide"
            >
              <Image
                src="/assets/slider-arrow.svg"
                alt=""
                width={22}
                height={44}
                className={styles.arrowImg}
              />
            </button>

            <div className={styles.sliderViewport}>
              <div
                key={`${activeFilter}-${currentSlide}`}
                className={`${styles.slide} ${slideAnimationClass}`}
              >
                {slides.length === 0 ? (
                  <p className={`body-copy ${styles.empty}`}>
                    No works in this category yet.
                  </p>
                ) : (
                  currentSlideArts.map((art) => (
                    <Link
                      key={art.slug}
                      href={`/art/${art.slug}`}
                      className={styles.card}
                    >
                      <div className={styles.cardImageWrap}>
                        <Image
                          src={art.image}
                          alt={art.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={styles.cardImage}
                        />
                      </div>
                      <p className={`body-copy ${styles.caption}`}>
                        {art.title}
                        {art.year && (
                          <>
                            <br />
                            {art.year}
                          </>
                        )}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </div>

            <button
              type="button"
              className={styles.arrowRight}
              onClick={goNext}
              aria-label="Next slide"
            >
              <Image
                src="/assets/slider-arrow.svg"
                alt=""
                width={22}
                height={44}
                className={styles.arrowImgRight}
              />
            </button>

            <div className={styles.ctaWrap}>
              <Button href="/art" variant="primary">
                Check the whole collection
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
