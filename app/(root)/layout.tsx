import NavBar from "@/components/shared/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
        <header className="w-full border-b">
            <NavBar />
        </header>
        <main className="flex-1 bg-slate-100">{children}</main>
        <footer className="flex justify-center bg-slate-100 text-slate-600 mb-1">
            2024 BugSquasher. All rights reserved.
        </footer>
    </div>
  );
}

