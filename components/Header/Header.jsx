"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container.jsx";
import styles from "./Header.module.scss";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className={styles.header}>
      <Container variant="wide" className={styles.inner}>
        <Link href="/" className={styles.logo}>
          La Chaleur Humaine
        </Link>
        <nav className={styles.nav}>
        <Link href="/" className={isActive("/") ? styles.active : undefined}>
          Home
        </Link>
        <Link href="/art" className={isActive("/art") ? styles.active : undefined}>
          The Art
        </Link>
        <Link href="/art" className={isActive("/art") ? styles.active : undefined}>
          The Artist
        </Link>
        <Link href="/art" className={isActive("/art") ? styles.active : undefined}>
          Get in touch
        </Link>
      </nav>
      </Container>
    </header>
  );
}
