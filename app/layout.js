import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: {
    default: "Spendy",
    template: "%s | Spendy",
  },
  description:
    "Track your income and expenses effortlessly. Categorize transactions, visualize data, and stay informed with intuitive charts and detailed reports.",
  keywords: [
    "Spendy",
    "Financial management",
    "Income monitoring",
    "Expense tracking",
  ],
  openGraph: {
    title: {
      default: "Spendy",
      template: "%s | Spendy",
    },
    description:
      "Track your income and expenses effortlessly. Categorize transactions, visualize data, and stay informed with intuitive charts and detailed reports.",
    type: "website",
    locale: "en-US",
    siteName: "Spendy",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
