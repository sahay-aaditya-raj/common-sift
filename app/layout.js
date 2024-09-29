import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
// export const metadata = {
//   title: "Home | BrickBlocks",
//   description: "Ecomerce admin panel",
//   content:"width=device-width, initial-scale=1"
// };


export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body className={`bg-zinc-100 ${inter.className}`}>
          <div className="flex flex-col min-h-screen max-h-screen">
            {/* Top Navbar */}
            <Header />
            {/* Main Content */}
            <main>
              {children}
            </main>
            {/* Footer */}
            <Footer />
          </div>
          <ScrollToTopButton/>
      </body>
    </html>
  );
}


export async function generateMetadata() {
  return {
    title: 'Home | Common Sift',
    description: 'Explore our product catalog.',
  };
}