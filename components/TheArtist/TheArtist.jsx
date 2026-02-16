import Image from "next/image";
import Container from "@/components/Container/Container.jsx";
import styles from "./TheArtist.module.scss";

const COPY =
  "La Chaleur Humaine— translated as The Warmth of Humanity— is the guiding philosophy behind the multidisciplinary practice of artist, educator, designer, and mother Dima Youssef Rbeiz. More than a title, it reflects her lifelong commitment to empathy, sustainability, and human connection. The name embodies the warmth of lived experience: her childhood in Bechmizzine, where sorting and reusing were part of daily life; her role as a mother, nurturing imagination through countless art projects with her children; and her work as a teacher, sparking creativity in kindergarteners. For Dima, art is a continuation of these exchanges— a mosaic of experiences bound together by care, community, and creativity. " +
  'Her practice is rooted in resourcefulness and reinvention. Working with fabrics, metals, strings, found objects, and acrylics, she builds textured compositions that carry the intimacy of touch. Inspiration often begins with a walk: materials that catch her eye are picked up, sorted, and added to her "room of treasures"— a personal archive that continually sparks new ideas. La Chaleur Humaine encapsulates this process, reflecting her vision of art as both sustainable and human, transforming fragments of everyday life into tactile poetry. ' +
  "Born in Beirut in 1962, Dima describes herself as a mosaic, each piece representing a facet of her life and creative journey. She studied Fine Arts and Interior Design with Advertising at BUC (now LAU) in the 1980s, a foundation that opened paths into interior and set design before she moved into education, inspiring creativity in children. In 2013, she returned to LAU to study fashion design, focusing on entrepreneurial projects that investigated how discarded factory fabrics could be revived and transformed. " +
  'Today, her art merges fine arts, fashion, and design with an enduring emphasis on sustainability. Working primarily in acrylics and collage, she layers paint with fabrics, strings, metals, and found objects to create complex, tactile works. From her "room of treasures," she sketches, sorts, and reimagines materials, uniting memory, functionality, and storytelling into her compositions. ' +
  "Each piece becomes a tile in the mosaic of her life— as artist, educator, designer, and mother— celebrating sustainability and the human warmth that gives her art its lasting power.";

export default function TheArtist() {
  return (
    <section className={styles.section} aria-labelledby="the-artist-title">
      <Container variant="content" className={styles.layout}>
        <div className={styles.left}>
          <h2
            id="the-artist-title"
            className={`section-heading ${styles.title}`}
          >
            The Artist
          </h2>
          <div className={styles.images}>
            <div className={styles.imageWrap}>
              <Image
                src="/assets/the-artist-1.png"
                alt="Dima Youssef Rbeiz in her studio with an abstract artwork"
                width={100}
                height={400}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 35vw"
              />
            </div>
            <div className={styles.imageWrap}>
              <Image
                src="/assets/the-artist-2.png"
                alt="Dima Youssef Rbeiz with colorful fabric pieces"
                width={400}
                height={400}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 35vw"
              />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <p className="body-copy">{COPY}</p>
        </div>
      </Container>
    </section>
  );
}
