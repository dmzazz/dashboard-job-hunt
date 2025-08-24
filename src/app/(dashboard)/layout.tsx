import MainLayouts from "@/components/ui/layouts/MainLayouts";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "@/context/NextAuthProvider";
import { authOptions } from "@/lib/authOptions";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Epilogue } from "next/font/google";
import { redirect } from "next/navigation";
import "../globals.css";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard job hunter",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return redirect("/auth/signin");
  }
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <main>
          <NextAuthProvider>
            <MainLayouts>{children}</MainLayouts>
          </NextAuthProvider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
