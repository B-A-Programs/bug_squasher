import NavBar from "@/components/shared/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
        <header className="w-full border-b-2 border-gray-300">
            <NavBar />
        </header>
        <main className="flex-1 bg-slate-200">{children}</main>
        <footer className="flex justify-center bg-slate-200 text-slate-600 mb-1 pt-3">
            2024 BugSquasher. All rights reserved.
        </footer>
    </div>
  );
}

