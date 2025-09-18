import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

// Menlo is not a Google font; we keep system Menlo via CSS

export const metadata: Metadata = {
  title: "SMB IT Command Center",
  description: "Zentrales IT-Management für KMU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${space.variable} ${inter.variable} antialiased`}>
        <div className="min-h-screen grid grid-cols-[260px_1fr]">
          <aside className="p-4" style={{ background: 'var(--soft)' }}>
            <div className="mb-6 font-semibold tracking-tight text-[color:var(--text)]">nubo.is</div>
            <nav className="space-y-1 text-sm">
              <a href="/" className="block px-3 py-2 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]">Dashboard</a>
              <a href="/users" className="block px-3 py-2 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]">Benutzer</a>
              <a href="/onboarding" className="block px-3 py-2 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]">Onboarding</a>
              <a href="/devices" className="block px-3 py-2 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]">Geräte</a>
              <a href="/licenses" className="block px-3 py-2 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]">Lizenzen</a>
            </nav>
          </aside>
          <main className="p-0" style={{ background: 'var(--page)' }}>
            <div className="sticky top-0 z-10 border-b" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="px-6 h-14 flex items-center justify-between">
                <div className="font-semibold">Dashboard</div>
                <div className="flex items-center gap-3">
                  <input placeholder="Search devices, users…" className="w-80 border rounded px-3 py-2 text-sm" style={{ borderColor: 'var(--border)' }} />
                  <button className="btn btn-primary">New</button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
