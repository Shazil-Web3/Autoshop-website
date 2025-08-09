import "./globals.css";
import { GlobalStateProvider } from "../context/GlobalStateContext";
import ConditionalLayout from "../components/ConditionalLayout";

export const metadata = {
  title: "Autexline - Automotive Sourcing & Export",
  description: "Leading the Future of Automotive Sourcing, Sales, and Export",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <GlobalStateProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
