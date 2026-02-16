import { Inter, Roboto } from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "La Chaleur Humaine",
  description: "La Chaleur Humaine – Art",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${roboto.variable}`}>
      <body className={styles.body}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
