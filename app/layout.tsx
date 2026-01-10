import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google"; 

const inter = Inter({ subsets: ["latin"] }); 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Idagdag ang inter.className dito */}
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}