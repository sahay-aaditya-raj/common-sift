import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

// Add your metadata
export async function generateMetadata() {
  return {
    title: 'Home | Common Shift',
    description: 'Explore our product catalog.',
    verification: {
      google: "SfqKenUzEAaGPY7luTx_A0vmXo3-M4IATYMu4NF_mB0",
    },
    keywords: "ecommerce, quick, commerce, home, services, online, shopping, cleaning, repair, maintenance",
    robots: "index, follow",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="SfqKenUzEAaGPY7luTx_A0vmXo3-M4IATYMu4NF_mB0" />
      </head>
      <body className={`bg-zinc-100 ${inter.className}`}>
        <div className="flex flex-col min-h-screen max-h-screen">
          {/* Top Navbar */}
          <Header />
          {/* Main Content */}
          <main>{children}</main>
          {/* Footer */}
          <Footer />
        </div>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
