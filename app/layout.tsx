import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ExitModal } from "@/components/modals/exit-modal";


export const metadata: Metadata = {
  title: "Lawgorithms",
  description: "Learn the Indian Constitution at the speed you scroll social media.",
  icons: {
    icon: "1.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <main>{children}</main>
  
        <Toaster />
        <ExitModal />
      </body>
    </html>
    </ClerkProvider>
  );
}
