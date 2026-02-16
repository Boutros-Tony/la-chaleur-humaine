import Link from "next/link";
import styles from "./Button.module.scss";

export default function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  className = "",
  ...rest
}) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  if (href) {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className={classNames} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classNames} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classNames} {...rest}>
      {children}
    </button>
  );
}
