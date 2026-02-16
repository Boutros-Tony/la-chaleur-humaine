import GetInTouch from "@/components/GetInTouch/GetInTouch.jsx";
import Hero from "@/components/Hero/Hero.jsx";
import TheArt from "@/components/TheArt/TheArt.jsx";
import TheArtist from "@/components/TheArtist/TheArtist.jsx";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <TheArt />
      <TheArtist />
      <GetInTouch />
    </div>
  );
}
