import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { arts } from "@/data/arts.js";
import Button from "@/components/Button/Button.jsx";
import Container from "@/components/Container/Container.jsx";
import styles from "./page.module.scss";

// Allow dynamic slugs not pre-generated at build (e.g. dev or new content)
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = [...new Set(arts.map((art) => art.slug))];
  return slugs.map((slug) => ({ slug }));
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

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function GoBackButton({ className = "" }) {
  return (
    <span className={`${styles.goBackWrap} ${className}`}>
      <span className={styles.goBackTriangle} aria-hidden />
      <Link href="/art" className={styles.goBack}>
        GO BACK
      </Link>
    </span>
  );
}

export default async function ArtSlugPage({ params }) {
  const { slug } = await params;
  const art = getArtBySlug(slug);
  if (!art) notFound();

  return (
    <div className={styles.page}>
      {/* Header: same as art listing page */}
      <header className={styles.hero} aria-labelledby="art-detail-title">
        <div className={styles.heroOverlay} />
        <Container variant="content" className={styles.heroContainer}>
          <h1 id="art-detail-title" className={`section-heading ${styles.heroTitle}`}>
            The Art
          </h1>
        </Container>
        <div className={styles.goBackHeroWrap}>
          <Container variant="content" className={styles.heroContainer}>
            <GoBackButton />
          </Container>
        </div>
      </header>

      {/* Main content: tertiary bg */}
      <section className={styles.contentSection}>
        <Container variant="content" className={styles.mainSection}>
          <h2 className={`section-heading ${styles.artTitle}`}>{art.title}</h2>
          <div className={styles.mainLayout}>
            <div className={styles.mainText}>
              <p className="body-copy">{art.bodyText ?? LOREM}</p>
            </div>
            <div className={styles.mainImageWrap}>
              <Image
                src={art.image}
                alt={art.title}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
                className={styles.artImage}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Secondary: two small images + paragraph + GET IN TOUCH */}
      <section className={styles.contentSection}>
        <Container variant="content" className={styles.secondarySection}>
          <div className={styles.secondaryLayout}>
            <div className={styles.secondaryImages}>
              <div className={styles.smallImageWrap}>
                <Image
                  src={art.image2 ?? art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 280px"
                  className={styles.artImage}
                />
              </div>
              <div className={styles.smallImageWrap}>
                <Image
                  src={art.image3 ?? art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 280px"
                  className={styles.artImage}
                />
              </div>
            </div>
            <div className={styles.secondaryText}>
              <p className={`body-copy ${styles.secondaryParagraph}`}>{art.bodyText2 ?? LOREM}</p>
              <Button href="/#get-in-touch" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom GO BACK: left edge of container */}
      <div className={styles.bottomGoBackWrap}>
        <Container variant="content">
          <GoBackButton />
        </Container>
      </div>
    </div>
  );
}
