import styles from "./Container.module.scss";

/**
 * Container for consistent width and padding across the site.
 * - wide: for header and footer (wider max-width)
 * - content: for main page content (narrower)
 */
export default function Container({ variant = "content", as: Component = "div", className = "", children, ...props }) {
  const variantClass = variant === "wide" ? styles.wide : styles.content;
  const combinedClassName = [variantClass, className].filter(Boolean).join(" ");

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
}
