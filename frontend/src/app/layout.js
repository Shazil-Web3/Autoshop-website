import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GlobalStateProvider } from "../context/GlobalStateContext";

export const metadata = {
  title: "Autexline - Automotive Sourcing & Export",
  description: "Leading the Future of Automotive Sourcing, Sales, and Export",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <GlobalStateProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </GlobalStateProvider>
      </body>
    </html>
  );
}
