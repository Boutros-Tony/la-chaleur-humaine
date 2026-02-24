"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container.jsx";
import styles from "./Header.module.scss";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#the-art", label: "The Art" },
  { href: "/#the-artist", label: "The Artist" },
  { href: "/#get-in-touch", label: "Get in touch" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inViewSection, setInViewSection] = useState(null);

  useEffect(() => {
    if (pathname !== "/") {
      setInViewSection(null);
      return;
    }

    const sections = ["the-artist", "get-in-touch"];
    const ratios = { "the-artist": 0, "get-in-touch": 0 };

    const updateActive = () => {
      const entries = Object.entries(ratios);
      const max = Math.max(...entries.map(([, r]) => r));
      if (max === 0) {
        setInViewSection(null);
      } else {
        const winner = entries.find(([, r]) => r === max);
        setInViewSection(winner ? winner[0] : null);
      }
    };

    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios[entry.target.id] = entry.intersectionRatio;
          }
          updateActive();
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
      );

      observer.observe(el);
      observers.push(() => observer.disconnect());
    });

    return () => observers.forEach((cleanup) => cleanup());
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/" && !inViewSection;
    if (href === "/art")
      return pathname === "/art" || pathname.startsWith("/art/");
    if (href === "/#the-artist")
      return pathname === "/" && inViewSection === "the-artist";
    if (href === "/#get-in-touch")
      return pathname === "/" && inViewSection === "get-in-touch";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${menuOpen ? styles.menuOpen : ""}`}>
      <Container variant="wide" className={styles.inner}>
        <Link href="/" className={styles.logo}>
          La Chaleur Humaine
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={isActive(href) ? styles.active : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
      </Container>

      <div
        className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.dropdownNav} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={isActive(href) ? styles.active : undefined}
              onClick={handleNavClick}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
