import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/header";
import Footer from "@/components/footer";

// export const metadata = {
//   title: "Home | BrickBlocks",
//   description: "Ecomerce admin panel",
//   content:"width=device-width, initial-scale=1"
// };


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`bg-zinc-100 ${inter.className}`}>
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}


export async function generateMetadata() {
  return {
    title: 'Home | BrickBlocks',
    description: 'Explore our product catalog.',
  };
}