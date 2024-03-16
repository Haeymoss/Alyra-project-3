import RainbowKitAndChakraProvider from "./RainbowKitAndChakraProvider";
import { Inter } from "next/font/google";

import Layout from "@/components/Layout";
import { EventsProvider } from "@/context/Events";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowKitAndChakraProvider>
          <EventsProvider>
            <Layout>{children}</Layout>
          </EventsProvider>
        </RainbowKitAndChakraProvider>
      </body>
    </html>
  );
}
