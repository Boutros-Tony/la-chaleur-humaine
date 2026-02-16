import Image from "next/image";
import Container from "@/components/Container/Container.jsx";
import styles from "./Footer.module.scss";

const socialLinks = [
  { href: "https://x.com", icon: "/assets/X-icon.svg", label: "X" },
  {
    href: "https://instagram.com",
    icon: "/assets/instagram-icon.svg",
    label: "Instagram",
  },
  {
    href: "https://youtube.com",
    icon: "/assets/youtube-icon.svg",
    label: "YouTube",
  },
  {
    href: "https://linkedin.com",
    icon: "/assets/linkedin-icon.svg",
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container variant="wide" className={styles.content}>
        <div className={styles.brand}>
          <span className={styles.logo}>La Chaleur Humaine</span>
          <p className={styles.copy}>© 2026 Dima Rbeiz.</p>
          <p className={styles.copy}>All rights reserved.</p>
          <p className={styles.copy}>Handcrafted with care in Lebanon</p>
        </div>
        <nav className={styles.social} aria-label="Social links">
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={label}
            >
              <Image
                src={icon}
                alt=""
                width={24}
                height={24}
                className={styles.icon}
              />
            </a>
          ))}
        </nav>
      </Container>
      <div className={styles.bar} />
    </footer>
  );
}
