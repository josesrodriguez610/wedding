import type { Metadata } from "next";
import { canopee, editorialNew, roboto } from "./fonts";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
  title: "Sergio & Ashley Wedding",
  description: "Wedding Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${canopee.variable} ${editorialNew.variable} ${roboto.variable} antialiased`}
      >
        <NavBar />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
