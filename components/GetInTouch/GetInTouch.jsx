"use client";

import Image from "next/image";
import Container from "@/components/Container/Container.jsx";
import styles from "./GetInTouch.module.scss";

const INTRO =
  "I'd love to hear from you. Whether you're interested in commissioning a piece or just want to connect, please don't hesitate to reach out.";

const CONTACT = [
  { icon: "/assets/mail-icon.svg", label: "Email", value: "contact@lachaleurhumaine.com", href: "mailto:contact@lachaleurhumaine.com" },
  { icon: "/assets/location-icon.svg", label: "Location", value: "Lebanon", href: null },
  { icon: "/assets/insta-icon.svg", label: "Instagram", value: "@lachaleurhumaine", href: "https://instagram.com/lachaleurhumaine" },
];

export default function GetInTouch() {
  return (
    <section id="get-in-touch" className={styles.section} aria-labelledby="get-in-touch-title">
      <div className={styles.overlay} />
      <Container variant="content" className={styles.layout}>
        <div className={styles.left}>
          <h2 id="get-in-touch-title" className={`section-heading ${styles.title}`}>
            Get in touch
          </h2>
          <p className={`body-copy ${styles.intro}`}>{INTRO}</p>
          <div className={styles.contactBlock}>
            <h3 className={styles.contactSubtitle}>Contact Information</h3>
            <ul className={styles.contactList}>
              {CONTACT.map(({ icon, label, value, href }) => (
                <li key={label} className={styles.contactItem}>
                  <span className={styles.iconWrap} aria-hidden>
                    <Image src={icon} alt="" width={20} height={20} className={styles.icon} />
                  </span>
                  {href ? (
                    <a href={href} className={styles.contactLink} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {value}
                    </a>
                  ) : (
                    <span>{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.field}>
                <label htmlFor="getintouch-name" className={styles.label}>Name</label>
                <input id="getintouch-name" type="text" name="name" placeholder="Name" className={styles.input} />
              </div>
              <div className={styles.field}>
                <label htmlFor="getintouch-surname" className={styles.label}>Surname</label>
                <input id="getintouch-surname" type="text" name="surname" placeholder="Surname" className={styles.input} />
              </div>
              <div className={styles.field}>
                <label htmlFor="getintouch-email" className={styles.label}>Email</label>
                <input id="getintouch-email" type="email" name="email" placeholder="Email" className={styles.input} />
              </div>
              <div className={styles.field}>
                <label htmlFor="getintouch-message" className={styles.label}>Message</label>
                <textarea id="getintouch-message" name="message" placeholder="Message" className={styles.textarea} rows={5} />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Send !
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
