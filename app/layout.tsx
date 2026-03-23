import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/layouts/header/Header";
import { Footer } from "./components/layouts/footer/Footer";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "React EC",
  description: "React学習のための段階的な課題集で作成したECサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
